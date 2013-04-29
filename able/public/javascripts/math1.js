$(document).ready(function() {
  var totalQuestions = 60;
  var actualAnswers = new Array();
  var questionsWrong = new Array();
  
  var correctAnswers = ['D','C','A','D','E','B','D','B','A','C','D','C','B','D','C','C','E','D','E','E','D','A','D','C','C',
  'B','D','E','C','D','A','E','B','E','C','C','A','E','B','C','C','A','B','A','A','C','C','E','B','E','D','A','C','E',
  'A','A','B','C','E','B'];

  var prealgebra = [
  ];

  prealgebra = 

  $('#test_btn.submit_btn').click(function() {
    var incorrect = null
    for (var i = 0; i < totalQuestions; i++) {
      var ans = getQuestion('q' + (i + 1));
      actualAnswers.insert(i, ans);
    }
    var amountCorrect = compareAnswers();
    var percentage = amountCorrect / totalQuestions;
    var score = Math.round(percentage * 36);
    printResults(amountCorrect, score);
    scrollTo(0,0);
  });

  function getQuestion(field) {
    var test = document.getElementsByName(field);
    var sizes = test.length;
    for (i=0; i < sizes; i++) {
      if (test[i].checked == true) {
        return test[i].value;
      }
    }
    return 'Z';
  }

  // I use this function to make sure that every index as it passes through the for loop is given a value.
  // Ordinarily, .push() could be used, but in my paranoia, I worry an index may get skipped for some reason.
  Array.prototype.insert = function (index, item) {
    this.splice(index, 0, item);
  };

  function compareAnswers() {
    var correct = 0;
    for (i = 0; i < totalQuestions; i++) {
      if (correctAnswers[i] === actualAnswers[i]) {
        correct = correct + 1;
      } else {
        questionsWrong.push(i + 1);
      }
    }
    return correct;
  }
  // Array Remove - By John Resig (MIT Licensed)
  Array.prototype.remove = function(from, to) {
    var rest = this.slice((to || from) + 1 || this.length);
    this.length = from < 0 ? this.length + from : from;
    return this.push.apply(this, rest);
  };
  function printResults(a, s) {
    var qwResults = '';
    var resultsWrong = '';
    this.resultsModal = $('.modal-alert');
    this.resultsModal.modal({ show : false, keyboard : true, backdrop : true });

    this.showResults = function(h, b) {
      $('.modal-alert .modal-header h3').text(h);
      $('.modal-alert .modal-body p').text(b);
      this.resultsModal.modal('show');
    }

    var percentage = a / totalQuestions;
    var score = Math.round(percentage * 36);
    
    while (questionsWrong.length > 0) {
      qwResults = questionsWrong[0].toString();
      qwResults = qwResults + ', ';
      questionsWrong.remove(0);
      if (qwResults.length == 15) {
        if (qwResults[15] == ',') {
          qwResults[15] = '\n';
        } else if (qwResults[16] == ',') {
          qwResults[16] = '\n';
        } else {
          qwResults[14] = '\n'
        }
      }
      resultsWrong = resultsWrong + qwResults;
      qwResults = '';
    }

    if (resultsWrong[resultsWrong.length - 2] == ',') {
      resultsWrong = resultsWrong.substr(0, resultsWrong.length - 2);
    }

    this.showResults('Your score is ' + score, 'The questions you got wrong are:' + '\n' + resultsWrong);

    $.post('/math1', { mathscores: score }, function(score) {
      console.log('Score: ' + score);
    });
  }
})
