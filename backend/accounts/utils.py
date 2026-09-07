from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.utils.http import urlsafe_base64_encode
from django.utils.encoding import force_bytes
from django.core.mail import send_mail
from django.conf import settings


class AccountActivationTokenGenerator(PasswordResetTokenGenerator):
    def _make_hash_value(self, user, timestamp):
        return f"{user.pk}{timestamp}{user.is_active}"


account_activation_token = AccountActivationTokenGenerator()


class PasswordResetTokenGeneratorCustom(PasswordResetTokenGenerator):
    def _make_hash_value(self, user, timestamp):
        return f"{user.pk}{timestamp}{user.password}"


password_reset_token = PasswordResetTokenGeneratorCustom()


def send_verification_email(user):
    uid = urlsafe_base64_encode(force_bytes(user.pk))
    token = account_activation_token.make_token(user)
    verification_link = f"http://127.0.0.1:3000/verify-email/{uid}/{token}/"

    subject = "Verify your email - GreatKart"
    message = f"""
Hi {user.name},

Thank you for registering. Please click the link below to verify your email:

{verification_link}

If you did not create this account, please ignore this email.
"""
    send_mail(subject, message, settings.DEFAULT_FROM_EMAIL, [user.email], fail_silently=False)


def send_password_reset_email(user):
    uid = urlsafe_base64_encode(force_bytes(user.pk))
    token = password_reset_token.make_token(user)
    reset_link = f"http://127.0.0.1:3000/reset-password/{uid}/{token}/"

    subject = "Reset your password - GreatKart"
    message = f"""
Hi {user.name},

We received a request to reset your password. Click the link below to set a new password:

{reset_link}

This link will expire once used. If you did not request this, please ignore this email.
"""
    send_mail(subject, message, settings.DEFAULT_FROM_EMAIL, [user.email], fail_silently=False)