from django.db import models

class Cubo(models.Model):
	"""Define el objeto cubo y sus dimensiones"""
	dimensiones = models.IntegerField(db_tablespace= "dimensiones")
	class Meta:
		db_table = 'cubo'
	def __unicode__(self):
		return self.dimensiones

class Cubo_Actualizado(models.Model):
	"""Actualiza las celdas del objeto cubo"""
	cubo = models.ForeignKey(Cubo)
	x = models.IntegerField(db_tablespace= "x")
	y = models.IntegerField(db_tablespace= "y")
	z = models.IntegerField(db_tablespace= "z")
	valor = models.IntegerField(db_tablespace= "valor")
	class Meta:
		db_table = 'cubo_actualizado'
	def __unicode__(self):
		return self.cubo