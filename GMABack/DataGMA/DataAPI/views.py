from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import sensorDataSerializer
from .models import sensorData

import pandas as pd
import os
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

class DatacsvAPI(APIView):
    #by user id
    def get(self, request):
        request_id = request.query_params.get('id')
        data = sensorData.objects.filter(UserID = request_id)
        serializer = sensorDataSerializer(data , many = True)

        file_path = request_id + '_data.csv'
        df = pd.DataFrame(serializer.data)
        df.to_csv(file_path, index=False)

        print(df)

        return Response(serializer.data)
        
        
