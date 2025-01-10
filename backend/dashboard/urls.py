from django.urls import path, include
from rest_framework import routers
from dashboard import views

routerRecProduct=routers.DefaultRouter()
routerRecProduct.register(r'', views.RecProductView,'recproducts')
routerRecArea=routers.DefaultRouter()
routerRecArea.register(r'', views.RecAreaView,'recareas')
routerRecRegister=routers.DefaultRouter()
routerRecRegister.register(r'', views.RecRegisterView,'recregisters')


urlpatterns = [
    path('record-products/', include(routerRecProduct.urls)),
    path('record-areas/', include(routerRecArea.urls)),
    path('record-registers/', include(routerRecRegister.urls)),
]