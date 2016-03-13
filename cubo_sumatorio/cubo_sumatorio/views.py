from django.shortcuts import render_to_response
from django.http import JsonResponse, HttpResponse
from django.http.response import HttpResponseRedirect 
import time, re, json, requests
from django.template import RequestContext
import os

def inicio(request):
	return render_to_response('index.html')