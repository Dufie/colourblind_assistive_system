import json
from django.http import HttpResponse
from django.shortcuts import render
import pandas as pd
from django.views.decorators.csrf import csrf_exempt



def handle_uploaded_file(f):
    image_type = f.name.split(".")[-1]

    with open('storage/color_image.' + image_type, 'wb+') as destination:
        for chunk in f.chunks():
            destination.write(chunk)



# Create your views here.
def index(request):
    return render(request, 'index.html', context={"tab": "home"})

def palette(request):
    return render(request, 'color_palette.html', context={"tab": "palette"})

def quiz(request):
    return render(request, 'quiz.html', context={"tab": "quiz"})


@csrf_exempt
def get_color(request):
    if request.method == "POST":
        color = json.loads(request.body).get("color", None)

        if color is not None:
            colors = color.split(",")
            print(colors)

            return HttpResponse(get_color_name(int(colors[0]), int(colors[1]), int(colors[2])))

    return HttpResponse("Unknown")

def get_color_name(R, G, B):
    # Reading csv file with pandas and giving names to each column
    index = ["color", "color_name", "hex", "R", "G", "B"]
    csv = pd.read_csv('colors.csv', names=index, header=None)

    minimum = 10000
    for i in range(len(csv)):
        d = abs(R - int(csv.loc[i, "R"])) + abs(G - int(csv.loc[i, "G"])) + abs(B - int(csv.loc[i, "B"]))
        if d <= minimum:
            minimum = d
            cname = csv.loc[i, "color_name"]

    return cname