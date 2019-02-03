<template>
  <div class="container">
    <div class="row mt-5 pt-4" v-for="questionBlock in questionsList.questions">
      <div class="col-12 question-text" :id="'question' + questionBlock.id" v-html="questionBlock.question"></div>
      <div class="col-12">
        <div v-for="option in questionBlock.options" class="row custom-control custom-radio ml-sm-4 pl-5 pt-2 pb-2 option-2">
          <input type="radio" :name="'q' + questionBlock.id" :id="'q' + questionBlock.id + 'v' + option.id" class="col-auto custom-control-input">
          <label :for="'q' + questionBlock.id + 'v' + option.id" class="col-12 custom-control-label option-1" v-html="option.text"></label>
        </div>
      </div>
    </div>
    <div class="row justify-content-center mt-3 mb-3">
      <button @click="finishTest" class="col-auto btn-orange-primary p-2 mt-3">Завершити</button>
    </div>
  </div>
</template>

<script>
	import TestsProcessor from '../testsProcessor'

	export default {
    props: {
      questionsList: {
        type: Object,
        default: null
      }
    },
    data() {
      return {
        radios: [],
        wrongAnswersLog: []
      }
    },
    watch: {
			questionsList: {
        handler: function () {
        	this.$emit('startTest')
        },
        deep: true
      }
    },
    methods: {
      finishTest() {
        let inputs = $('input[type=radio]:checked');
				let questionsLength = this.questionsList.questions.length;
				if (inputs.length === questionsLength) {
          $(inputs).prop('checked', false);
					let processor = new TestsProcessor(this.questionsList, inputs)
					let result = processor.processTest();
					this.$emit("testFinished", result);
				} else {
					swal({
						text: "Будь ласка дайте відповідь на всі питання щоб завершити тестування",
						icon: "warning",
						button: "Продовжити",
					});
				}
      },
    }
  }
</script>

<style scoped>

</style>
