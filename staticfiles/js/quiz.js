const shuffleArray = array => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }

    return array;
}

class Question {
    question = null;
    answer = null;
    options = [];
    chosen = null;

    constructor(question, answer, options) {
        this.question = question;
        this.answer = answer;
        this.options = options;
    }
}

class Option {
    name = "";
    color = "";

    constructor(name, color) {
        this.name = name;
        this.color = color;
    }
}


const questions = shuffleArray([
    new Question("Traditionally, what color is considered unisex for babies?", 2, [
        new Option("Blue", "#0000FF"),
        new Option("White", "#FFFFFF"),
        new Option("Yellow", "#FFFF00"),
    ]),
    new Question("What eye color is the rarest of the most common colors?", 0, [
        new Option("Green", "#00FF00"),
        new Option("Blue", "#0000FF"),
        new Option("Brown", "#964B00"),
    ]),
    new Question("It is the most dominant color in nature and usually the color of most plants.", 1, [
        new Option("Blue", "#0000FF"),
        new Option("Green", "#00FF00"),
        new Option("Gold", "#FFD700"),
    ]),
    new Question("Name the color that is said to attract mosquitos", 0, [
        new Option("Blue", "#0000FF"),
        new Option("Black", "#000000"),
        new Option("Brown", "#964B00"),
    ]),
    new Question("Which colour do we have when mixing yellow and red?", 2, [
        new Option("Brown", "#964B00"),
        new Option("Purple", "#A020F0"),
        new Option("Orange", "#FFA500"),
    ]),
    new Question("Color of the beautiful sky.", 0, [
        new Option("Blue", "#0000FF"),
        new Option("White", "#FFFFFF"),
        new Option("Red", "#FF0000"),
    ]),
    new Question("What is the most used colors in national flags?", 2, [
        new Option("Blue", "#0000FF"),
        new Option("White", "#FFFFFF"),
        new Option("Red", "#FF0000"),
    ]),
    new Question("Color of charcoal.", 0, [
        new Option("Black", "#000000"),
        new Option("Green", "#00FF00"),
        new Option("Cyan", "#00FFFF"),
    ]),
    new Question("Which color is the safest color to prevent road accident?", 2, [
        new Option("Red", "#FF0000"),
        new Option("Green", "#00FF00"),
        new Option("White", "#FFFFFF"),
    ]),
    new Question("Which colour do we have when mixing blue and yellow?", 0, [
        new Option("Green", "#00FF00"),
        new Option("Purple", "#A020F0"),
        new Option("Orange", "#FFA500"),
    ]),
    new Question("What is the first color a baby can see?", 1, [
        new Option("Black", "#000000"),
        new Option("Red", "#FF0000"),
        new Option("White", "#FFFFFF"),
    ]),
]);

window.onload = () => {
    const quiz = document.querySelector(".quizlet .card-holder");

    for (let index = 0; index < questions.length; index++) {
        let question = questions[index];
        let q_id = index;

        let quiz_que = document.createElement("div");
        quiz_que.classList.add("card");

        if (index == 0) {
            quiz_que.classList.add("active");
        }

        quiz_que.setAttribute("data-id", index);

        let options_li = ``;

        for (let index = 0; index < question.options.length; index++) {
            let option = question.options[index];

            options_li += `
                <li data-qid="${q_id}" data-id="${index}">
                    <div style="background-color: ${option.color}" class="color"></div>
                    <p class="text">${option.name}</p>
                </li>
            `;
        }

        quiz_que.innerHTML = `
            <p style="text-align: center">
                <i class="fa fa-solid fa-circle-check question-icon" style="font-size: 4rem; color: #32cd32; display: none"></i>
                <i class="fa fa-solid fa-circle-xmark question-icon" style="font-size: 4rem; color: #ed2939; display: none"></i>
            </p>

            <h2 class="quiz-question">${question.question}</h2>
            <div class="quiz-options">
                <ul>
                    ${options_li}
                </ul>
            </div>
        `;

        quiz.appendChild(quiz_que);
    }

    for (let index = 0; index < document.querySelectorAll(".action-btn div").length; index++) {
        const btn = document.querySelectorAll(".action-btn div")[index];

        btn.addEventListener("click", (e) => {
            let action = btn.dataset.action;

            let current = document.querySelector(".card.active");
            let current_index = parseInt(current.dataset.id);

            if (action == "prev" && current_index != 0) {
                current.classList.remove("active");
                document.querySelector(".card[data-id='" + (current_index - 1) + "']").classList.add("active");

            } else if (action == "next" && current_index != questions.length - 1) {
                current.classList.remove("active");
                document.querySelector(".card[data-id='" + (current_index + 1) + "']").classList.add("active");

            } else if (action == "reset") {
                location.reload();
                console.log("ss");
            }

            let btns = document.querySelectorAll(".action-btn div");

            if (current_index + 1 == questions.length - 1) {
                btns[1].style.display = "none";
                btns[2].style.display = "block";

            } else {
                btns[1].style.display = "block";
                btns[2].style.display = "none";

            }
        });
    }

    for (let index = 0; index < document.querySelectorAll(".quiz-options li").length; index++) {
        const option = document.querySelectorAll(".quiz-options li")[index];

        option.addEventListener("click", () => {
            if (document.querySelector(".quiz-options li.active[data-qid='" + option.dataset.qid + "']") != null) {
                document.querySelector(".quiz-options li.active[data-qid='" + option.dataset.qid + "']").classList.remove("active");
            }

            option.classList.add("active");
            questions[option.dataset.qid].chosen = index;

            let selector = ".card[data-id='" + option.dataset.qid + "'] .question-icon";

            if (option.dataset.id == questions[option.dataset.qid].answer) {
                document.querySelectorAll(selector)[0].style.display = "block";
                document.querySelectorAll(selector)[1].style.display = "none";

            } else {
                document.querySelectorAll(selector)[1].style.display = "block";
                document.querySelectorAll(selector)[0].style.display = "none";
            }
        })
    }
}