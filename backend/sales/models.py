from django.db import models
from inventory.models import Product
from rest_framework import serializers, generics

# Create your models here.

class Register(models.Model):
    register_id=models.AutoField(primary_key=True, unique=True, editable=False)
    location=models.CharField(max_length=20)
    def __str__(self):
        return self.register_id

class Facture(models.Model):
    facture_id = models.AutoField(primary_key=True, editable=False)
    date = models.DateField(auto_now_add=True)
    total = models.FloatField()
    cant = models.IntegerField()
    register = models.IntegerField()
    products = models.ManyToManyField(Product, through='FactureProduct')

    def __str__(self):
        return self.facture_id

class FactureProduct(models.Model):
    facture = models.ForeignKey(Facture, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.IntegerField(default=1)

    class Meta:
        unique_together = ('facture', 'product')


    
