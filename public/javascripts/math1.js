$(document).ready(function() {
  var totalQuestions = 30;
  var correctAnswers = new Array();
  var actualAnswers = new Array();

  correctAnswers = ['D', 'C', 'A', 'D', 'E', 'B', 'D', 'B', 'A', 'C',
    'D', 'C', 'B', 'D', 'C', 'C', 'E', 'D', 'E', 'E',
    'D', 'A', 'D', 'A', 'C', 'B', 'D', 'E', 'C', 'D'];

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

  // function showsolution(){
  //   var win2=window.open("","win2","width=200,height=350, scrollbars")
  //   win2.focus()
  //   win2.document.open()
  //   win2.document.write('<title>Solution</title>')
  //   win2.document.write('<body bgcolor="#FFFFFF">')
  //   win2.document.write('<center><h3>Solution to Quiz</h3></center>')
  //   win2.document.write('<center><font face="Arial">')
  //   for (i=1;i<=totalQuestions;i++){
  //     for (temp=0;temp<incorrect.length;temp++){
  //       if (i==incorrect[temp])
  //         wrong=1
  //     }
  //     if (wrong==1){
  //       win2.document.write("Question "+i+"="+correctchoices[i].fontcolor("red")+"<br>")
  //       wrong=0
  //     }
  //     else
  //       win2.document.write("Question "+i+"="+correctchoices[i]+"<br>")
  //   }
  //   win2.document.write('</center></font>')
  //   win2.document.write("<h5>Note: The solutions in red are the ones to the questions you had incorrectly answered.</h5>")
  //   win2.document.close()
  // }
})