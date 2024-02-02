from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
# Create your views here.

class DataAPI(APIView):
    def post(self, request):
        data = request.data
        print(data)
        return Response({'data': data})
    

class TestAPI(APIView):
    def get(self, request):
        return Response({'data': 'Hello World!'})