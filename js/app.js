var question1 = {
	question: "Which one of the following sequences is most likely to occur?",
	choices: ["HHHTTT", "TTTTTT", "HTHHTH", "None of these"],
	answer: "None of these",
	explanation: "First Explanation"
};

var question2 = {
	question: "Is the height of the tallest redwood more or less than 1,200 feet? What is your best guess about the height of the tallest redwood?",
	choices: ["187", "412", "876", "1180"],
	answer: "412",
	explanation: "Second Explanation"
};

var question3 = {
	question: "If it takes 5 machines 5 minutes to make 5 widgets, how long would it take 100 machines to make 100 widgets?",
	choices: ["100 minutes", "5 minutes"],
	answer: "5 minutes",
	explanation: "Third Explanation"
};

var question4 = {
	question: "Linda is thirty-one years old, single, outspoken, and very bright. She majored in biology. As a student, she was deeply concerned with issues concerning social justice and climate change, and also participated in anti-Iraq War demonstrations. Which is more likely:",
	choices: ["Linda is a bank teller", "Linda is a bank teller and is active in protests against the coal industry"],
	answer: "Linda is a bank teller",
	explanation: "Fourth Explanation"
};

function startScreen() {
		$("#start-screen").hide();
		$("#outer").fadeIn(1500);
};

var questionNum = 0;
var score = 0;

function displayQNum() {
	$("#question-count").text(questionNum + 1);
}

function updateScore() {
	$("#final-score span").text(score);
};

function setCurrentQ() {
	//empty list elements
	$("#choices-block").empty();

	//load current question
	questionStock = [question1, question2, question3, question4];
	currentQuestion = questionStock[questionNum];
	$("#question").text(currentQuestion.question);
	
	loadChoices();

	//Load explanation
	explanationStock = currentQuestion.explanation;

	//Load answer
	answerStock = currentQuestion.answer;
};


//load answer choices into the DOM
function loadChoices() {
	choicesStock = currentQuestion.choices;
	$.each(choicesStock, function(index, value) {
		$("<li>" + value + "</li>").addClass("choices").appendTo("#choices-block");
	});
};


//Match question against node index and light up corresponding node when user answers correctly
function greenLight() {
	$("#progress .node").each(function(index, element) {
		if (index == questionNum) {
			$(this).css({"background-color": "rgb(219,224,177)"});
		}
	});
};

//After user selects answer choice, check to see if answer is correct. If so, increment score & provide positive feedback. Display modal with explanation.  
function showAnswer($this) {
		selected = $this.text();
		if (selected == answerStock) {
			score+=10;
			greenLight();
			$("#modal p").text("Correct! " + explanationStock);
		}
		else {
			$("#modal p").text("Almost. " + explanationStock);
		};
		$("#outer").hide();
		$("#modal").fadeIn(750);

		//Tick up question count
		questionNum++;
};

//User reviews answer explanation and loads the next question
function nextQuestion() {
	$("#modal").hide();
	$("#outer").fadeIn(750);
	$("#modal p").text("");
	displayQNum();
	updateScore();
	setCurrentQ();
};

function finalScore() {
	updateScore();
	$("#next-question").hide();
	$("#restart-quiz").show();
	$("#modal p").text("Thank you for playing. Hopefully you learned something new. Play again to review the concepts.");
	$("#final-score").show();
};

//After all questions have been answered, user can try again
function newGame() {
		score = 0;
		questionNum = 0;
		$("#restart-quiz").hide();
		$("#next-question").show();
		$("#modal").hide();
		$("#outer").fadeIn(750);
		$("#final-score").hide();
		$("#progress .node").css({"background-color": ""});
		displayQNum();
		updateScore();
		setCurrentQ();
};


$(document).ready(function() {
	alert("hello");
	
	$("#start-screen button").click(
		startScreen
	);

	//Begin game by setting first question
	setCurrentQ();

	//User selects answer choice
	$("#choices-block").on("click", ".choices", function(e) {
		showAnswer($(e.target));
	});


	$("#next-question").click(function() {
		//User reviews answer explanation and loads the next question until final question has been answered
		if (questionNum <= 3) {
			nextQuestion();
		}
		//User is then shown final score and presented with option to retake quiz
		else {
			finalScore();
		};
	});

	//User restarts the quiz
	$("#restart-quiz").click(function() {
		newGame();
	});

});