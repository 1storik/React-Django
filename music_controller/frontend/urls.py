from django.urls import path
from .views import *

app_name = 'frontend'

urlpatterns = [
    path('', index, name=''),
    path('join/', index),
    path('create/', index),
    path('join/1', index),
    path('room/<str:roomCode>/', index)
]
