import $ from 'jquery'

$(document).ready(() => {
  showTopWord();
  var button = document.getElementById("button");
  button.addEventListener("click", function(){
    addSubmission();
    showTopWord();
  })
})

function showTopWord(){
  fetch("https://wordwatch-api.herokuapp.com//api/v1/top_word")
  .then(response => {
    return response.json()
  })
  .then(result => {
    var topWord = Object.keys(result.word)[0]
    var count = result.word[topWord]
    return document.getElementById("word-count").innerHTML = `${topWord}: (${count})`;
  })
};

function addSubmission(){
  var input = document.getElementById("textarea").value;
  var words = input.replace(/[.,\/#!?$%\^&\*;:{}=\-_`~()]/g,"").split(" ")
  document.getElementById("textarea").value = "";
  words.forEach(word => {
    addWord(word);
  })
};

function addWord(newWord){
  fetch("https://wordwatch-api.herokuapp.com/api/v1/words",{
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      word:{ value: `${newWord}`}
    })
  })
  .then(response => {
    return response.json()
  })
  .then(response => {
    var text = document.getElementById("textarea").value
    return document.getElementById("textarea").value = text + `${response["message"]}`+ '\n';
  })
};
