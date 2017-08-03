// The random answer
var unicorn = new Vue({
  el: '#Random',
  data: {
    question: '',
    answer: 'J\'ai des pouvoirs magique,mais je peux pas deviner ta question !',
    isAnswered: false,
    answerImg: {
    	backgroundImage: '',
  	},
    name: 'Jean Kevin',
  },
  watch: {
    // whenever question changes, this function will run
    question: function (newQuestion) {
      this.answer = 'J\'attends...'
      this.isAnswered = false;
      this.answerImg.backgroundImage = '';
      this.getAnswer()
    }
  },
  methods: {
    getAnswer: _.debounce(
      function () {
        if (this.question == ''){
          this.answer = 'Pose moi une question ! \\(^-^)/';
          return;
        }
          else if (this.question.indexOf('?') === -1) {
          this.answer = 'Une question a un point d\'interrogation... :('
          return
        }
        this.answer = 'Je reflechis...'
        //Reponse aleatoire + utilisation API
        var vm = this
        axios.get('https://yesno.wtf/api')
          .then(function (response) {
            vm.answer = _.capitalize(response.data.answer);
            vm.answerImg.backgroundImage = 'url(' + response.data.image + ')';
          })
          .catch(function (error) {
            vm.answer = 'Mes pouvoirs ont disparus.. :( ' + error
          })
      },
      // Timer avant reponse
      750 )
  }
})
