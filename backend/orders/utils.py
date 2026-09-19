from django.core.mail import send_mail
from django.conf import settings


def send_order_confirmation_email(order):
    items_text = "\n".join(
        f"- {item.product_name} x {item.quantity} = ${item.sub_total()}"
        for item in order.items.all()
    )

    subject = f"Order Confirmation - {order.order_number}"
    message = f"""
Hi {order.user.name},

Thank you for your order! Here are your order details:

Order Number: {order.order_number}
Payment Method: {order.payment_method}
Payment Status: {order.payment_status}

Items:
{items_text}

Subtotal: ${order.total}
Tax: ${order.tax}
Grand Total: ${order.grand_total}

Shipping Address:
{order.address.full_name}
{order.address.phone}
{order.address.address_line}, {order.address.city}, {order.address.state} {order.address.postal_code}, {order.address.country}

Thank you for shopping with GreatKart!
"""

    send_mail(
        subject,
        message,
        settings.DEFAULT_FROM_EMAIL,
        [order.user.email],
        fail_silently=False,
    )