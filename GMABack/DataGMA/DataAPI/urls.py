from django.urls import path
from DataAPI.views import DataAPI

urlpatterns = [
    path('data/', DataAPI.as_view()),
]
