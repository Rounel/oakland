from rest_framework import viewsets, permissions, status, filters
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.tokens import default_token_generator
from django.core.mail import send_mail
from django.contrib.auth import get_user_model
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes, force_str
from django.db.models import F, FloatField, Avg, Q
from django.db.models.functions import ACos, Cos, Radians, Sin
from django.core.files.storage import default_storage
from django.core.files.base import ContentFile
from .serializers import *
from .models import *
from rest_framework.permissions import AllowAny, IsAdminUser, IsAuthenticated
from django.utils import timezone
from django.conf import settings
from django.db.utils import IntegrityError

User = get_user_model()

class IsProviderOrReadOnly(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True
        return request.user and request.user.is_provider

class IsAdminOrReadOnly(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True
        return request.user and request.user.is_staff

class AuthViewSet(viewsets.ViewSet):
    permission_classes = [AllowAny]

    @action(detail=False, methods=['post'])
    def login(self, request):
        serializer = LoginSerializer(data=request.data, context={"request": request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data["user"]

        refresh = RefreshToken.for_user(user)
        return Response({
            "access": str(refresh.access_token),
            "refresh": str(refresh),
            "user": UserSerializer(user).data,
        })

    @action(detail=False, methods=['post'])
    def register(self, request):
        try:
            print("Données reçues:", request.data)
            # Vérifier si c'est une inscription de provider
            if 'provider_application' in request.data:
                print("Inscription provider détectée")
                serializer = ProviderRegistrationSerializer(data=request.data)
            else:
                print("Inscription utilisateur standard détectée")
                serializer = RegisterSerializer(data=request.data)
            
            if not serializer.is_valid():
                print("Erreurs de validation:", serializer.errors)
                return Response(
                    {"detail": "Erreur de validation", "errors": serializer.errors},
                    status=status.HTTP_400_BAD_REQUEST
                )
                
            user = serializer.save()
            print("Utilisateur créé avec succès:", user.id)

            # Si c'est un provider, envoyer l'email de confirmation
            if user.is_provider:
                # Générer un token de confirmation
                token = default_token_generator.make_token(user)
                uid = urlsafe_base64_encode(force_bytes(user.pk))
                
                # Construire le lien de confirmation
                confirmation_link = f"{settings.FRONTEND_URL}/confirm-email/{uid}/{token}/"
                
                # Envoyer l'email de confirmation
                send_mail(
                    subject="Confirmation de votre adresse email",
                    message=f"""
                    Bonjour {user.get_full_name()},

                    Merci de vous être inscrit en tant que prestataire sur notre plateforme.

                    Pour confirmer votre adresse email, veuillez cliquer sur le lien suivant :
                    {confirmation_link}

                    Une fois votre email confirmé, votre inscription sera soumise à validation par notre équipe.
                    Vous recevrez un email lorsque votre compte sera validé.

                    Si vous n'avez pas créé de compte, vous pouvez ignorer cet email.

                    Cordialement,
                    L'équipe de Wilma Connect
                    """,
                    from_email=settings.DEFAULT_FROM_EMAIL,
                    recipient_list=[user.email],
                    fail_silently=True,
                )

                # Notifier les admins de la nouvelle demande
                admins = User.objects.filter(is_staff=True)
                for admin in admins:
                    send_mail(
                        subject="Nouvelle demande d'inscription prestataire",
                        message=f"""
                        Un nouveau prestataire a soumis une demande d'inscription :
                        
                        Nom : {user.get_full_name()}
                        Email : {user.email}
                        Entreprise : {user.provider_application.company_name}
                        
                        Pour valider cette inscription, connectez-vous à l'interface d'administration.
                        """,
                        from_email=settings.DEFAULT_FROM_EMAIL,
                        recipient_list=[admin.email],
                        fail_silently=True,
                    )

            return Response(UserSerializer(user).data, status=status.HTTP_201_CREATED)
            
        except Exception as e:
            print("Erreur lors de l'inscription:", str(e))
            return Response(
                {"detail": f"Erreur lors de l'inscription: {str(e)}"},
                status=status.HTTP_400_BAD_REQUEST
            )

    @action(detail=False, methods=['post'])
    def logout(self, request):
        try:
            if "refresh" not in request.data:
                return Response(
                    {"detail": "Le refresh token est requis"}, 
                    status=status.HTTP_400_BAD_REQUEST
                )
            
            # On retourne simplement un succès, le client s'occupera de supprimer les tokens
            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            print("Erreur lors du logout:", str(e))
            return Response(
                {"detail": "Erreur lors de la déconnexion"}, 
                status=status.HTTP_400_BAD_REQUEST
            )

    @action(detail=False, methods=['post'])
    def password_reset(self, request):
        email = request.data.get("email")
        user = User.objects.filter(email=email).first()
        if user:
            token = default_token_generator.make_token(user)
            uid = urlsafe_base64_encode(force_bytes(user.pk))
            reset_link = f"https://votreapp.com/reset-password/{uid}/{token}/"
            send_mail(
                subject="Réinitialisation de mot de passe",
                message=f"Bonjour, utilisez ce lien pour réinitialiser votre mot de passe : {reset_link}",
                from_email="noreply@votreapp.com",
                recipient_list=[user.email],
                fail_silently=True,
            )
        return Response({"message": "Si l'adresse email existe, un lien de réinitialisation a été envoyé."})

    @action(detail=False, methods=['post'])
    def password_reset_confirm(self, request):
        uidb64 = request.data.get("uid")
        token = request.data.get("token")
        new_password = request.data.get("password")

        if not all([uidb64, token, new_password]):
            return Response({"error": "Informations incomplètes."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            uid = force_str(urlsafe_base64_decode(uidb64))
            user = User.objects.get(pk=uid)
        except (TypeError, ValueError, OverflowError, User.DoesNotExist):
            return Response({"error": "Utilisateur invalide."}, status=status.HTTP_400_BAD_REQUEST)

        if default_token_generator.check_token(user, token):
            user.set_password(new_password)
            user.save()
            return Response({"message": "Mot de passe réinitialisé avec succès."})
        return Response({"error": "Lien invalide ou expiré."}, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=['post'])
    def confirm_email(self, request):
        try:
            uid = request.data.get('uid')
            token = request.data.get('token')
            
            if not uid or not token:
                return Response(
                    {"detail": "UID et token requis"},
                    status=status.HTTP_400_BAD_REQUEST
                )

            # Décoder l'UID
            user_id = force_str(urlsafe_base64_decode(uid))
            user = User.objects.get(pk=user_id)

            # Vérifier le token
            if default_token_generator.check_token(user, token):
                # Marquer l'email comme confirmé
                user.is_validated = True
                user.save()
                
                return Response({
                    "detail": "Votre email a été confirmé avec succès. Votre inscription est en attente de validation par notre équipe.",
                    "user": UserSerializer(user).data
                })
            else:
                return Response(
                    {"detail": "Token invalide ou expiré"},
                    status=status.HTTP_400_BAD_REQUEST
                )

        except User.DoesNotExist:
            return Response(
                {"detail": "Utilisateur non trouvé"},
                status=status.HTTP_404_NOT_FOUND
            )
        except Exception as e:
            return Response(
                {"detail": f"Erreur lors de la confirmation: {str(e)}"},
                status=status.HTTP_400_BAD_REQUEST
            )

    @action(detail=False, methods=['post'])
    def validate_provider(self, request):
        if not request.user.is_staff:
            return Response(
                {"detail": "Permission refusée"},
                status=status.HTTP_403_FORBIDDEN
            )

        try:
            provider_id = request.data.get('provider_id')
            if not provider_id:
                return Response(
                    {"detail": "ID du prestataire requis"},
                    status=status.HTTP_400_BAD_REQUEST
                )

            provider = ProviderApplication.objects.get(id=provider_id)
            
            # Mettre à jour le statut du provider
            provider.status = 'approved'
            provider.save()

            # Envoyer un email au prestataire
            send_mail(
                subject="Votre inscription a été validée",
                message=f"""
                Bonjour {provider.user.get_full_name()},

                Nous avons le plaisir de vous informer que votre inscription en tant que prestataire a été validée.

                Vous pouvez dès maintenant vous connecter à votre espace prestataire et commencer à utiliser la plateforme.

                Cordialement,
                L'équipe de Wilma Connect
                """,
                from_email=settings.DEFAULT_FROM_EMAIL,
                recipient_list=[provider.user.email],
                fail_silently=True,
            )

            return Response({
                "detail": "Prestataire validé avec succès",
                "provider": ProviderApplicationSerializer(provider).data
            })

        except ProviderApplication.DoesNotExist:
            return Response(
                {"detail": "Prestataire non trouvé"},
                status=status.HTTP_404_NOT_FOUND
            )
        except Exception as e:
            return Response(
                {"detail": f"Erreur lors de la validation: {str(e)}"},
                status=status.HTTP_400_BAD_REQUEST
            )

class UserViewSet(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return User.objects.filter(id=self.request.user.id)

    @action(detail=False, methods=['get'])
    def me(self, request):
        serializer = self.get_serializer(request.user)
        return Response(serializer.data)

class ProviderApplicationViewSet(viewsets.ModelViewSet):
    queryset = ProviderApplication.objects.filter(status='approved')
    serializer_class = ProviderApplicationSerializer
    permission_classes = [permissions.AllowAny]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['company_name', 'description', 'category', 'city']
    ordering_fields = ['rating', 'created_at']

    def get_permissions(self):
        if self.action in ['list', 'retrieve', 'search']:
            return [permissions.AllowAny()]
        elif self.action in ['validate']:
            return [permissions.IsAdminUser()]
        return [permissions.IsAuthenticated()]

    def get_queryset(self):
        if self.action in ['list', 'retrieve', 'search']:
            return ProviderApplication.objects.filter(status='approved')
        return ProviderApplication.objects.all()

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        
        # Si l'utilisateur n'est pas le propriétaire du provider
        if instance.user != request.user and not request.user.is_staff:
            return Response(
                {'detail': 'Vous n\'avez pas la permission de modifier ce profil.'},
                status=status.HTTP_403_FORBIDDEN
            )

        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        return Response(serializer.data)

    def perform_update(self, serializer):
        serializer.save()

    @action(detail=False, methods=['get'])
    def search(self, request):
        queryset = self.get_queryset()
        
        # Filtres
        profession = request.query_params.get('profession')
        location = request.query_params.get('location')
        category = request.query_params.get('category')
        min_rating = request.query_params.get('min_rating')
        availability = request.query_params.get('availability')

        if profession:
            queryset = queryset.filter(
                Q(company_name__icontains=profession) |
                Q(description__icontains=profession) |
                Q(category__icontains=profession)
            )

        if location:
            queryset = queryset.filter(
                Q(city__icontains=location) |
                Q(address__icontains=location)
            )

        if category and category != 'all':
            queryset = queryset.filter(category=category)

        if min_rating:
            queryset = queryset.filter(rating__gte=float(min_rating))

        if availability:
            # Logique de filtrage par disponibilité
            pass

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    @action(detail=True, methods=['post'])
    def validate(self, request, pk=None):
        if not request.user.is_staff:
            return Response(
                {'detail': 'Permission refusée'},
                status=status.HTTP_403_FORBIDDEN
            )

        provider = self.get_object()
        status_action = request.data.get('status')

        if status_action == 'approved':
            provider.status = 'approved'
            provider.user.is_validated = True
            provider.user.save()
            # Envoyer email de confirmation
        elif status_action == 'rejected':
            provider.status = 'rejected'
            # Envoyer email de rejet

        provider.save()
        return Response(self.get_serializer(provider).data)

class ServiceViewSet(viewsets.ModelViewSet):
    serializer_class = ServiceSerializer
    permission_classes = [IsProviderOrReadOnly]

    def get_queryset(self):
        return Service.objects.filter(provider__status='approved')

    def perform_create(self, serializer):
        provider = ProviderApplication.objects.get(user=self.request.user)
        serializer.save(provider=provider)

class ReviewViewSet(viewsets.ModelViewSet):
    serializer_class = ReviewSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        return Review.objects.filter(provider__status='approved')

    def perform_create(self, serializer):
        provider = ProviderApplication.objects.get(user=self.request.user)
        serializer.save(provider=provider)

class ScheduleViewSet(viewsets.ModelViewSet):
    serializer_class = ScheduleSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        return Schedule.objects.filter(provider__status='approved')

    def get_permissions(self):
        if self.action in ['update', 'partial_update', 'destroy']:
            return [IsProviderOrReadOnly()]
        return [permissions.AllowAny()]

    def perform_create(self, serializer):
        provider = ProviderApplication.objects.get(user=self.request.user)
        serializer.save(provider=provider)

    def perform_update(self, serializer):
        # Vérifier que l'utilisateur est le provider associé à ce schedule
        schedule = self.get_object()
        if schedule.provider.user != self.request.user:
            raise permissions.PermissionDenied("Vous n'êtes pas autorisé à modifier cet horaire.")
        serializer.save()

    def perform_destroy(self, instance):
        # Vérifier que l'utilisateur est le provider associé à ce schedule
        if instance.provider.user != self.request.user:
            raise permissions.PermissionDenied("Vous n'êtes pas autorisé à supprimer cet horaire.")
        instance.delete()

class GalleryViewSet(viewsets.ModelViewSet):
    serializer_class = GallerySerializer
    permission_classes = [IsProviderOrReadOnly]

    def get_queryset(self):
        return Gallery.objects.filter(provider__status='approved')

    def perform_create(self, serializer):
        provider = ProviderApplication.objects.get(user=self.request.user)
        serializer.save(provider=provider)

class ImageUploadView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        if 'image' not in request.FILES:
            return Response({"error": "Aucune image n'a été fournie."}, status=status.HTTP_400_BAD_REQUEST)

        image = request.FILES['image']
        path = default_storage.save(f'uploads/{image.name}', ContentFile(image.read()))
        url = default_storage.url(path)

        return Response({"url": url}, status=status.HTTP_201_CREATED)

class AdminProviderViewSet(viewsets.ModelViewSet):
    serializer_class = ProviderApplicationSerializer
    permission_classes = [IsAdminUser]

    def get_queryset(self):
        queryset = ProviderApplication.objects.all()
        status = self.request.query_params.get('status', None)
        if status:
            queryset = queryset.filter(status=status)
        return queryset

    @action(detail=False, methods=['get'])
    def stats(self, request):
        """Récupère les statistiques des prestataires"""
        total_providers = ProviderApplication.objects.count()
        pending_providers = ProviderApplication.objects.filter(status='pending').count()
        approved_providers = ProviderApplication.objects.filter(status='approved').count()
        rejected_providers = ProviderApplication.objects.filter(status='rejected').count()

        # Calculer le pourcentage de variation du mois dernier
        last_month = timezone.now() - timezone.timedelta(days=30)
        new_providers_this_month = ProviderApplication.objects.filter(created_at__gte=last_month).count()
        new_providers_last_month = ProviderApplication.objects.filter(
            created_at__gte=last_month - timezone.timedelta(days=30),
            created_at__lt=last_month
        ).count()

        monthly_change = 0
        if new_providers_last_month > 0:
            monthly_change = ((new_providers_this_month - new_providers_last_month) / new_providers_last_month) * 100

        return Response({
            'total_providers': total_providers,
            'pending_providers': pending_providers,
            'approved_providers': approved_providers,
            'rejected_providers': rejected_providers,
            'monthly_change': round(monthly_change, 1)
        })

    @action(detail=True, methods=['post'])
    def validate(self, request, pk=None):
        """Valide ou rejette un prestataire"""
        provider = self.get_object()
        status = request.data.get('status')

        if status not in ['approved', 'rejected']:
            return Response(
                {'detail': 'Le statut doit être "approved" ou "rejected"'},
                status=status.HTTP_400_BAD_REQUEST
            )

        provider.status = status
        provider.save()

        # Envoyer un email au prestataire
        subject = "Votre demande d'inscription a été traitée"
        message = f"""
        Bonjour {provider.user.get_full_name()},

        Votre demande d'inscription en tant que prestataire a été {status}.

        {f"Vous pouvez maintenant vous connecter à votre espace prestataire." if status == 'approved' else "Si vous avez des questions, n'hésitez pas à nous contacter."}

        Cordialement,
        L'équipe de Wilma Connect
        """

        send_mail(
            subject=subject,
            message=message,
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[provider.user.email],
            fail_silently=True,
        )

        return Response(self.get_serializer(provider).data)

    @action(detail=True, methods=['delete'])
    def delete(self, request, pk=None):
        """Supprime un prestataire"""
        provider = self.get_object()
        provider.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class ContactRequestViewSet(viewsets.ModelViewSet):
    serializer_class = ContactRequestSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.is_provider:
            # Les prestataires voient les demandes qui leur sont adressées
            return ContactRequest.objects.filter(provider__user=user)
        else:
            # Les utilisateurs normaux voient leurs propres demandes
            return ContactRequest.objects.filter(user=user)

    def perform_create(self, serializer):
        user = self.request.user
        if user.is_provider:
            raise permissions.PermissionDenied("Les prestataires ne peuvent pas créer de demandes de contact")
        
        provider_id = self.request.data.get('provider')
        provider = ProviderApplication.objects.get(id=provider_id)
        
        # Créer la demande
        contact_request = serializer.save(user=user, provider=provider)
        
        # Envoyer un email au prestataire
        send_mail(
            subject=f"Nouvelle demande de contact de {user.get_full_name()}",
            message=f"""
            Bonjour {provider.user.get_full_name()},

            Vous avez reçu une nouvelle demande de contact de {user.get_full_name()}.

            Sujet : {contact_request.subject}
            Message : {contact_request.message}

            Vous pouvez répondre à cette demande en vous connectant à votre espace prestataire.

            Cordialement,
            L'équipe de Wilma Connect
            """,
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[provider.user.email],
            fail_silently=True,
        )

        # Notifier les admins
        admins = User.objects.filter(is_staff=True)
        for admin in admins:
            send_mail(
                subject="Nouvelle demande de contact",
                message=f"""
                Une nouvelle demande de contact a été créée :

                De : {user.get_full_name()}
                À : {provider.company_name}
                Sujet : {contact_request.subject}
                Message : {contact_request.message}

                Pour gérer cette demande, connectez-vous à l'interface d'administration.
                """,
                from_email=settings.DEFAULT_FROM_EMAIL,
                recipient_list=[admin.email],
                fail_silently=True,
            )

class AdminContactRequestViewSet(viewsets.ModelViewSet):
    serializer_class = ContactRequestSerializer
    permission_classes = [IsAdminUser]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['subject', 'message', 'user__first_name', 'user__last_name', 'provider__company_name']
    ordering_fields = ['created_at', 'status']

    def get_queryset(self):
        queryset = ContactRequest.objects.all()
        status = self.request.query_params.get('status', None)
        if status:
            queryset = queryset.filter(status=status)
        return queryset

    @action(detail=True, methods=['post'])
    def update_status(self, request, pk=None):
        contact_request = self.get_object()
        new_status = request.data.get('status')
        
        if new_status not in dict(ContactRequest.STATUS_CHOICES):
            return Response(
                {'detail': 'Statut invalide'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        contact_request.status = new_status
        contact_request.save()
        
        # Notifier le prestataire et l'utilisateur du changement de statut
        send_mail(
            subject=f"Mise à jour de votre demande de contact",
            message=f"""
            Bonjour,

            Le statut de votre demande de contact a été mis à jour : {new_status}

            Détails de la demande :
            Sujet : {contact_request.subject}
            Message : {contact_request.message}

            Cordialement,
            L'équipe de Wilma Connect
            """,
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[contact_request.user.email, contact_request.provider.user.email],
            fail_silently=True,
        )
        
        return Response(self.get_serializer(contact_request).data)

class VisitorContactViewSet(viewsets.ModelViewSet):
    serializer_class = VisitorContactSerializer
    permission_classes = [permissions.AllowAny]
    authentication_classes = []  # No authentication required by default

    def get_permissions(self):
        if self.action in ['create', 'check_status', 'check_provider_status']:
            return [permissions.AllowAny()]
        elif self.action in ['accept', 'reject']:
            return [permissions.IsAuthenticated()]
        return [permissions.IsAuthenticated()]

    def get_queryset(self):
        if not self.request.user.is_authenticated:
            return VisitorContact.objects.none()
        if self.request.user.is_staff:
            return VisitorContact.objects.all()
        elif self.request.user.is_provider:
            return VisitorContact.objects.filter(provider=self.request.user.provider_application)
        return VisitorContact.objects.none()

    def create(self, request, *args, **kwargs):
        try:
            return super().create(request, *args, **kwargs)
        except IntegrityError as e:
            if 'api_visitorcontact_provider_id_visitor_ip_8eb5f742_uniq' in str(e):
                return Response(
                    {
                        'error': 'Vous avez déjà envoyé une demande de contact à ce prestataire. Veuillez attendre sa réponse.',
                        'detail': 'Une demande de contact existe déjà pour cette adresse IP avec ce prestataire.'
                    },
                    status=status.HTTP_400_BAD_REQUEST
                )
            raise

    @action(detail=False, methods=['post'], url_path='check_provider_status/(?P<provider_id>[^/.]+)', authentication_classes=[])
    def check_provider_status(self, request, provider_id=None):
        visitor_ip = request.META.get('REMOTE_ADDR')
        try:
            contact = VisitorContact.objects.filter(
                provider_id=provider_id,
                visitor_ip=visitor_ip
            ).latest('created_at')
            
            return Response({
                'status': contact.status,
                'can_view_contact': contact.status == 'accepted'
            })
        except VisitorContact.DoesNotExist:
            return Response({'status': 'unknown'}, status=status.HTTP_404_NOT_FOUND)

    @action(detail=True, methods=['post'])
    def check_status(self, request, pk=None):
        visitor_ip = request.META.get('REMOTE_ADDR')
        contact = self.get_object()
        
        if contact.visitor_ip == visitor_ip:
            return Response({
                'status': contact.status,
                'can_view_contact': contact.status == 'accepted'
            })
        return Response({'status': 'unknown'}, status=status.HTTP_404_NOT_FOUND)

    def perform_create(self, serializer):
        visitor_ip = self.request.META.get('REMOTE_ADDR')
        contact = serializer.save(visitor_ip=visitor_ip)

        # Envoyer un email au prestataire
        send_mail(
            subject=f"Nouvelle demande de contact de {contact.name}",
            message=f"""
            Bonjour,

            Vous avez reçu une nouvelle demande de contact de {contact.name}.

            Email : {contact.email}
            Téléphone : {contact.phone}

            Message :
            {contact.message}

            Pour accepter ou refuser ce contact, connectez-vous à votre espace prestataire.

            Cordialement,
            L'équipe de Wilma Connect
            """,
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[contact.provider.user.email],
            fail_silently=True,
        )

    @action(detail=True, methods=['post'])
    def accept(self, request, pk=None):
        contact = self.get_object()
        
        # Vérifier que l'utilisateur est bien le prestataire associé
        if not request.user.is_provider or contact.provider != request.user.provider_application:
            return Response(
                {'detail': 'Vous n\'avez pas la permission d\'accepter ce contact'},
                status=status.HTTP_403_FORBIDDEN
            )

        contact.status = 'accepted'
        contact.save()

        # Envoyer un email au visiteur
        send_mail(
            subject=f"Votre demande de contact a été acceptée",
            message=f"""
            Bonjour {contact.name},

            Votre demande de contact avec {contact.provider.company_name} a été acceptée.

            Vous pouvez maintenant contacter le prestataire aux coordonnées suivantes :
            Email : {contact.provider.user.email}
            Téléphone : {contact.provider.user.phone}

            Cordialement,
            L'équipe de Wilma Connect
            """,
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[contact.email],
            fail_silently=True,
        )

        return Response(VisitorContactSerializer(contact).data)

    @action(detail=True, methods=['post'])
    def reject(self, request, pk=None):
        contact = self.get_object()
        
        # Vérifier que l'utilisateur est bien le prestataire associé
        if not request.user.is_provider or contact.provider != request.user.provider_application:
            return Response(
                {'detail': 'Vous n\'avez pas la permission de rejeter ce contact'},
                status=status.HTTP_403_FORBIDDEN
            )

        contact.status = 'rejected'
        contact.save()

        # Envoyer un email au visiteur
        send_mail(
            subject=f"Votre demande de contact n'a pas été acceptée",
            message=f"""
            Bonjour {contact.name},

            Nous sommes désolés, mais votre demande de contact avec {contact.provider.company_name} n'a pas été acceptée.

            Cordialement,
            L'équipe de Wilma Connect
            """,
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[contact.email],
            fail_silently=True,
        )

        return Response(VisitorContactSerializer(contact).data)

class AdminVisitorContactViewSet(viewsets.ModelViewSet):
    serializer_class = VisitorContactSerializer
    permission_classes = [IsAdminUser]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['name', 'email', 'message', 'provider__company_name']
    ordering_fields = ['created_at', 'status']
    ordering = ['-created_at']  # Default ordering by created_at descending

    def get_queryset(self):
        return VisitorContact.objects.all().order_by('-created_at')

    @action(detail=False, methods=['get'])
    def stats(self, request):
        """Récupère les statistiques des contacts visiteurs"""
        if not request.user.is_staff:
            return Response(
                {'detail': 'You do not have permission to perform this action.'},
                status=status.HTTP_403_FORBIDDEN
            )

        total_contacts = VisitorContact.objects.count()
        pending_contacts = VisitorContact.objects.filter(status='pending').count()
        accepted_contacts = VisitorContact.objects.filter(status='accepted').count()
        rejected_contacts = VisitorContact.objects.filter(status='rejected').count()

        # Calculer le pourcentage de variation du mois dernier
        last_month = timezone.now() - timezone.timedelta(days=30)
        new_contacts_this_month = VisitorContact.objects.filter(created_at__gte=last_month).count()
        new_contacts_last_month = VisitorContact.objects.filter(
            created_at__gte=last_month - timezone.timedelta(days=30),
            created_at__lt=last_month
        ).count()

        monthly_growth = 0
        if new_contacts_last_month > 0:
            monthly_growth = ((new_contacts_this_month - new_contacts_last_month) / new_contacts_last_month) * 100

        # Calculer le taux d'acceptation
        acceptance_rate = 0
        if total_contacts > 0:
            acceptance_rate = (accepted_contacts / total_contacts) * 100

        return Response({
            'total_contacts': total_contacts,
            'pending_contacts': pending_contacts,
            'accepted_contacts': accepted_contacts,
            'rejected_contacts': rejected_contacts,
            'monthly_growth': round(monthly_growth, 1),
            'acceptance_rate': round(acceptance_rate, 1)
        })

    @action(detail=True, methods=['post'])
    def accept(self, request, pk=None):
        contact = self.get_object()
        contact.status = 'accepted'
        contact.save()

        # Envoyer un email au visiteur
        send_mail(
            subject=f"Votre demande de contact a été acceptée",
            message=f"""
            Bonjour {contact.name},

            Votre demande de contact avec {contact.provider.company_name} a été acceptée.

            Vous pouvez maintenant contacter le prestataire aux coordonnées suivantes :
            Email : {contact.provider.user.email}
            Téléphone : {contact.provider.user.phone}

            Cordialement,
            L'équipe de Wilma Connect
            """,
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[contact.email],
            fail_silently=True,
        )

        return Response(VisitorContactSerializer(contact).data)

    @action(detail=True, methods=['post'])
    def reject(self, request, pk=None):
        contact = self.get_object()
        contact.status = 'rejected'
        contact.save()

        # Envoyer un email au visiteur
        send_mail(
            subject=f"Votre demande de contact n'a pas été acceptée",
            message=f"""
            Bonjour {contact.name},

            Nous sommes désolés, mais votre demande de contact avec {contact.provider.company_name} n'a pas été acceptée.

            Cordialement,
            L'équipe de Wilma Connect
            """,
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[contact.email],
            fail_silently=True,
        )

        return Response(VisitorContactSerializer(contact).data) 