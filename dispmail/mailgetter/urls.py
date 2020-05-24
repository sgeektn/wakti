"""dispmail URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from mailgetter import views

urlpatterns = [
    path('getAdress/<str:api_key>', views.GetAdress.as_view()),
    path('getAdress/<str:domain>/<str:api_key>', views.GetAdress.as_view()),
    path('getDomains/<str:api_key>', views.GetDomains.as_view()),
    path('getLastMail/<str:mail>/<str:api_key>', views.GetMail.as_view()),
    path('deleteMail/<str:mail>/<int:mail_id>/<str:api_key>', views.DeleteMail.as_view()),
    path('getMails/<str:mail>/<str:api_key>', views.GetMails.as_view())
]
