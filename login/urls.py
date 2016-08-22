from django.conf.urls import url

from login import views

app_name = 'login'

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^ajaxlogin/$', views.ajlogin, name='login'),
    url(r'^aj_username_check/', views.username_check, name='username_check'),
    url(r'^aj_register/', views.register, name='register'),
]