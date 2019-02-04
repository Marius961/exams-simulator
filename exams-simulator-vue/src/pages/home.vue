<template>
  <div>
    <main class="container">
      <div class="mt-container" v-if="mainComponentVisible">
        <div class="row justify-content-center container-box p-3">
          <div class="col-12 header-1 text-center">Вітаємо у Exams Simulator</div>
          <div class="col-12 col-sm-9 col-md-7 label-1 text-center">Це невеличкий веб додаток для перевірки знань тестів, Ви можете завантажити фийл
            з тестами у форматі JSON або власноруч створити його по посиланню нижче.</div>

          <div class="w-50 hr-orange mt-3 mb-3"></div>
          <div class="w-100"></div>

          <input class="col-12 inputFile" id="file" v-on:change="inputChange" type="file">
          <label for="file" class="col-12 col-sm-auto upload-btn p-2 pl-3 pr-3">
            <div class="row align-items-center justify-content-center">
              <div class="col-auto">
                <img src="../../static/upload.png">
              </div>
              <div class="col-auto text-center">Завантажити файл</div>
            </div>
          </label>

          <div class="w-100"></div>

          <label class="col-auto params-label" @click="showTestParams = !showTestParams">Додаткові параметри</label>
          <div class="w-100"></div>

          <div class="col-auto" v-if="showTestParams">
            <div class="row">
              <div class="col-12  mt-2 col-md-4 m-md-0">
                <div class="row custom-control custom-checkbox text-center justify-content-center">
                  <input type="checkbox" v-model="testParams" value="expressTest" class="col-auto custom-control-input " id="expressTest">
                  <label class="col-auto custom-control-label p-0 pr-2" for="expressTest" data-toggle="tooltip" data-placement="bottom" title="30 тестів (у випадку якщо загальна кількість більше 30)">Експрес тест</label>
                </div>
              </div>
              <div class="col-12  mt-2 col-md-4 m-md-0">
                <div class="row custom-control custom-checkbox text-center justify-content-center">
                  <input type="checkbox" v-model="testParams" value="shuffleQuestions" class="col-auto custom-control-input " checked id="shuffleQuestions">
                  <label class="col-auto custom-control-label p-0 pr-2" for="shuffleQuestions" data-toggle="tooltip" data-placement="bottom" title="Перемішати питання">Перемішати питання</label>
                </div>
              </div>
              <div class="col-12  mt-2 col-md-4 m-md-0">
                <div class="row custom-control custom-checkbox text-center justify-content-center">
                  <input type="checkbox" v-model="testParams" value="shuffleOptions" class="col-auto custom-control-input" checked id="shuffleOptions">
                  <label class="col-auto custom-control-label p-0 pr-2" for="shuffleOptions" data-toggle="tooltip" data-placement="bottom" title="Перемішати відповіді">Перемішати відповіді</label>
                </div>
              </div>
            </div>
          </div>

          <div class="w-100"></div>
          <div class="w-50 hr-orange mt-3 mb-3"></div>

          <div class="col-12 label-1 text-center mt-1 mb-3">або</div>
          <div class="w-100"></div>
          <router-link to="/constructor" el="a" class="col-12 col-sm-auto btn-orange-secondary p-3 mb-5">Створіть свої тести</router-link>

          <div class="col-12 mt-3">
            <div class="row info-container p-3">
              <div class="col-12 text-center info-header" @click="templateVisibility = !templateVisibility">Оформлення для сумісного TXT файлу</div>
              <div class="col-12" v-if="templateVisibility">
                <div class="row justify-content-center">
                  <div class="col-12 text-center">Примітка: між запитаннями повинно бути 2 пустих рядки, "_" - пустий рядок</div>
                  <div class="w-50 hr-orange mt-3 mb-3"></div>
                </div>
                <div class="row">
                  <div class="col-12">Питання яке міститься в одному рядку</div>
                  <div class="col-12">&ensp;Перший варіант відповіді</div>
                  <div class="col-12">&ensp;Другий варіант відповіді</div>
                  <div class="col-12">&ensp;Третій варіант відповіді</div>
                  <div class="col-12">&ensp;+Четвертий варіант відповіді правильний, позначається за допомогою знака "+"</div>
                  <div class="col-12">_</div>
                  <div class="col-12">_</div>
                  <div class="col-12">&ensp;...</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


    </main>
    <testing-segment
      v-show="testingComponentVisible"
      :questionsList="questionsList"
      @testFinished="saveResult($event)"
      @startTest="showTestingComponent"
    ></testing-segment>
    <result-component
      v-show="resultComponentVisibility"
      :result="testResult"
      @showResult="showResultComponent"
      @tryAgain="retryTesting"
      @selectNewFile="selectNewFile"
    ></result-component>
  </div>
</template>

<script>
  import TestingSegment from '../components/testingSegment'
	import TestsParser from '../testsParser'
  import ResultComponent from '../components/resultComponent'
  export default {
    data() {
      return {
        file: '',
        templateVisibility: false,
        questionsList: {questions: []},
        mainComponentVisible: true,
        testingComponentVisible: false,
				resultComponentVisibility: false,
				showTestParams: false,
				testParams: [],
        testResult: {}
			}
    },
    components: {
      'testing-segment': TestingSegment,
      'result-component': ResultComponent
    },
    methods: {
      inputChange(event) {
      	let parser = new TestsParser();
        let reader = new FileReader(),
          fileName = event.target.files[0].name,
          lastIndex = fileName.lastIndexOf('.'),
          type = fileName.substr(lastIndex);

        if (type === ".json") {
					reader.onload = (e) => {
						this.questionsList = this.addParamsToTest(parser.parseJSON(e))
					}
        } else if (type === ".txt") {
					reader.onload = (e) => {
						this.questionsList = this.addParamsToTest(parser.parseTxtToObject(e))
					}
        } else {
          // shows a message when the file is incompatible
          swal({
            title: "Формат файлу не підтримується!",
            text: "Будь ласка оберіть файл у форматі TXT або JSON",
            icon: "warning",
            button: "ОК",
          });
        }
        reader.readAsText(event.target.files[0]);
      },

      saveResult(result) {
        this.testResult = result;
      },
			showMainComponent() {
      	this.mainComponentVisible = true;
      	this.testingComponentVisible = false;
      	this.resultComponentVisibility = false;
			},
			showTestingComponent() {
				this.mainComponentVisible = false;
				this.testingComponentVisible = true;
				this.resultComponentVisibility = false;
			},
			showResultComponent() {
				this.mainComponentVisible = false;
				this.testingComponentVisible = false;
				this.resultComponentVisibility = true;
			},
      addParamsToTest(list) {
        if (this.testParams.indexOf('shuffleQuestions') > -1) {
          list.questions = this.shuffledArray(list.questions)
        }

        if (this.testParams.indexOf('expressTest') > -1 && list.questions.length > 30) {
          list.questions.length = 30;
        }

        if (this.testParams.indexOf('shuffleOptions') > -1) {
          for (let i = 0; i < list.questions.length; i++) {
            list.questions[i].options = this.shuffledArray(list.questions[i].options)
          }
        }
        return list;
      },
      shuffledArray(array) {
        return array.sort(function(){
          return Math.random() - 0.5;
        });
      },
      retryTesting() {
        this.addParamsToTest(this.questionsList);
        this.showTestingComponent()
      },
      selectNewFile() {
        this.file = ''
        this.showMainComponent()
      }
    }
  }
</script>

<style scoped>

</style>
