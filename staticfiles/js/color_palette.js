function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

const btn = document.getElementById("generate-btn");
const colors = document.querySelectorAll("#color-palette > ul > li");

btn.addEventListener("click", generate);

function generate() {
    hex_codes = [];

    for (let i = 0; i < colors.length; i++) {
        let color = colors[i];
        let randomColor = Math.floor(Math.random() * 16777215).toString(16)

        color.style.background = "#" + randomColor;

        color.querySelector("div.code").innerHTML = randomColor;
        hex_codes.push(randomColor);
    }

    fetch("/color-names/", {  
        method: 'POST',
        headers: {
            "X-CSRFToken": getCookie('csrftoken')
        },
        body: JSON.stringify({ "colors": hex_codes.join(",") })
    }).then(res => res.text()).then(response => {
        let names = response.split(",");

        for (let index = 0; index < names.length; index++) {
            colors[index].querySelector("div.name").innerHTML = names[index];
        }

        // colors[index].classList.add('fade-in');
        // setTimeout(() => colors[index].classList.remove('fade-in'), 400);
    });
}

generate()