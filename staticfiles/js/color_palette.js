const btn = document.getElementById("generate-btn");
const colors = document.querySelectorAll("#color-palette > ul > li");
const colors_hex = document.querySelectorAll("#color-palette > ul > li > div");

btn.addEventListener("click", generate);

function generate() {
    for (let i = 0; i < colors.length; i++) {
        let color = colors[i];
        let color_hex = colors_hex[i];

        let randomColor = Math.floor(Math.random() * 16777215).toString(16)

        color.style.background = "#" + randomColor;
        color.classList.add('fade-in');
        setTimeout(() => color.classList.remove('fade-in'), 400);

        color_hex.innerHTML = randomColor;
        
    }
}

generate()