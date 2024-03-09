from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import serializers
from .models import User  # Se corrigió el espacio antes de "models"

class RegisterUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["email", "name", "last_name", "password"]
        extra_kwargs = {
            'password': {'write_only': True}  # Asegura que la contraseña no se devuelva en ninguna respuesta
        }

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Se agregó un manejo seguro para user.avatar.url por si 'avatar' es None
        token['email'] = user.email
        token['avatar'] = user.avatar.url if user.avatar else None
        token['is_staff'] = user.is_staff

        return token