from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import *
from .models import *
from carts.models import Cart, CartItem
from .utils import *
from django.contrib.auth import login, logout, authenticate
from django.views.decorators.csrf import ensure_csrf_cookie
from django.utils.decorators import method_decorator
from rest_framework.permissions import IsAuthenticated
from django.utils.http import urlsafe_base64_decode
from django.utils.encoding import force_str


# ------------------- CSRF TOKEN -------------------
@method_decorator(ensure_csrf_cookie, name='get')
class CSRFTokenView(APIView):
    def get(self, request):
        return Response({"detail": "CSRF cookie set"})


# ------------------- REGISTER -------------------
class RegistrationView(APIView):

    def post(self, request):
        serializer = AccountSerializer(data=request.data)

        if serializer.is_valid():
            user = serializer.save()
            send_verification_email(user)
            return Response(
                {
                    "message": "Account created successfully",
                    # "user": AccountSerializer(user).data,
                },
                status=status.HTTP_201_CREATED,
            )

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



# ------------------- Verify Email -------------------

class VerifyEmailView(APIView):
    def post(self, request, uidb64, token):
        try:
            uid = force_str(urlsafe_base64_decode(uidb64))
            user = Account.objects.get(pk=uid)
        except (TypeError, ValueError, OverflowError, Account.DoesNotExist):
            user = None

        if user is not None and account_activation_token.check_token(user, token):
            if user.is_active:
                return Response({"message": "Account already verified."}, status=status.HTTP_200_OK)
            user.is_active = True
            user.save()
            return Response(
                {"message": "Email verified successfully. You can now log in."},
                status=status.HTTP_200_OK,
            )

        return Response(
            {"message": "Invalid or expired verification link."},
            status=status.HTTP_400_BAD_REQUEST,
        )

# ------------------- LOGIN -------------------

class LoginView(APIView):
    
    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        email = serializer.validated_data['email']
        password = serializer.validated_data['password']
        user = authenticate(request, email=email, password=password)

        if user is not None:
            if not user.is_active:
                return Response(
                    {"message": "Account is not active"},
                    status=status.HTTP_403_FORBIDDEN,
                )

            # ---------- Guest session ID login se PEHLE note kar lo ----------
            guest_session_key = request.session.session_key

            login(request, user)   # Session rotate ho jayegi

            # ---------- Guest cart dhoondo aur merge karo ----------
            if guest_session_key:
                guest_cart = Cart.objects.filter(
                    cart_id=guest_session_key, user__isnull=True
                ).first()

                if guest_cart:
                    user_cart, created = Cart.objects.get_or_create(user=user)

                    guest_items = CartItem.objects.filter(cart=guest_cart, is_active=True)
                    for item in guest_items:
                        existing_item = CartItem.objects.filter(
                            cart=user_cart, product=item.product, is_active=True
                        ).first()

                        if existing_item:
                            existing_item.quantity += item.quantity
                            existing_item.save()
                        else:
                            item.cart = user_cart
                            item.save()

                    guest_cart.delete()   # Purana guest cart hata do

            return Response({"message": "Login successful"}, status=status.HTTP_200_OK)

        return Response(
            {"message": "Invalid email or password"},
            status=status.HTTP_401_UNAUTHORIZED,
        )

# ------------------- LOGOUT -------------------
class LogoutView(APIView):

    def post(self, request):
        logout(request)
        return Response({"message": "Logout successful"}, status=status.HTTP_200_OK)



class CurrentUserView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response(AccountSerializer(request.user).data)



class PasswordResetRequestView(APIView):
    def post(self, request):
        serializer = PasswordResetRequestSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        email = serializer.validated_data['email']

        try:
            user = Account.objects.get(email=email)
            send_password_reset_email(user)
        except Account.DoesNotExist:
            return Response(
                {"message": "This email is not registered."},
                status=status.HTTP_404_NOT_FOUND,
            )

        return Response(
            {"message": "Password reset link has been sent to your email."},
            status=status.HTTP_200_OK,
        )


class PasswordResetView(APIView):
    def post(self, request, uidb64, token):
        try:
            uid = force_str(urlsafe_base64_decode(uidb64))
            user = Account.objects.get(pk=uid)
        except (TypeError, ValueError, OverflowError, Account.DoesNotExist):
            user = None

        if user is None or not password_reset_token.check_token(user, token):
            return Response(
                {"message": "Invalid or expired reset link."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        serializer = PasswordResetSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        user.set_password(serializer.validated_data['new_password'])
        user.save()

        return Response(
            {"message": "Password reset successful. You can now log in with your new password."},
            status=status.HTTP_200_OK,
        )
    