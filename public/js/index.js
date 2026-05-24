const claimRadio = document.querySelectorAll('input[name="claim_options"]');
const questionsSection = document.querySelector('.questions-section');
const questionsContainer = document.querySelector('#questions-container');
const questionBtn = document.querySelector('.add-questions');
const questionRemBtn = document.querySelector('.remove-questions');
const question1 = document.querySelector('input[name="questions[0]"]');

let n = 1;

claimRadio.forEach(option => {
    option.addEventListener('change', (event) => {
        if (event.target.checked && event.target.value === "questions") {
            questionsSection.style.display = "block";
            question1.setAttribute('required','true');
        } else {
            questionsSection.style.display = "none";
        }
    });
});

questionRemBtn.style.display = "none";

questionBtn.addEventListener('click', () => {
    if (n < 5) {
        const input = document.createElement('input');
        input.type = "text";
        input.name = `questions[${n}]`;
        input.placeholder = `Question ${n + 1}`;
        input.classList.add('form-control', 'mb-2');
        input.setAttribute('required','true');
        questionsContainer.appendChild(input);
        n++;
    }
    questionBtn.style.display = (n === 5) ? "none" : "inline-block";
    if (n > 1) questionRemBtn.style.display = "inline-block";
});

questionRemBtn.addEventListener('click', () => {
    if (n > 1) {
        questionsContainer.removeChild(questionsContainer.lastElementChild);
        n--;
    }
    if (n < 5) questionBtn.style.display = "inline-block";
    if (n === 1) questionRemBtn.style.display = "none";
});