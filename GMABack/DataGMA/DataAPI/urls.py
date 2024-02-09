from django.urls import path
from DataAPI.views import DataAPI , DatacsvAPI


urlpatterns = [
    path('data/', DataAPI.as_view()),
    path('datacsv/', DatacsvAPI.as_view()),
]
