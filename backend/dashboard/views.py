from .models import RecProduct, RecArea, RecRegister
from .serializers import *
from rest_framework import viewsets

# Create your views here.

class RecProductView(viewsets.ModelViewSet):
    serializer_class = Serializer_RecProduct
    queryset = RecProduct.objects.all()

class RecAreaView(viewsets.ModelViewSet):
    serializer_class = Serializer_RecArea
    queryset = RecArea.objects.all()
    
class RecRegisterView(viewsets.ModelViewSet):
    serializer_class = Serializer_RecRegister
    queryset = RecRegister.objects.all()