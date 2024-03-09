from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth.hashers import make_password
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status

from . models import User
from . serializers import RegisterUserSerializer, MyTokenObtainPairSerializer

@api_view(['POST'])
def register(request):
    # Validamos los datos utilizando el serializador
    serializer = RegisterUserSerializer(data=request.data)
    if serializer.is_valid():
        # Si los datos son válidos, procedemos a crear el usuario
        validated_data = serializer.validated_data
        user = User.objects.create(
            email=validated_data['email'],
            name=validated_data['name'],
            last_name=validated_data['last_name'],
            password=make_password(validated_data['password']),
        )
        # Serializamos la instancia del usuario creado para la respuesta
        response_serializer = RegisterUserSerializer(user, many=False)
        return Response(response_serializer.data, status=status.HTTP_201_CREATED)
    else:
        # Si los datos no son válidos, retornamos un error
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
# Create your views here.


class LoginView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer