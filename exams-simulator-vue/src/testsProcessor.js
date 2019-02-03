export default class TestsParser {
	constructor(questionsList, inputs) {
		this.questionsList = questionsList;
		this.inputs = inputs;
		this.wrongAnswersLog = []
	}

	processTest() {
		// let questionsL = this.questionsList;
		// let inputs = $('input[type=radio]:checked'),
		let questionsLength = this.questionsList.questions.length;
		let wrongAnswersCount = 0,
			correctAnswers = 0;
		for (let i = 0; i < this.inputs.length; i++) {
			let answerId  = this.inputs[i].getAttribute("id");
			let questionId = answerId.substr(answerId.lastIndexOf('q') + 1, answerId.lastIndexOf('v')-1);
			let optionId = answerId.substr(answerId.lastIndexOf('v') + 1);

			let correctAnswerId = 0;
			let questions = this.questionsList.questions;
			for (let i2 = 0; i2 < questions.length; i2++) {
				let question = questions[i];
				if (+question.id === +questionId)  {
					correctAnswerId = question.answerId;
					if (+optionId === +correctAnswerId) {
						correctAnswers++;
					} else {
						wrongAnswersCount++;
						this.logWrongQuestion(question, optionId, correctAnswerId);
					}
					break
				}
			}
		}

		let correctAnswersPercent = ((100 / questionsLength) * correctAnswers).toFixed(1);
		let assessment = TestsParser.calculateAssessment(correctAnswersPercent);
		return {
			correctAnswers,
			questionsCount: questionsLength,
			correctAnswersPercentage: correctAnswersPercent + "%",
			assessment,
			wrongAnswersLog: this.wrongAnswersLog
		}
	}

	static calculateAssessment(percents) {
		if (percents < 50) return "2";
		else if (percents >= 50 && percents < 56) return "3 (достатньо)";
		else if (percents >= 56 && percents < 63) return "3";
		else if (percents >= 63 && percents < 80) return "4 (добре)";
		else if (percents >= 80 && percents < 88) return "4 (дуже добре)";
		else if (percents >= 88) return "5 відмінно";
	}

	logWrongQuestion(question, selectedOptionId, correctOptionId) {
		this.wrongAnswersLog.push({
			questionText: question.question,
			selectedOptionText: question.options[selectedOptionId].text,
			correctOptionText: question.options[correctOptionId].text
		})
	}

}
