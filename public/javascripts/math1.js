$(document).ready(function() {
  var totalQuestions = 30;
  var correctAnswers = new Array();
  var actualAnswers = new Array();

  correctAnswers = ['D','C','A','D','E','B','D','B','A','C','D','C','B','D','C','C','E','D','E','E','D','A','D','C','C',
  'B','D','E','C','D','A','E','B','E','C','C','A','E','B','C','C','A','B','A','A','C','C','E','B','E','D','A','C','E',
  'A','A','B','C','E','B'];

  $('#test_btn.submit_btn').click(function() {
    var incorrect = null
    for (var i = 0; i < totalQuestions; i++) {
      var ans = getQuestion('q' + (i + 1));
      actualAnswers.insert(i, ans);
    }

    var amountCorrect = compareAnswers();
    var percentage = amountCorrect / totalQuestions;
    var score = Math.round(percentage * 36);
    console.log(percentage * 36);
    $('#results').append('<p>' + 'You score score &plusmn1 is ' + score + '</p>');
    scrollTo(0,0);
  });

  function getQuestion(field) {
    // console.log('field = ' + field);
    var test = document.getElementsByName(field);
    var sizes = test.length;
    // console.log('sizes = ' + sizes);
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
      }
    }
    return correct;
  }
})