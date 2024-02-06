from django.urls import path
from .views import UserAPI

urlpatterns = [
    path('data/', UserAPI.as_view()),
]
