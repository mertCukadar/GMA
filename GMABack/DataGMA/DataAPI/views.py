from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import sensorDataSerializer
# Create your views here.

class DataAPI(APIView):
    def post(self, request):
        data = request.data
        serializer = sensorDataSerializer(data = data , many = True)
        if serializer.is_valid():
            serializer.save()
            return Response({'data': 'Data saved successfully'})
        else:
            return Response(serializer.errors)
