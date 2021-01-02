from django.shortcuts import render
from rest_framework import viewsets          
from .serializers import TodoSerializer      
from .models import Petition                     

# Create your views here.

def home(request):
    return render(request, 'index.html')

class PetitionView(viewsets.ModelViewSet):       
  serializer_class = TodoSerializer          
  queryset = Petition.objects.all()