from django.urls import path
from . import views

urlpatterns = [
    path('',                    views.index,    name='index'),
    path('upload/',             views.upload,   name='upload'),
    path('status/<str:job_id>/', views.status,  name='status'),
    path('result/<str:job_id>/', views.result,  name='result'),
]
