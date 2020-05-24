from django.shortcuts import render
from django.http import JsonResponse,HttpResponse
from random import random,choice
import sys
import json
from . import get_mail
from .models import Mail
import datetime
# Create your views here.

from django.views import View
from rest_framework.decorators import api_view
from rest_framework.views import APIView

def purge_mail():
	now=datetime.datetime.now()
	for mail in Mail.objects.all():
		if (now-mail.created_at.replace(tzinfo=None)) >= (datetime.date(2011, 1, 5)-datetime.date(2011, 1, 2)):
			mail.delete()


def update_db(mail):
	with open("mailgetter/mail.json") as mailfile:
		mailconfig=json.loads(mailfile.read())
		mailfile.close()
	mails=get_mail.main(mailconfig["user"], mailconfig["pass"], mailconfig["imap_url"], mail)

	for mail_json in mails:
		maildb=Mail()
		maildb.sender=mail_json["from_adress"]
		maildb.reciever=mail_json["to_adress"]
		maildb.subject=mail_json["subject"]
		maildb.content=mail_json["content"]
		maildb.save()

class GetAdress(APIView):
	"""
	Generate disposable email adress
	"""
	def get(self,request,api_key,domain="all"):
		
		domains_list=[]
		with open("mailgetter/domains.txt") as domains:
			domains_list=domains.readlines()
			domains.close()
		for i in range(len(domains_list)):
			if domains_list[i][-1]=='\n':
				domains_list[i]=domains_list[i][0:-1].lower()
		if domain=='all':
			suffix=choice(domains_list)
		else:
			if domain.lower() not in domains_list:
				return JsonResponse({"error":"domain not authorised"})
			else:
				suffix=domain
		prefix=''.join(choice("azertyuiopqsdfghjklmwxcvbn1234567890") for i in range(15))
		result={}
		result["mail"]=prefix+"@"+suffix
		return JsonResponse(result)

class GetDomains(APIView):
	"""
	Get available domains
	"""
	def get(self,request,api_key):
		purge_mail()
		domains_list=[]
		with open("mailgetter/domains.txt") as domains:
			domains_list=domains.readlines()
			domains.close()
		for i in range(len(domains_list)):
			if domains_list[i][-1]=='\n':
				domains_list[i]=domains_list[i][0:-1]
		
		
		return JsonResponse(domains_list,safe=False)
	

class GetMail(APIView):
	"""
	Get last mail
	"""
	def get(self,request,mail,api_key):
		purge_mail()
		update_db(mail)
		result={}
		mail=Mail.objects.filter(reciever=mail).last()
		if mail!=None:
			result["id"]=mail.id
			result["sender"]=mail.sender
			result["reciever"]=mail.reciever
			result["subject"]=mail.subject
			result["content"]=mail.content[2:-1]
	
		return JsonResponse(result)


class DeleteMail(APIView):
	"""
	Delete mail , must specify id and reciever
	"""
	def get(self,request,mail,mail_id,api_key):
		result={}
		mail=Mail.objects.filter(id=mail_id,reciever=mail).last()
		if mail!=None:
			print("ok")
			mail.delete()
			return JsonResponse({"result":"ok"})
		else:
			return JsonResponse({"result":"error you need to specify reciever mail and mail id"})



class GetMails(APIView):
	"""
	Get all recieved mails
	"""
	def get(self,request,mail,api_key):
		purge_mail()
		update_db(mail)
		result=[]
		mails=Mail.objects.filter(reciever=mail)
		for mail in mails:
			result_object={}
			result_object["id"]=mail.id
			result_object["sender"]=mail.sender
			result_object["reciever"]=mail.reciever
			result_object["subject"]=mail.subject
			result_object["content"]=mail.content[2:-1]
			result.append(result_object)
		return JsonResponse(result,safe=False)


