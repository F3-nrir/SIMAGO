from django.http import JsonResponse
from rest_framework import generics, viewsets
from inventory.models import Product, Area
from .serializers import *
# Create your views here.


class ProductsView(viewsets.ModelViewSet):
    serializer_class = Serializer_Product
    queryset = Product.objects.all()

class AreasView(viewsets.ModelViewSet):
    serializer_class = Serializer_Area
    queryset = Area.objects.all()