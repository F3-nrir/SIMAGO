from django.db import models
from django.core.validators import MinValueValidator

# Create your models here.
class Area(models.Model):
    area_id=models.AutoField(primary_key=True, unique=True, editable=False)
    area_name=models.CharField(max_length=20)
    area_description=models.CharField(max_length=300)
    def __str__(self) -> str:
        return self.area_name
    
class Product(models.Model):
    product_id=models.AutoField(primary_key=True, editable=False)
    product_name=models.CharField(max_length=20)
    area=models.ForeignKey(Area, on_delete=models.CASCADE)
    price=models.FloatField(editable=True, validators=[MinValueValidator(0.01)]) # ESTABLECER UN MINIMO
    product_description=models.CharField(max_length=300)
    weight=models.CharField(max_length=20)
    stock=models.IntegerField(editable=True, validators=[MinValueValidator(0)]) # ESTABLECER UN MINIMO
    def __str__(self) -> str:
        return self.product_name


    
    