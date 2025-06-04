from django.test import TestCase
from django.core.mail import send_mail
from django.conf import settings

def test_email_configuration():
    """
    Test de la configuration email.
    Exécutez cette fonction dans le shell Django pour tester l'envoi d'emails.
    """
    try:
        send_mail(
            subject="Test de configuration email",
            message="Si vous recevez cet email, la configuration est correcte !",
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=["fabelseba@yahoo.fr"],
            fail_silently=False,
        )
        print("Email envoyé avec succès ! Vérifiez votre boîte de réception.")
    except Exception as e:
        print(f"Erreur lors de l'envoi de l'email : {str(e)}")

# Create your tests here.
