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
    printResults(amountCorrect);
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

  function printResults(s) {
    $('#results').html('');
    var percentage = s / totalQuestions;
    var score = Math.round(percentage * 36);
    $('#results').append('<textarea readonly>' + 'You score score &plusmn1 is ' + score + '</textarea><br>');
    $('#results').append('<textarea readonly>' + 'The questions you got wrong are :\n' + questionsWrong.toString() + '</textarea>');
    $('textarea').autosize();
    $('#test').html('');
  }
})
