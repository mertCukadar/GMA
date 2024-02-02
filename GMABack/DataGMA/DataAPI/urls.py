from django.urls import path
from DataAPI.views import DataAPI , TestAPI

urlpatterns = [
    path('data/', DataAPI.as_view()),
    path('test/', TestAPI.as_view()),
]
