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
        location = request.query_params.get('location')
        min_rating = request.query_params.get('min_rating')
        availability = request.query_params.get('availability')
        categories = request.query_params.getlist('categories')
        lat = request.query_params.get('lat')
        lng = request.query_params.get('lng')
        radius = request.query_params.get('radius')

        if location:
            queryset = queryset.filter(
                Q(city__icontains=location) |
                Q(address__icontains=location)
            )

        if min_rating:
            queryset = queryset.filter(rating__gte=float(min_rating))

        if categories:
            queryset = queryset.filter(category__in=categories)

        if availability:
            # Logique de filtrage par disponibilité
            pass

        if lat and lng and radius:
            # Logique de filtrage par distance
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

class SocialMediaViewSet(viewsets.ModelViewSet):
    serializer_class = SocialMediaSerializer
    permission_classes = [IsProviderOrReadOnly]

    def get_queryset(self):
        return SocialMedia.objects.filter(provider__status='approved')

    def perform_create(self, serializer):
        provider = ProviderApplication.objects.get(user=self.request.user)
        serializer.save(provider=provider)

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