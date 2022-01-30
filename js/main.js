const questions = [
// 	{
// 		question: "Какой язык работает в браузере?",
// 		answers: ["Java", "C", "Python", "JavaScript"],
// 		correct: 4,
// 	},
// 	{
// 		question: "Что означает CSS?",
// 		answers: [
// 			"Central Style Sheets",
// 			"Cascading Style Sheets",
// 			"Cascading Simple Sheets",
// 			"Cars SUVs Sailboats",
// 		],
// 		correct: 2,
// 	},
// 	{
// 		question: "Что означает HTML?",
// 		answers: [
// 			"Hypertext Markup Language",
// 			"Hypertext Markdown Language",
// 			"Hyperloop Machine Language",
// 			"Helicopters Terminals Motorboats Lamborginis",
// 		],
// 		correct: 1,
	// },
	// {
	// 	question: "В каком году был создан JavaScript?",
	// 	answers: ["1996", "1995", "1994", "все ответы неверные"],
	// 	correct: 2,
	// },
	// {
	// 	question: "В чем отличие между локальной и глобальной переменной?",
	// 	answers: [
	// 	"Локальные можно переопределять, глобальные нельзя", 
	// 	"Глобальные видны повсюду, локальные только в функциях", 
	// 	"Глобальные можно переопределять, локальные нельзя", 
	// 	"Локальные видны повсюду, глобальные только в функциях"],
	// 	correct: 2,
	// },
	{
		question: "Какое количество сообщений будет выведено в консоль?---------------------'for(var i = 10; i < 35; i += 5){console.log(i);}'",
		answers: ["5", "10", "35", "8"],
		correct: 1,
	},
	{
		question: "Что такое условный оператор?",
		answers: [
		"Конструкция для создания определенной переменной", 
		"Оператор сравнения значений", 
		"Конструкция, что выполняет код несколько раз",],
		correct: 2,
	},
	{
		question: "Где верно указано имя переменной?",
		answers: [
		"let num-1;", 
		"let 2num;", 
		"let num_1;",
		"let num;",
		"let num",],
		correct: 3,
	},
	{
		question: "Где можно использовать JavaScript?",
		answers: [
		"Серверные приложения",
		"Можно во всех перечисленных",
		"Прикладное программное обеспечение",
		"Мобильные приложения",
		"Веб-приложения",],
		correct: 2,
	},
];

const headerConteiner = document.querySelector('#header');
const listConteiner = document.querySelector('#list');
const submitBtn = document.querySelector('#submit');
const submitStart = document.querySelector('#submit-start');
const modelClose = document.querySelector('.modal-result-wrap');
const textJson1 = document.querySelector('.content1');

let score = 0; //кол-во правльных ответов
let questionIndex = 0; //тeкущий вопрос

clearPage();
showQuestion();
submitBtn.onclick = checkAnswer;

function clearPage(){
headerConteiner.innerHTML = '';
listConteiner.innerHTML = '';	
}

submitStart.addEventListener('click', function () {
	console.log('click');
	modelClose.className = 'model-close';
});



// function newGame() {
// 	clearPage();
// 	const headerNewGame = `<h2 class="title">Тест на знание основ Javascript</h2>`;
// 	headerConteiner.innerHTML = headerNewGame;
// 	submitBtn.blur();
// 	submitBtn.innerText = 'Начать тест';
// };

// function gameStart () {
// 	submitBtn.onclick = () => {
		
// 	}
// newGame();	
// }
// gameStart();


//Подключение JSON
const getData = () => fetch('https://jopandaverst.github.io/quiz/db.json')
.then((res) => res.json())
.then((res) => console.log(res))
.then((res) => jsonData(data))
.catch(error => console.log(error));



function jsonData({question, answers, correct}) {
	console.log(question);
}
getData()

function showQuestion(){
	//вопрос
	questions[questionIndex]['question'];
	const headerTemplate = `<h2 class="title">${questions[questionIndex]['question']}</h2>`;
	headerConteiner.innerHTML = headerTemplate;

	//ответ
	for([index, answerText] of questions[questionIndex]['answers'].entries()) {
		// console.log(answerText);
		index++
		const questionTemplate = 
		`<li>
			<label>
				<input value="${index}" type="radio" class="answer" name="answer" />
				<span>%answer%</span>
			</label>
		</li>`;

	const answerHTML = questionTemplate.replace('%answer%', answerText)
	listConteiner.innerHTML += answerHTML;
	}
}

