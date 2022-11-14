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

function pick(event, ctx, display, name, code) {
    const bounding = canvas.getBoundingClientRect();

    const x = event.clientX - bounding.left;
    const y = event.clientY - bounding.top;

    const pixel = ctx.getImageData(x, y, 1, 1);
    const data = pixel.data;

    const rgba = `rgba(${data[0]}, ${data[1]}, ${data[2]}, ${data[3] / 255})`;
    display.style.background = rgba;
    code.innerHTML = rgba;

    fetch("/color-name", {
        method: 'POST',
        headers: {
            // 'Content-Type': 'text/plain',
            "X-CSRFToken": getCookie('csrftoken')
        },
        mode: "same-origin",
        body: JSON.stringify({ "color": `${data[0]},${data[1]},${data[2]}` })
    }).then(res => res.text()).then(response => {
        name.innerHTML = response
    });

    return rgba;
}

function image_points(canvas, width, height) {
    let newWidth = canvas.width;
    let newHeight = canvas.height;

    let aspectRatio = width / height;
    if (aspectRatio < 1) {
        newWidth = canvas.width * aspectRatio;
    } else {
        newHeight = canvas.height / aspectRatio;
    }


    return {
        x: (canvas.width - newWidth) * 0.5,
        y: (canvas.height - newHeight) * 0.5,
        width: newWidth,
        height: newHeight,
    }
}

// function startWebcam() {
//     capture_btn.addEventListener("click", function () {
        
//     });
// };


const capture_btn = document.getElementById('take-photo');
const video = document.querySelector('#video-display');

const canvas = document.getElementById('image-display');
const ctx = canvas.getContext('2d');

const file_input = document.querySelector("input[name='image']");
const img = new Image();

file_input.addEventListener("change", (event) => {
    var image = file_input.files[0]
    img.src = URL.createObjectURL(image)
    img.crossOrigin = 'anonymous';
});


img.addEventListener('load', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let { width, height, x, y } = image_points(canvas, img.width, img.height);
    ctx.drawImage(img, x, y, width, height);

});

canvas.addEventListener('click', (event) => {
    const color_display = document.querySelector('#color-display > div');
    const color_name = document.querySelector('#color-display #name');
    const color_code = document.querySelector('#color-display #code');

    pick(event, ctx, color_display, color_name, color_code);
});

capture_btn.addEventListener("click", function (event) {
    if (capture_btn.dataset.live == "false") {
        navigator
            .mediaDevices
            .getUserMedia({ video: true })
            .then(stream => {
                video.srcObject = stream;
                this.stream = stream;
                video.play();

                canvas.style.display = "none";
                video.style.display = "block";
                capture_btn.innerHTML = "Take Picture";

                capture_btn.dataset.live = "true"
            })
            .catch(error => {
                console.error(error);
            });

    } else if (capture_btn.dataset.live == "true") {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        let { width, height, x, y } = image_points(canvas, video.videoWidth, video.videoHeight);

        ctx.drawImage(video, x, y, width, height);

        canvas.style.display = "block";
        video.style.display = "none";
            capture_btn.innerHTML = "Turn on Camera";
            this.stream.getVideoTracks()[0].stop();

        capture_btn.dataset.live = "false"
    }

});


