from django.conf.urls import patterns, include, url
from django.contrib import admin
from django.contrib.staticfiles.urls import staticfiles_urlpatterns
from django.conf import settings
from django.conf.urls.static import static
from django.conf import settings
admin.autodiscover()

"""cubo_sumatorio URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.9/topics/http/urls/
Examples:
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='ho
Function viewsme')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""


urlpatterns = patterns('',
    url(r'^admin/', include(admin.site.urls)),
    url(r'^$','cubo_sumatorio.views.inicio'),
    url(r'^cubo/$','cubo_sumatorio.views.crearCubo'),
    url(r'^cubo/actualizar/$','cubo_sumatorio.views.actualizarCubo'),
    url(r'^cubo/requerir/$','cubo_sumatorio.views.sumatoriaCubo'),
)
urlpatterns += staticfiles_urlpatterns()