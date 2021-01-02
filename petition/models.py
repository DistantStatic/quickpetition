from django.db import models

# Create your models here.
class Petition(models.Model):
  title = models.CharField(max_length=120)
  description = models.TextField()
  published = models.BooleanField(default=False)
  completed = models.BooleanField(default=False)