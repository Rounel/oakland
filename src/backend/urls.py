from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import *

router = DefaultRouter()
router.register(r'auth', AuthViewSet, basename='auth')
router.register(r'users', UserViewSet, basename='user')
router.register(r'providers', ProviderApplicationViewSet, basename='provider')
router.register(r'services', ServiceViewSet, basename='service')
router.register(r'reviews', ReviewViewSet, basename='review')
router.register(r'schedules', ScheduleViewSet, basename='schedule')
router.register(r'social-media', SocialMediaViewSet, basename='social-media')
router.register(r'gallery', GalleryViewSet, basename='gallery')
router.register(r'admin/providers', AdminProviderViewSet, basename='admin-provider')

urlpatterns = [
    path('', include(router.urls)),
    path('upload/', ImageUploadView.as_view(), name='image-upload'),
]