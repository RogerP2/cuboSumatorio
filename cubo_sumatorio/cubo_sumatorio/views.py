from django.shortcuts import render_to_response
from django.http import JsonResponse, HttpResponse
from django.http.response import HttpResponseRedirect 
from django.views.decorators.csrf import csrf_exempt
import time, re, json, requests
from django.template import RequestContext
from django.http.response import JsonResponse
from cubo_sumatorio.models import *
import os
from django.db.models import Sum

def inicio(request):
	# Vista de inicio de la aplicación.
	return render_to_response('index.html')

@csrf_exempt
def crearCubo(request):
	# Vista que crea el cubo obteniendo las dimensiones y guardandolas en la bd.
	mensaje = False
	if request.method == "POST":
		mensaje = True
		cuboCreado = Cubo.objects.create( dimensiones = request.POST["dimensiones"] )
		mi_id = cuboCreado.id;
		return JsonResponse({"mensaje": mensaje, 'ide':mi_id}, safe=False)
	else:
		return JsonResponse({"mensaje": mensaje}, safe=False)

@csrf_exempt
def actualizarCubo(request):
	#Vista que permite realizar la operación de actualización a una celda del cubo guarda en bd.
	mensaje = False
	if request.method == "POST":
		mensaje = True
		ide = request.POST["ide"]
		x1 = request.POST["x"]
		y1 = request.POST["y"]	
		z1 = request.POST["z"]
		antActualizacion = Cubo_Actualizado.objects.filter( cubo = ide, x = x1, y = y1, z = z1 )
		if antActualizacion:
			antActualizacion.delete()
		c = Cubo.objects.get(id=ide)
		cuboActualizado = Cubo_Actualizado.objects.create( 
			cubo = c,
			x = x1,
			y = y1,
			z = z1,
			valor = request.POST["valor"],  
		)
		return JsonResponse({"mensaje": mensaje}, safe=False)
	else:
		return JsonResponse({"mensaje": mensaje}, safe=False)

@csrf_exempt
def sumatoriaCubo(request):
	#Vista que permite realizar la operación de consulta y posterior suma enviando el resultado al front para presentarlo al usuario.
	mensaje = False
	if request.method == "POST":
		mensaje = True
		ide = request.POST["ide"]
		x1 = request.POST["x1"]
		y1 = request.POST["y1"]	
		z1 = request.POST["z1"]
		x2 = request.POST["x2"]
		y2 = request.POST["y2"]	
		z2 = request.POST["z2"]
		respuesta = Cubo_Actualizado.objects.filter(x__range = (x1, x2), y__range = (y1, y2), z__range = (z1, z2), cubo = ide).aggregate(Sum('valor'))
		if ( respuesta['valor__sum'] == None):
			respuesta['valor__sum'] = 0
		return JsonResponse({"mensaje": mensaje, 'respuesta': respuesta['valor__sum']}, safe=False)
	else:
		return JsonResponse({"mensaje": mensaje}, safe=False)
