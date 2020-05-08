from django.shortcuts import render
from django.http import JsonResponse,HttpResponse
from random import random,choice
import sys
import json
from . import get_mail
from .models import Mail
# Create your views here.

from django.views import View

class MyView(View):

    def get(self, request, *args, **kwargs):
        return HttpResponse('Hello, World!')

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


def getAdress(request,domain="all"):
	
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
	prefix=''.join(choice("azertyuiopqsdfghjklmwxcvbn1234567890") for i in range(15))
	result={}
	result["mail"]=prefix+"@"+suffix
	return JsonResponse(result)

def getDomains(request):
	
	domains_list=[]
	with open("mailgetter/domains.txt") as domains:
		domains_list=domains.readlines()
		domains.close()
	for i in range(len(domains_list)):
		if domains_list[i][-1]=='\n':
			domains_list[i]=domains_list[i][0:-1]
	
	
	return JsonResponse(domains_list,safe=False)



def getMail(request,mail):
	update_db(mail)
	result={}
	mail=Mail.objects.filter(reciever=mail).last()
	if mail!=None:
		result["sender"]=mail.sender
		result["reciever"]=mail.reciever
		result["subject"]=mail.subject
		result["content"]=mail.content[2:-1]

	return JsonResponse(result)




def getMails(request,mail):
	update_db(mail)
	result=[]
	mails=Mail.objects.filter(reciever=mail)
	for mail in mails:
		result_object={}
		result_object["sender"]=mail.sender
		result_object["reciever"]=mail.reciever
		result_object["subject"]=mail.subject
		result_object["content"]=mail.content[2:-1]
		result.append(result_object)
	return JsonResponse(result,safe=False)


