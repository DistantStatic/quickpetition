from rest_framework import serializers
from .models import Petition


class TodoSerializer(serializers.ModelSerializer):
  class Meta:
    model = Petition
    fields = ('id', 'title', 'description', 'published', 'completed')