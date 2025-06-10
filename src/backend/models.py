from django.contrib.auth.models import AbstractUser, UserManager, PermissionsMixin
from django.db import models
from django.core.validators import RegexValidator, MinValueValidator, MaxValueValidator
from django.utils import timezone

class CustomUser(AbstractUser):
    email = models.EmailField(unique=True, blank=True, null=True)
    is_provider = models.BooleanField(default=True)
    is_validated = models.BooleanField(default=False)
    first_name = models.CharField(max_length=150, blank=True, null=True, default='')
    last_name = models.CharField(max_length=150, blank=True, null=True, default='')
    phone = models.CharField(
        max_length=20, 
        blank=True, 
        null=True,
        default='',
        validators=[
            RegexValidator(
                regex=r'^\+?1?\d{9,15}$',
                message="Le numéro de téléphone doit être au format: '+999999999'."
            )
        ]
    )
    profile_photo = models.CharField(blank=True, null=True, default='')
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(default=timezone.now)

    groups = models.ManyToManyField(
        'auth.Group',
        related_name='customuser_set',
        blank=True,
        help_text='The groups this user belongs to.',
        related_query_name='customuser'
    )

    user_permissions = models.ManyToManyField(
        'auth.Permission',
        related_name='customuser_permissions',
        blank=True,
        help_text='Specific permissions for this user.',
        related_query_name='customuser'
    )

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    class Meta:
        indexes = [
            models.Index(fields=['email']),
            models.Index(fields=['is_provider']),
            models.Index(fields=['is_validated']),
        ]

    def get_full_name(self):
        return f"{self.first_name} {self.last_name}".strip() or self.username

    def is_active_provider(self):
        return self.is_provider and self.is_validated

    def save(self, *args, **kwargs):
        if not self.id:
            self.created_at = timezone.now()
        self.updated_at = timezone.now()
        super().save(*args, **kwargs)

class ProviderApplication(models.Model):
    STATUS_CHOICES = (
        ('pending', 'En attente'),
        ('approved', 'Validée'),
        ('rejected', 'Rejetée'),
    )

    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE, related_name='provider_application', blank=True, null=True)
    company_name = models.CharField(max_length=255, blank=True, null=True, default='')
    description = models.TextField(default='')
    category = models.CharField(max_length=255, blank=True, null=True, default='')
    address = models.CharField(max_length=255, blank=True, null=True, default='')
    city = models.CharField(max_length=100, blank=True, null=True, default='')
    latitude = models.FloatField(null=True, blank=True, default=0.0)
    longitude = models.FloatField(null=True, blank=True, default=0.0)
    postal_code = models.CharField(
        max_length=20, 
        blank=True, 
        null=True,
        default='',
        validators=[
            RegexValidator(
                regex=r'^\d{5}$',
                message="Le code postal doit contenir 5 chiffres."
            )
        ]
    )
    submitted_at = models.DateTimeField(default=timezone.now)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='pending')
    rating = models.DecimalField(
        max_digits=3, 
        decimal_places=1, 
        default=0.0,
        validators=[MinValueValidator(0.0), MaxValueValidator(5.0)]
    )
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(default=timezone.now)

    def create_default_schedules(self):
        """Crée les horaires par défaut pour chaque jour de la semaine"""
        for day, _ in Schedule.DAYS_OF_WEEK:
            Schedule.objects.create(
                provider=self,
                day=day,
                opening_time='09:00',
                closing_time='18:00',
                is_closed=day in ['SATURDAY', 'SUNDAY']  # Fermé par défaut le weekend
            )

    def save(self, *args, **kwargs):
        is_new = self.id is None
        if not self.id:
            self.created_at = timezone.now()
        self.updated_at = timezone.now()
        super().save(*args, **kwargs)
        
        # Créer les horaires par défaut si c'est un nouveau provider
        if is_new:
            self.create_default_schedules()

    class Meta:
        indexes = [
            models.Index(fields=['status']),
            models.Index(fields=['city']),
            models.Index(fields=['category']),
            models.Index(fields=['rating']),
        ]

    def update_rating(self):
        avg_rating = self.reviews.aggregate(models.Avg('rating'))['rating__avg']
        if avg_rating is not None:
            self.rating = round(avg_rating, 1)
            self.save()

    def is_approved(self):
        return self.status == 'approved'

    def get_full_address(self):
        return f"{self.address}, {self.postal_code} {self.city}"

class Service(models.Model):
    provider = models.ForeignKey(ProviderApplication, on_delete=models.CASCADE, related_name='services')
    name = models.CharField(max_length=100, default='')
    description = models.TextField(default='')
    price = models.DecimalField(
        max_digits=10, 
        decimal_places=2,
        default=0.00,
        validators=[MinValueValidator(0.0)]
    )
    duration = models.CharField(
        max_length=50,
        default='0h00',
        validators=[
            RegexValidator(
                regex=r'^\d+h\d{2}$',
                message="La durée doit être au format: '1h30'"
            )
        ]
    )
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(default=timezone.now)

    class Meta:
        indexes = [
            models.Index(fields=['provider']),
            models.Index(fields=['price']),
        ]

    def __str__(self):
        return f"{self.name} - {self.provider}"

    def get_duration_minutes(self):
        hours, minutes = map(int, self.duration.split('h'))
        return hours * 60 + minutes

    def save(self, *args, **kwargs):
        if not self.id:
            self.created_at = timezone.now()
        self.updated_at = timezone.now()
        super().save(*args, **kwargs)

