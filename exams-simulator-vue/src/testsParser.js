export default class TestsParser {
	constructor() {
		this.questionsList = {questions: []}
	}

	parseTxtToObject(event) {
		let array = event.target.result.split(/\n\s*\n|\r\n\s*\r\n/);
		for (let i = 0; i < array.length; i++) {
			if (array[i].trim() !== "") {
				this.parseRawQuestionToObject(i, array[i])
			}
		}
		return this.questionsList
	}

	parseJSON(event) {
		return this.file = JSON.parse(event.target.result);
	}

	parseRawQuestionToObject(questionId, question) {
		let tempOptions = question.split('\n');

		let questionText = tempOptions[0],
			correctOptionId = 0,
			options = [];

		tempOptions.shift();

		for (let i = 0; i < tempOptions.length; i++) {
			let text = tempOptions[i].trim();
			if (text !== "") {
				if (text.substr(0, 1) === '+') {
					correctOptionId = i;
					text = text.substr(1);
				}

				options.push({
					id: i,
					text: text
				})
			}
		}
		this.questionsList.questions.push({
			id: questionId,
			question:questionText,
			answerId:correctOptionId,
			options:options
		});
	}

}
