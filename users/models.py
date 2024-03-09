from typing import Any
from django.db import models
from django.utils import timezone
from django.contrib.auth.models import (
    AbstractBaseUser,
    PermissionsMixin,
    UserManager
)
# Create your models here.

class CustomUserManager(UserManager):
    def _create_user(self, email, password, **extra_fields):  # Corregido aquí
        if not email:
            raise ValueError("Debes tener un correo electrónico.")
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)  # También corregí extra_fiels por extra_fields
        user.set_password(password)
        user.save(using=self._db)

        return user
    
    def create_user(self, email=None, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", False)
        extra_fields = {**extra_fields, **{"is_superuser": False}}  # Asegurando que los usuarios normales no sean superusuarios
        return self._create_user(email, password, **extra_fields)
    
    def create_superuser(self, email=None, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)  # Los superusuarios deben tener este campo establecido en True
        return self._create_user(email, password, **extra_fields)
    

class User(AbstractBaseUser, PermissionsMixin):
    email = models.CharField(max_length=100, unique=True)
    name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    avatar = models.ImageField(default="avatar.png")
    date_joined = models.DateTimeField(default=timezone.now)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)  # Recomendado para manejar si un usuario debe ser considerado activo
    objects = CustomUserManager()
    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

    class Meta:
        ordering = ["-date_joined"]
