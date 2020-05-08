from django.db import models

# Create your models here.
class Mail(models.Model):
	sender=models.CharField(max_length=100,null=True)
	reciever=models.CharField(max_length=100,null=True)
	subject=models.CharField(max_length=100,null=True)
	content=models.TextField(null=True)
	created_at = models.DateTimeField(auto_now_add=True,null=True)


	def __str__(self):
		return "From : "+self.sender+" To : "+self.reciever+" Date :"+str(self.created_at)