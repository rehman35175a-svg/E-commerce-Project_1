from .models import *
from rest_framework import serializers

class AccountSerializer(serializers.ModelSerializer):

    password = serializers.CharField(write_only=True)
    
    class Meta:
        model = Account
        fields = ['name', 'email', 'phone', 'password']


    def create(self, validated_data):
        return Account.objects.create_user(
            **validated_data                    # created all validated data in one step.
        )

    
    # def create(self, validated_data):
    #     return Account.objects.create_user(
    #         name=validated_data["name"],
    #         email=validated_data["email"],
    #         phone=validated_data["phone"],
    #         password=validated_data["password"],
    #     )

    
class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)    


class PasswordResetRequestSerializer(serializers.Serializer):
    email = serializers.EmailField()


class PasswordResetSerializer(serializers.Serializer):
    new_password = serializers.CharField(write_only=True)
    confirm_password = serializers.CharField(write_only=True)