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

//questions stuff
var questionNum = 0;
var questionStock = [question1, question2];
var currentQuestion = questionStock[questionNum];
var choicesStock = currentQuestion.choices;

//explanation stuff
var explanationStock = currentQuestion.explanation;

/*
function setCurrentQ() {
	var questionNum = 0;
	var currentQuestion = questionStock[questionNum];
	$("#question").text(currentQuestion.question);
};
*/

function startScreen() {
	$("#start-screen button").on("click", function() {
		$("#start-screen").hide();
		$("#outer").fadeIn(1500);
	});
};

function loadChoices() {
	$.each(choicesStock, function(index, value) {
		$("<li>" + value + "</li>").addClass("choices").appendTo("#choices-block");
	});
};

function showAnswer() {
	$(".choices").on("click", function() {
		$("#outer").hide();
		$("#modal").fadeIn("slow");
		$("<p>" + explanationStock + "</p>").addClass("explanations").appendTo("#modal");
	});
};

/*
function nextQuestion() {
	$("#modal button").on("click", function(){
		$("#modal").hide();
		$("#outer").fadeIn("slow");
		$("choices-block").empty();
		questionNum++;
		$("#question").text(currentQuestion.question);
		loadChoices();
	});
};
*/

$(document).ready(function() {
	alert("hello");
	//Begin game
	startScreen();
	//setCurrentQ();
	$("#question").text(currentQuestion.question);
	$("#choices-block").empty();
	loadChoices();
	showAnswer();
	//nextQuestion();
});