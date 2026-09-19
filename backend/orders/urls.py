from django.urls import path
from .views import *

urlpatterns = [
    path('addresses/', AddressListCreateView.as_view()),
    path('addresses/<int:pk>/', AddressDetailView.as_view()),
    path('checkout/summary/', CheckoutSummaryView.as_view()),
    path('checkout/place-order/', PlaceOrderView.as_view()),
    path('', OrderListView.as_view()),
    path('<str:order_number>/', OrderDetailView.as_view()),
]