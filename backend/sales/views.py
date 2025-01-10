from rest_framework import viewsets
from sales.models import Register, Facture, FactureProduct
from .serializers import *

class RegisterView(viewsets.ModelViewSet):
    serializer_class = Serializer_Register
    queryset = Register.objects.all()

class FactureView(viewsets.ModelViewSet):
    serializer_class = Serializer_Facture
    queryset = Facture.objects.all()
    
class FactureProductView(viewsets.ModelViewSet):
    serializer_class = Serializer_FactureProduct
    queryset = FactureProduct.objects.all()