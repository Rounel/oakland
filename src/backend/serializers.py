from rest_framework import serializers
from django.contrib.auth import authenticate
from django.utils.translation import gettext_lazy as _
from django.contrib.auth import get_user_model
from .models import *
from django.core.validators import MinValueValidator, MaxValueValidator
import re

User = get_user_model()

class BaseModelSerializer(serializers.ModelSerializer):
    created_at = serializers.DateTimeField(read_only=True)
    updated_at = serializers.DateTimeField(read_only=True)

class UserSerializer(BaseModelSerializer):
    gallery = serializers.SerializerMethodField()
    services = serializers.SerializerMethodField()
    schedules = serializers.SerializerMethodField()
    provider_info = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ['id', 'email', 'username', 'first_name', 'last_name', 'phone', 'profile_photo', 'is_provider', 'is_validated', 'created_at', 'updated_at', 'gallery', 'services', 'schedules', 'provider_info']
        read_only_fields = ['is_provider', 'is_validated']

    def get_gallery(self, obj):
        try:
            provider = obj.provider_application
            if provider and provider.status == 'approved':
                gallery = Gallery.objects.filter(provider=provider)
                return GallerySerializer(gallery, many=True).data
            return []
        except:
            return []

    def get_services(self, obj):
        try:
            provider = obj.provider_application
            if provider and provider.status == 'approved':
                services = Service.objects.filter(provider=provider)
                return ServiceSerializer(services, many=True).data
            return []
        except:
            return []

    def get_schedules(self, obj):
        try:
            provider = obj.provider_application
            if provider and provider.status == 'approved':
                schedules = Schedule.objects.filter(provider=provider)
                return ScheduleSerializer(schedules, many=True).data
            return []
        except:
            return []

    def get_provider_info(self, obj):
        try:
            provider = obj.provider_application
            if provider and provider.status == 'approved':
                return {
                    'company_name': provider.company_name,
                    'description': provider.description,
                    'category': provider.category,
                    'address': provider.address,
                    'city': provider.city,
                    'postal_code': provider.postal_code,
                    'latitude': provider.latitude,
                    'longitude': provider.longitude,
                    'status': provider.status,
                    'rating': provider.rating
                }
            return {}
        except:
            return {}

def validate_password_strength(password):
    if len(password) < 8:
        raise serializers.ValidationError("Le mot de passe doit contenir au moins 8 caractères.")
    if not re.search(r'[A-Z]', password):
        raise serializers.ValidationError("Le mot de passe doit contenir au moins une lettre majuscule.")
    if not re.search(r'[0-9]', password):
        raise serializers.ValidationError("Le mot de passe doit contenir au moins un chiffre.")
    if not re.search(r'[!@#$%^&*(),.?":{}|<>]', password):
        raise serializers.ValidationError("Le mot de passe doit contenir au moins un symbole (!@#$%^&*(),.?\":{}|<>).")
    return password

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=8)
    confirm_password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['id', 'email', 'username', 'password', 'confirm_password', 'phone', 'profile_photo']
        extra_kwargs = {'password': {'write_only': True}}

    def validate(self, data):
        if data['password'] != data['confirm_password']:
            raise serializers.ValidationError({"confirm_password": "Les mots de passe ne correspondent pas."})
        validate_password_strength(data['password'])
        return data

    def create(self, validated_data):
        validated_data.pop('confirm_password')
        user = User.objects.create_user(**validated_data)
        return user

class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(style={"input_type": "password"}, trim_whitespace=False)

    def validate(self, attrs):
        email = attrs.get("email")
        password = attrs.get("password")

        if not email or not password:
            raise serializers.ValidationError(_("Les champs 'email' et 'password' sont requis."), code="authorization")

        user = authenticate(request=self.context.get("request"), username=email, password=password)
        if not user:
            raise serializers.ValidationError(_("Identifiants invalides."), code="authorization")

        attrs["user"] = user
        return attrs

class ReviewSerializer(BaseModelSerializer):
    class Meta:
        model = Review
        fields = ['id', 'name', 'rating', 'comment', 'created_at']
        read_only_fields = ['created_at']

    def validate_rating(self, value):
        if not 1 <= value <= 5:
            raise serializers.ValidationError("La note doit être comprise entre 1 et 5.")
        return value

class ReviewCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = ['rating', 'comment']

    def validate_rating(self, value):
        if not 1 <= value <= 5:
            raise serializers.ValidationError("La note doit être comprise entre 1 et 5.")
        return value

class GallerySerializer(BaseModelSerializer):
    class Meta:
        model = Gallery
        fields = ['id', 'image', 'description', 'created_at']
        read_only_fields = ['created_at']

class ScheduleSerializer(BaseModelSerializer):
    class Meta:
        model = Schedule
        fields = ['day', 'opening_time', 'closing_time', 'is_closed']

    def validate(self, data):
        if not data.get('is_closed'):
            if data.get('opening_time') >= data.get('closing_time'):
                raise serializers.ValidationError("L'heure d'ouverture doit être antérieure à l'heure de fermeture.")
        return data

class ServiceSerializer(BaseModelSerializer):
    class Meta:
        model = Service
        fields = ['id', 'name', 'description', 'price', 'duration', 'created_at', 'updated_at']
        read_only_fields = ['created_at', 'updated_at']

    def validate_price(self, value):
        if value < 0:
            raise serializers.ValidationError("Le prix ne peut pas être négatif.")
        return value

    def validate_duration(self, value):
        try:
            hours, minutes = map(int, value.split('h'))
            if not (0 <= hours <= 24 and 0 <= minutes <= 59):
                raise ValueError
        except ValueError:
            raise serializers.ValidationError("La durée doit être au format '1h30' avec des heures entre 0 et 24 et des minutes entre 0 et 59.")
        return value

