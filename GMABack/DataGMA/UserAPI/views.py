from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import UserSerializer
from .models import User

# Create your views here.
class UserAPI(APIView):
    def post(self, request):
        data = request.data
        serializer = UserSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            user = User.objects.all().last()
            
            #take the last user
            return Response({'id' : user.UserID})
        else:
            return Response(serializer.errors)