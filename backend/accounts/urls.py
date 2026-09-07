from django.urls import path
from .views import *

urlpatterns = [
 
path('csrf/', CSRFTokenView.as_view()),
path('registration/', RegistrationView.as_view()),
path('login/', LoginView.as_view()),
path('logout/', LogoutView.as_view()),
path('user/', CurrentUserView.as_view()),
path('password-reset/', PasswordResetRequestView.as_view()),
path('password-reset-confirm/<uidb64>/<token>/', PasswordResetView.as_view()),
path('verify-email/<uidb64>/<token>/', VerifyEmailView.as_view()),

   
]