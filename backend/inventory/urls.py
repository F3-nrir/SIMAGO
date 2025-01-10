from django.urls import path, include
from rest_framework import routers
from rest_framework.documentation import include_docs_urls
from inventory import views

routerProduct = routers.DefaultRouter()
routerProduct.register(r'', views.ProductsView, 'products')
routerArea = routers.DefaultRouter()
routerArea.register(r'', views.AreasView, 'areas')

urlpatterns = [
    path('docs/', include_docs_urls(title="Documentation API")),
    path('products/', include(routerProduct.urls)),
    path('areas/', include(routerArea.urls)),
]