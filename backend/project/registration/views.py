from django.shortcuts import render

from rest_framework import generics
from rest_framework.response import Response

from .serializers import RegistrationSerializer

from django.contrib.auth.models import User



"""
Class Registration

"""

class RegistrationView(generics.CreateAPIView):
    serializer_class = RegistrationSerializer

    def get(self, request):
        arr = User.objects.all().values()
        return Response({'posts': list(arr)})