class ProviderApplicationSerializer(BaseModelSerializer):
    user = UserSerializer(read_only=True)
    services = ServiceSerializer(many=True, read_only=True)
    reviews = ReviewSerializer(many=True, read_only=True)
    schedules = ScheduleSerializer(many=True, read_only=True)
    gallery = GallerySerializer(many=True, read_only=True)
    rating = serializers.DecimalField(max_digits=3, decimal_places=1, read_only=True)
    postal_code = serializers.CharField(max_length=5, min_length=5)

    class Meta:
        model = ProviderApplication
        fields = '__all__'
        read_only_fields = ['submitted_at', 'user', 'rating', 'created_at', 'updated_at']

    def validate_postal_code(self, value):
        # Supprimer les espaces
        value = value.replace(' ', '')
        # Vérifier que c'est un nombre de 5 chiffres
        if not value.isdigit() or len(value) != 5:
            raise serializers.ValidationError("Le code postal doit contenir 5 chiffres.")
        return value

    def update(self, instance, validated_data):
        # Mise à jour des champs de base
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        
        instance.save()
        return instance

class ProviderRegistrationSerializer(serializers.ModelSerializer):
    provider_application = ProviderApplicationSerializer()
    password = serializers.CharField(write_only=True, min_length=8)
    confirm_password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['email', 'username', 'first_name', 'last_name', 'phone', 'profile_photo', 'password', 'confirm_password', 'provider_application']
        extra_kwargs = {'password': {'write_only': True}}

    def validate(self, data):
        print("Validation des données:", data)
        if data['password'] != data['confirm_password']:
            raise serializers.ValidationError({"confirm_password": "Les mots de passe ne correspondent pas."})
        
        validate_password_strength(data['password'])
        
        # Vérifier si l'email existe déjà
        if User.objects.filter(email=data['email']).exists():
            raise serializers.ValidationError({"email": "Cet email est déjà utilisé."})
        
        # Vérifier si le username existe déjà
        if User.objects.filter(username=data['username']).exists():
            raise serializers.ValidationError({"username": "Ce nom d'utilisateur est déjà utilisé."})
        
        return data

    def create(self, validated_data):
        print("Création du provider avec les données:", validated_data)
        try:
            app_data = validated_data.pop('provider_application')
            validated_data.pop('confirm_password')
            
            # Créer l'utilisateur
            user = User.objects.create_user(
                **validated_data,
                is_provider=True,
                is_validated=False
            )
            print("Utilisateur créé:", user.id)
            
            # Créer le provider
            provider = ProviderApplication.objects.create(
                user=user,
                **app_data
            )
            print("Provider créé:", provider.id)

            # Notifier les admins
            from django.core.mail import send_mail
            admins = User.objects.filter(is_staff=True)
            for admin in admins:
                send_mail(
                    subject="Nouvelle demande d'inscription prestataire",
                    message=f"Un nouveau prestataire a soumis une demande de validation : {user.get_full_name()} ({user.email})",
                    from_email="noreply@votreapp.com",
                    recipient_list=[admin.email],
                    fail_silently=True,
                )

            return user
        except Exception as e:
            print("Erreur lors de la création:", str(e))
            raise serializers.ValidationError(f"Erreur lors de la création: {str(e)}")

class ContactRequestSerializer(serializers.ModelSerializer):
    user_name = serializers.SerializerMethodField()
    provider_name = serializers.SerializerMethodField()

    class Meta:
        model = ContactRequest
        fields = ['id', 'provider', 'user', 'user_name', 'provider_name', 'subject', 'message', 'status', 'created_at', 'updated_at']
        read_only_fields = ['user', 'provider', 'created_at', 'updated_at']

    def get_user_name(self, obj):
        return obj.user.get_full_name()

    def get_provider_name(self, obj):
        return obj.provider.company_name

class VisitorContactSerializer(serializers.ModelSerializer):
    provider = serializers.PrimaryKeyRelatedField(queryset=ProviderApplication.objects.all())
    provider_details = serializers.SerializerMethodField()
    provider_contact_info = serializers.SerializerMethodField()
    can_view_contact = serializers.SerializerMethodField()

    class Meta:
        model = VisitorContact
        fields = [
            'id',
            'provider',
            'provider_details',
            'name',
            'email',
            'phone',
            'message',
            'visitor_ip',
            'status',
            'created_at',
            'updated_at',
            'provider_contact_info',
            'can_view_contact'
        ]
        read_only_fields = [
            'id',
            'status',
            'created_at',
            'updated_at',
            'visitor_ip',
            'provider_contact_info',
            'can_view_contact',
            'provider_details'
        ]

    def get_provider_details(self, obj):
        return {
            'id': obj.provider.id,
            'company_name': obj.provider.company_name,
            'user': {
                'email': obj.provider.user.email,
                'phone': obj.provider.user.phone
            }
        }

    def get_provider_contact_info(self, obj):
        request = self.context.get('request')
        if not request:
            return None

        # Vérifier si le visiteur a déjà un contact accepté avec ce prestataire
        visitor_ip = request.META.get('REMOTE_ADDR')
        has_accepted_contact = VisitorContact.objects.filter(
            provider=obj.provider,
            visitor_ip=visitor_ip,
            status='accepted'
        ).exists()

        if has_accepted_contact:
            return {
                'email': obj.provider.user.email,
                'phone': obj.provider.user.phone
            }
        return None

    def get_can_view_contact(self, obj):
        request = self.context.get('request')
        if not request:
            return False

        visitor_ip = request.META.get('REMOTE_ADDR')
        return VisitorContact.objects.filter(
            provider=obj.provider,
            visitor_ip=visitor_ip,
            status='accepted'
        ).exists()