function checkAnswer() {
	const checkedRadio = listConteiner.querySelector('input[type="radio"]:checked')
	// console.log(checkedRadio);

	if (!checkedRadio) {
		submitBtn.blur();
		return
	}

	const userAnswer = parseInt(checkedRadio.value);
	// console.log(userAnswer)

	questions[questionIndex]['correct'];

	if(userAnswer === questions[questionIndex]['correct']) {
		score++;
	}

	if (questionIndex === questions.length - 1) {
		// console.log("Последний вопрос");
		clearPage();
		showResults();
		return;
	} else {
		// console.log("Не последний вопрос");
		questionIndex++;
		clearPage();
		showQuestion();
	}
}

function showResults() {
	let title, message;
	let result = `${score} из ${questions.length}`;

	if(score === questions.length) {
		title = 'Поздравляем!!!';
		message = "Вы ответили верно на все вопросы! "
	} else if ((score * 100) / questions.length >= 50) {
		title = 'Не плохой результат! ';
		message = "Вы дали больше половины правильных ответов! "	
	} else {
		title = 'Стоит постараться...';
		message = "Пока у вас меньше половины правильных ответов "
	}

	const resultsTemplets = `			
	<h2 class="title">${title}</h2>
	<h3 class="summary">${message}</h3>
	<p class="result">${result}</p>
	`;
	headerConteiner.innerHTML = resultsTemplets;

	submitBtn.blur();
	submitBtn.innerText = 'Начать заново';
	submitBtn.onclick = () => history.go();
}







//Time
const FULL_DASH_ARRAY = 283;
const WARNING_THRESHOLD = 10;
const ALERT_THRESHOLD = 5;

const COLOR_CODES = {
	info: {
    color: "green"
	},
	warning: {
    color: "orange",
    threshold: WARNING_THRESHOLD
	},
	alert: {
    color: "red",
    threshold: ALERT_THRESHOLD
	}
};

const TIME_LIMIT = 120;
let timePassed = 0;
let timeLeft = TIME_LIMIT;
let timerInterval = null;
let remainingPathColor = COLOR_CODES.info.color;

document.getElementById("app").innerHTML = `
<div class="base-timer">
	<svg class="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <g class="base-timer__circle">
		<circle class="base-timer__path-elapsed" cx="50" cy="50" r="45"></circle>
		<path
        id="base-timer-path-remaining"
        stroke-dasharray="283"
        class="base-timer__path-remaining ${remainingPathColor}"
        d="
			M 50, 50
			m -45, 0
			a 45,45 0 1,0 90,0
			a 45,45 0 1,0 -90,0
        "
	></path>
    </g>
	</svg>
	<span id="base-timer-label" class="base-timer__label">${formatTime(timeLeft)}</span>
</div>
`;

startTimer();

function onTimesUp() {clearInterval(timerInterval);}

function startTimer() {
	timerInterval = setInterval(() => {
    timePassed = timePassed += 1;
    timeLeft = TIME_LIMIT - timePassed;
    document.getElementById("base-timer-label").innerHTML = formatTime(timeLeft);
    setCircleDasharray();
    setRemainingPathColor(timeLeft);

    if (timeLeft === 0) {
		onTimesUp();
    }
}, 1000);
}

function formatTime(time) {
	const minutes = Math.floor(time / 60);
	let seconds = time % 60;

	if (seconds < 10) {
    seconds = `0${seconds}`;
	}

	return `${minutes}:${seconds}`;
}

function setRemainingPathColor(timeLeft) {
	const { alert, warning, info } = COLOR_CODES;
	if (timeLeft <= alert.threshold) {
    document
	.getElementById("base-timer-path-remaining").classList.remove(warning.color);
    document.getElementById("base-timer-path-remaining").classList.add(alert.color);
	} else if (timeLeft <= warning.threshold) {
    document.getElementById("base-timer-path-remaining").classList.remove(info.color);
    document.getElementById("base-timer-path-remaining").classList.add(warning.color);
	}
}

function calculateTimeFraction() {
	const rawTimeFraction = timeLeft / TIME_LIMIT;
	return rawTimeFraction - (1 / TIME_LIMIT) * (1 - rawTimeFraction);
}

function setCircleDasharray() {
	const circleDasharray = `${(
    calculateTimeFraction() * FULL_DASH_ARRAY).toFixed(0)} 283`;
	document.getElementById("base-timer-path-remaining").setAttribute("stroke-dasharray", circleDasharray);
};
