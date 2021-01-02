from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Petition(models.Model):
  title = models.CharField(max_length=120)
  owner = models.ForeignKey(User, related_name='petitions', on_delete=models.CASCADE)
  description = models.TextField()
  published = models.BooleanField(default=False)
  completed = models.BooleanField(default=False)