class Review(models.Model):
    provider = models.ForeignKey('ProviderApplication', on_delete=models.CASCADE, related_name='reviews')
    name = models.CharField(max_length=255, default='')
    rating = models.PositiveIntegerField(
        default=5,
        validators=[MinValueValidator(1), MaxValueValidator(5)]
    )
    comment = models.TextField(default='')
    created_at = models.DateTimeField(default=timezone.now)

    class Meta:
        indexes = [
            models.Index(fields=['provider']),
            models.Index(fields=['rating']),
            models.Index(fields=['created_at']),
        ]

    def __str__(self):
        return f"Avis de {self.name} ({self.rating}★)"

    def save(self, *args, **kwargs):
        if not self.id:
            self.created_at = timezone.now()
        super().save(*args, **kwargs)
        self.provider.update_rating()

class Schedule(models.Model):
    DAYS_OF_WEEK = [
        ('MONDAY', 'Lundi'),
        ('TUESDAY', 'Mardi'),
        ('WEDNESDAY', 'Mercredi'),
        ('THURSDAY', 'Jeudi'),
        ('FRIDAY', 'Vendredi'),
        ('SATURDAY', 'Samedi'),
        ('SUNDAY', 'Dimanche'),
    ]

    provider = models.ForeignKey(ProviderApplication, on_delete=models.CASCADE, related_name='schedules')
    day = models.CharField(max_length=10, choices=DAYS_OF_WEEK, default='MONDAY')
    opening_time = models.TimeField(default='09:00')
    closing_time = models.TimeField(default='18:00')
    is_closed = models.BooleanField(default=False)
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(default=timezone.now)

    class Meta:
        unique_together = ('provider', 'day')

    def __str__(self):
        if self.is_closed:
            return f"{self.get_day_display()} - Fermé"
        return f"{self.get_day_display()} - {self.opening_time} à {self.closing_time}"

    def save(self, *args, **kwargs):
        if not self.id:
            self.created_at = timezone.now()
        self.updated_at = timezone.now()
        super().save(*args, **kwargs)

class Gallery(models.Model):
    provider = models.ForeignKey(ProviderApplication, on_delete=models.CASCADE, related_name='gallery')
    image = models.ImageField(upload_to='gallery/')
    description = models.CharField(max_length=255, blank=True, null=True)
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return f"Image de {self.provider}"

    def save(self, *args, **kwargs):
        if not self.id:
            self.created_at = timezone.now()
        self.updated_at = timezone.now()
        super().save(*args, **kwargs)

class ContactRequest(models.Model):
    STATUS_CHOICES = (
        ('new', 'Nouvelle'),
        ('in_progress', 'En cours'),
        ('completed', 'Terminée'),
    )

    provider = models.ForeignKey(ProviderApplication, on_delete=models.CASCADE, related_name='contact_requests')
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='contact_requests')
    subject = models.CharField(max_length=255)
    message = models.TextField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='new')
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(default=timezone.now)

    class Meta:
        indexes = [
            models.Index(fields=['provider']),
            models.Index(fields=['user']),
            models.Index(fields=['status']),
            models.Index(fields=['created_at']),
        ]

    def __str__(self):
        return f"Demande de contact de {self.user.get_full_name()} à {self.provider.company_name}"

    def save(self, *args, **kwargs):
        if not self.id:
            self.created_at = timezone.now()
        self.updated_at = timezone.now()
        super().save(*args, **kwargs)

class VisitorContact(models.Model):
    STATUS_CHOICES = (
        ('pending', 'En attente'),
        ('accepted', 'Accepté'),
        ('rejected', 'Refusé'),
    )

    provider = models.ForeignKey(ProviderApplication, on_delete=models.CASCADE, related_name='visitor_contacts')
    name = models.CharField(max_length=255)
    email = models.EmailField()
    phone = models.CharField(
        max_length=20,
        validators=[
            RegexValidator(
                regex=r'^\+?1?\d{9,15}$',
                message="Le numéro de téléphone doit être au format: '+999999999'."
            )
        ]
    )
    message = models.TextField()
    visitor_ip = models.GenericIPAddressField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(default=timezone.now)

    class Meta:
        indexes = [
            models.Index(fields=['provider']),
            models.Index(fields=['status']),
            models.Index(fields=['created_at']),
            models.Index(fields=['visitor_ip']),
        ]
        unique_together = ('provider', 'visitor_ip')

    def __str__(self):
        return f"Contact de {self.name} à {self.provider.company_name}"

    def save(self, *args, **kwargs):
        if not self.id:
            self.created_at = timezone.now()
        self.updated_at = timezone.now()
        super().save(*args, **kwargs) 