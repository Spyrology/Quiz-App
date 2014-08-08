var question1 = {
	question: "Six babies are born in sequence at a hospital in your city. Which sequence representing their sex is least likely?",
	choices: ["GBBGBG", "GGGGGG", "BGBBGB", "None of these"],
	answer: "None of these",
	explanation: "Even though such a scenario is a truly random process between two approximately equal outcomes, we have a tendency to believe that regularity (such as a sequence of six consecutive female births) is somehow less likely than an alternating sequence of male and female births. Our proclivity to seek patterns causes us to misjudge the randomness of randomness."
};

var question2 = {
	question: "Is the height of the tallest redwood more or less than 1,200 feet? What is your best guess about the height of the tallest redwood?",
	choices: ["187", "379", "876", "1180"],
	answer: "379",
	explanation: "When two different groups were posed this question, wherein the only variation was the suggested height in the question itself (1200 feet versus 187 feet) the mean estimate produced by the two groups varied by 562 feet! That is the power of “anchoring.”"
};

var question3 = {
	question: "If it takes 5 machines 5 minutes to make 5 widgets, how long would it take 100 machines to make 100 widgets?",
	choices: ["100 minutes", "5 minutes"],
	answer: "5 minutes",
	explanation: "Our immediate intuitive answer is often incorrect. When this question is presented in a visual format that makes it difficult to read, that in turn causes the reader to slow down, think harder, and answer correctly."
};

var question4 = {
	question: "Linda is thirty-one years old, single, outspoken, and very bright. She majored in biology. As a student, she was deeply concerned with issues concerning social justice and climate change, and also participated in anti-Iraq War demonstrations. Which is more likely:",
	choices: ["Linda is a bank teller", "Linda is a bank teller and is active in protests against the coal industry"],
	answer: "Linda is a bank teller",
	explanation: "The population of bank tellers named Linda that is also active in protests against the coal industry, is necessarily a subset of the population of bank tellers named just named Linda. Therefore the latter population is larger. “The most coherent stories are not necessarily the most probable, but they are plausible, and the notions of coherence, plausibility, and probability are easily confused by the unwary.”"
};

var question5 = {
	question: "A cab is involved in a hit-and-run accident at night. Two cab companies, the Green and the Blue, operate in the city. You are given the following data: 1) 85% of cabs in the city are Green, 15% are Blue; and 2) A witness identified the cab as Blue. The court tested the reliability of the witness and found the witness to be accurate 80% of the time. What is the probability that the cab involved in the accident was Blue rather than Green?",
	choices: ["80%", "41%"],
	answer: "41%",
	explanation: "Imagine if you had been told that the two cab companies operate the same number of cabs, but green cabs are involved in 85% of accidents. Believe it or not, the two scenarios are mathematically equivalent. They are, however, admittedly quite psychologically different. Statistical base rates (the first data point you were given) are facts about a population to which a case belongs, but are generally underweighted (if not altogether neglected) when specific information about the case at hand (the second data point) is available."
};

var question6 = {
	question: "Understanding your prospects’ situation, identifying their problem, clarifying the short-term and long-term implications of that problem, and quantifying the financial and emotional benefits your prospect would experience after the resolution of their problem is known as:",
	choices: ["Value-based selling", "Education-based selling"],
	answer: "Value-based selling",
	explanation: "Value-based selling is about listening to your prospects’ needs, and applying both empathy and critical thinking to properly identify their problem and recommend a solution. Education-based selling has more directly to do with closing any information asymmetry gap between you and your prospect with respect to the offering itself. Beware! Your offering better be the best."
};

var question7 = {
	question: "Which of the following is typically the optimal way to price your offer:",
	choices: ["Replacement cost", "Market comparsion", "Discounted cash flow/NPV", "Value comparsion"],
	answer: "Value comparsion",
	explanation: "Because the value of an offer to a particular group can be quite high, comparing those values to different groups provides the opportunity to target a select group and maximize price."
};

var question8 = {
	question: "Which of the following is one of ten useful ways to evaluate the attractiveness of a market:",
	choices: ["Urgency", "Uniqueness of offer", "Speed to market", "All of the above"],
	answer: "All of the above",
	explanation: "The other 7 ways are: market size, pricing potential, cost of customer acquisition, cost of value delivery, up-front investment, upsell potential, and evergreen potential (once created, the effort required to provide an offering on an ongoing basis – the difference between consulting services, and selling widgets which can be easily duplicated)."
};

var question9 = {
	question: "Which of the following is a form of value:",
	choices: ["Shard resources (think car rentals)", "Reselling (think middlemen)", "Agency (think advertising)", "All of the above"],
	answer: "All of the above",
	explanation: "I’m soft-balling you now. Another 9 forms of value are: products, services, subscriptions, leases, aggregated audiences, loans, options, insurance, and capital. There’s not a whole lot else, folks!"
};

var question10 = {
	question: "Which of the following is NOT one of three universal currencies:",
	choices: ["Time", "Resources", "Flexibility", "All three"],
	answer: "All three",
	explanation: "Flexibility is indispensable because it is a derivative of time and resources. And because time and resources are each limited, there is always an opportunity cost in how we spend them."
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
	questionStock = [question1, question2, question3, question4, question5, question6, question7, question8, question9, question10];
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
			$("#answer").text("Correct!");
			$("#explanation").text(explanationStock);
		}
		else {
			$("#answer").text("Almost. The answer is " + answerStock + ".");
			$("#explanation").text(explanationStock);
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
	$("#answer").text("");
	$("#explanation").text("");
	displayQNum();
	updateScore();
	setCurrentQ();
};

function finalScore() {
	updateScore();
	$("#next-question").hide();
	$("#restart-quiz").show();
	$("#answer").text("");
	$("#explanation").text("Thank you for playing. Hopefully you learned something new. Play again to review the concepts.");
	$("#final-score").show();
	$("#sources").show();
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
		$("#sources").hide();
		$("#progress .node").css({"background-color": ""});
		displayQNum();
		updateScore();
		setCurrentQ();
};


$(document).ready(function() {
	
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
		if (questionNum <= 9) {
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