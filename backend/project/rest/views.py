from django.shortcuts import render
from django.forms import model_to_dict

from rest_framework import generics
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.pagination import PageNumberPagination
from rest_framework.generics import ListAPIView

from . serializers import RegistrationSerializer
from registration.models import Registration

from . serializers import PhotosSerializer
from create.models import Photos

# Photos 

class PhotoAPIView(APIView):

    def get(self, request):
        arr = Photos.objects.all().values()
        return Response({'posts': list(arr)})
    
# Pagination

class PhotoPagination(PageNumberPagination):

    page_size = 20
    page_size_query_param = 'page_size'
    max_page_size = 100

class PhotoPaginationList(ListAPIView):
    serializer_class = PhotosSerializer
    pagination_class = PhotoPagination
    
    def get_queryset(self):
        return Photos.objects.all()

# Users registratin 

class RegistrationAPIView(APIView):

    def get(self, request):
        arr = Registration.objects.all().values()
        return Response({'posts': list(arr)})
    
    def post(self, request, format=None):
        serializer = RegistrationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=400)