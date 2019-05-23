import $ from 'jquery'

$(document).ready(() => {
  showTopWord();
  var button = document.getElementById("button");
  button.addEventListener("click", function(){
    addWord();
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

function addWord(){
  var newWord = document.getElementById("textarea").value;
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
  .then(result => {
    return document.getElementById("textarea").value = `${result["message"]}`;
  })
};
