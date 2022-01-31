const headerConteiner = document.querySelector('#header');
const listConteiner = document.querySelector('#list');
const submitBtn = document.querySelector('#submit');
const submitStart = document.querySelector('#submit-start');
const modelClose = document.querySelector('.modal-result-wrap');
const textJson1 = document.querySelector('.content1');
let score = 0; //кол-во правльных ответов
let questionIndex = 0; //тeкущий вопрос


clearPage();
function clearPage(){
	headerConteiner.innerHTML = '';
	listConteiner.innerHTML = '';	
};






fetch('/db.json')
.then(function(res) {
	return res.json();
})
.then(function(data) {
	jsonData(data)
})
// .catch(console.error('ERROR'));

function jsonData(i) {
	showQuestion();
	submitBtn.onclick = checkAnswer;


//game start
function showQuestion(){
	submitStart.addEventListener('click', function () {
		let complexity = document.querySelector('input[name="complex-item"]:checked').value;
		console.log(complexity);
		modelClose.className = 'model-close';
		startTimer();
	});



//вопроc
	i[questionIndex].question;
	const headerTemplate = `<h2 class="title">${i[questionIndex].question}</h2>`;
	headerConteiner.innerHTML = headerTemplate;

	//ответ
	for([index, answerText] of i[questionIndex].answers.entries()) {
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
	i[questionIndex]['correct'];
	if(userAnswer === i[questionIndex]['correct']) {
		score++;
	}
	if (questionIndex === i.length - 1) {
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
	let result = `${score} из ${i.length}`;

	if(score === i.length) {
		title = 'Поздравляем!!!';
		message = "Вы ответили верно на все вопросы! "
	} else if ((score * 100) / i.length >= 50) {
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
}


//Time
const fullDashArra = 283;
const WarningThreshold = 10; 
const AlertThreshold = 5;

const Color_Codes = {
	info: {
    color: "green"
	},
	warning: {
    color: "orange",
    threshold: WarningThreshold
	},
	alert: {
    color: "red",
    threshold: AlertThreshold
	}
};

const Time_Limit = 120;
let timePassed = 0;
let timeLeft = Time_Limit;
let timerInterval = null;
let remainingPathColor = Color_Codes.info.color;

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


function onTimesUp() {clearInterval(timerInterval);}

function startTimer() {
	timerInterval = setInterval(() => {
    timePassed = timePassed += 1;
    timeLeft = Time_Limit - timePassed;
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
	const { alert, warning, info } = Color_Codes;
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
	const rawTimeFraction = timeLeft / Time_Limit;
	return rawTimeFraction - (1 / Time_Limit) * (1 - rawTimeFraction);
}

function setCircleDasharray() {
	const circleDasharray = `${(
    calculateTimeFraction() * fullDashArra).toFixed(0)} 283`;
	document.getElementById("base-timer-path-remaining").setAttribute("stroke-dasharray", circleDasharray);
};











		// if (complexity === 1) {
		// 	const easyQuestions = complexity;
		// 	console.log(easyQuestions);
			
		// } else if(complexity === 2) {
		// 	const difficultQuestions = complexity;
		// 	console.log(difficultQuestions);
		// } else if(complexity === 3){
		// 	const hardQuestions = complexity;
		// 	console.log(hardQuestions);
		// } 