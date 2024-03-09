from django.urls import path
from . import views
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('register/', views.register),
    path('login/', views.LoginView.as_view()),  # Se agregó la coma aquí
    path('refresh/', TokenRefreshView.as_view()),
]

