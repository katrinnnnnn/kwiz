const questions = [
	{
		question: " Как называется самая высокая гора Африки, расположенная в Танзании?",
		answers: ["Арарат", "Эверест", "Канченджанга", "Килиманджаро"],
		correct: 4,
	},
	{
		question: "Какой водопад считается самым крупным в мире?",
		answers: [
			"Виктория(Южная Африка)",
			"Ниагарский (Америка)",
			"Анхель (Венесуела)",
			"Мраморный водопад (Марморе)(Италия)",
		],
		correct: 1,
	},
	{
		question: "Какая река считается важнейшей водной артерией Египта?",
		answers: [
			"Полноводная Амазонка",
			"Длинный Нил",
			"Многоводный Енисей",
			"Крупная Янцзы",
		],
		correct: 2,
	},
	{
		question: "Какой континент самый маленький в мире?",
		answers: ["Австралия", "Антарктида", "Соединенные Штаты Америки", "Южная Америка"],
		correct: 1,
	},


	
];

//Находим элементы
const headerConteiner = document.querySelector('#header');
const listConteiner = document.querySelector('#list');
const submitBtn = document.querySelector('#submit');


let score  = 0;
let questionIndex = 0;

clearPage();
showQuestions();
submitBtn.onclick = checkAnswer;

function clearPage(){
	headerConteiner.innerHTML = '';
	listConteiner.innerHTML = '';
};

function showQuestions(){
	

	 const headerTemplate = `<h2 class="title">%title%</h2>`;
	 const title = headerTemplate.replace('%title%', questions[questionIndex]['question']);

	 headerConteiner.innerHTML = title;

	 let answerNumber = 1;

	 for(answerText of questions[questionIndex]['answers']){

		const questionTemplate = 
		`<li>
		 <label>
			<input value="%number%" type="radio" class="answer" name="answer" />
			<span>%answer%</span>
		 </label>
	    </li>`;

		let answerHTML = questionTemplate.replace('%answer%',answerText ).replace('%number%',answerNumber);

		listConteiner.innerHTML += answerHTML;
		answerNumber++;

	 }
};

function checkAnswer(){
	const checkedRadio = listConteiner.querySelector('input[type="radio"]:checked');
	
	if (checkedRadio){
		console.log('ok');
	}else{
		return;
	};

	const userAnswer = parseInt(checkedRadio.value);

	if(userAnswer === questions[questionIndex]['correct']){
		score++;
	};

	if (questionIndex !== questions.length - 1){
		questionIndex++;
		clearPage();
		showQuestions();
	}else{
		clearPage();
		showResults();
	}
}


function showResults(){

	const resultsTemplate = `<h2 class="title">%title%</h2>
	<h3 class="summary">%message%</h3>
	<p class="result">%result%</p>`;

	let title , message ;

	if(score === questions.length){
		title = 'Поздравлям';
		message = 'Вы ответили верно на все вопросы';
	}else if((score * 100 ) / questions.length >= 50){
		title = 'Неплохой результат';
		message = 'Вы дали более половины верных ответов';
	}else{
		title = 'Нужно постараться';
		message = 'У вас меньше половины верных ответов';
	}

	let result = `${score} из ${questions.length}`;


	const finalMessage = resultsTemplate.replace('%title%',title).replace('%message%', message).replace('%result%', result);

	headerConteiner.innerHTML = finalMessage;

	submitBtn.innerText = 'Начать заново';
	submitBtn.onclick = function(){
		history.go()
	}
}

