from django.conf.urls import url, static

from mycode import settings
from server import views

app_name = 'server'

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^(?P<code_id>[0-9]+)/$', views.code, name='code'),
    url(r'^(?P<code_id>[0-9]+)/upload/$', views.upload, name='upload'),
]
