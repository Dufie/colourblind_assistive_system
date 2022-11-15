from django.urls import path
from . import views


urlpatterns = [
    path("", views.index, name="home"),
    path("palette/", views.palette, name="palette"),
    path("quiz/", views.quiz, name="quiz"),

    path("color-name/", views.get_color, name="get_color"),
    path("color-names/", views.get_colors, name="get_colors"),
]


