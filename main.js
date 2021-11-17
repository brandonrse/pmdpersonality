var json = (function () {
  var json = null;
  $.ajax({
      'async': false,
      'global': false,
      'url': "./questions.json",
      'dataType': "json",
      'success': function (data) {
          json = data;
      }
  });
  return json;
})(); 

var questions = [...json["questions"]];
var pokemon = json["pokemon"];
var personalities = json["personalities"];
var score = {
  "Adamant":0,
  "Bashful":0,
  "Bold":0,
  "Brave":0,
  "Calm":0,
  "Careful":0,
  "Docile":0,
  "Gentle":0,
  "Hardy":0,
  "Hasty":0,
  "Impish":0,
  "Jolly":0,
  "Lax":0,
  "Lonely":0,
  "Mild":0,
  "Modest":0,
  "Naive":0,
  "Naughty":0,
  "Quiet":0,
  "Quirky":0,
  "Rash":0,
  "Relaxed":0,
  "Sassy":0,
  "Serious":0,
  "Timid":0
};
var count = 0;
var thankyou = ["Thank you for taking the time to answer this quiz.","I hope you enjoyed it.","Now then..."];
var textCount = 0;
var finalNature = [];
var finalValue;
var chosenPokemon;
var chosenNature;

function index() {
  // Get a random question
  var num = Math.floor(Math.random() * questions.length);
  var chosenQuestion = questions[num];
  questions.splice(num,1); // Remove the question from the array so it won't be repeated

  container = document.getElementById("container");

  q = document.createElement("p"); // create the question text with p node
  q.className = "question";
  qText = document.createTextNode(chosenQuestion["question"]);
  q.appendChild(qText);
  container.appendChild(q);
  div = document.createElement("div");
  div.id = "btnDiv";

  // The buttons the user clicks are created
  button1 = document.createElement("button");
  button1.className = "answerButton";
  button2 = document.createElement("button");
  button2.className = "answerButton";
  button3 = document.createElement("button");
  button3.className = "answerButton";
  button4 = document.createElement("button");
  button4.className = "answerButton";

  // Buttons 1 and 2 text and click eventlistener
  buttonText1 = document.createTextNode(chosenQuestion["answer1"]);
  buttonText2 = document.createTextNode(chosenQuestion["answer2"]);
  
  button1.appendChild(buttonText1);
  button1.addEventListener("click", function() {
    clickAnswer(chosenQuestion, 1);
  });

  button2.appendChild(buttonText2);
  button2.addEventListener("click", function() {
    clickAnswer(chosenQuestion, 2);
  });  

  // appending buttons 1 and 2 with a linebreak in between
  div.appendChild(button1);
  div.appendChild(document.createElement("br"));
  div.appendChild(button2);
  div.appendChild(document.createElement("br"));

  // buttons 3 and 4 are only appended if they are not empty strings
  if (chosenQuestion["answer3"] != "") {  
    buttonText3 = document.createTextNode(chosenQuestion["answer3"]); 
    button3.appendChild(buttonText3);
    button3.addEventListener("click", function() {
      clickAnswer(chosenQuestion, 3);
    });  
    div.appendChild(button3);
    div.appendChild(document.createElement("br"));
  }
  if (chosenQuestion["answer4"] != "") {  
    buttonText4 = document.createTextNode(chosenQuestion["answer4"]); 
    button4.appendChild(buttonText4);
    button4.addEventListener("click", function() {
      clickAnswer(chosenQuestion, 4);
    });  
    div.appendChild(button4);
  }

  container.appendChild(div);

  // If 10 questions are asked, show the final text
  if (count == 10) {
    clear();
    finalScore();
    finish(0);
  }
}

function clickAnswer(question, answer) {
  var natures = []; // Get the natures of the specific answers
  if (question["nature" + answer + "_1"] != "") {
    natures.push(question["nature" + answer + "_1"]);
  }
  if (question["nature" + answer + "_2"] != "") {
    natures.push(question["nature" + answer + "_2"]);
  }
  if (question["nature" + answer + "_3"] != "") {
    natures.push(question["nature" + answer + "_2"]);
  }
  if (question["nature" + answer + "_4"] != "") {
    natures.push(question["nature" + answer + "_4"]);
  }
  
  for (var i = 0; i < natures.length; i++) {
    score[natures[i].split(" ")[0]] += parseInt(natures[i].split(" +")[1]); // adds the points for the chosen nature to the score
  }
  count += 1;
  clear();
  index();
}

function clear() {
  container = document.getElementById("container");
  container.innerHTML = "";
}

function finalScore() {
  // sets the highest value natures in an array
  var largestValue = 0;
  for(var s in score) {
    if(score[s] >= largestValue) {
      largestValue = score[s]; // Largest score value
    }
  }

  for(var s in score) {
    if (score[s] == largestValue) {
      finalNature.push(s);
    }
  }

  // Chooses a random nature from the array
  chosenNature = finalNature[Math.floor(Math.random() * finalNature.length)];
  finalPokemon = [];
  // Gets all the Pokemon with the chosen nature
  for (var p in pokemon) {
    if (pokemon[p].nature == chosenNature){
      finalPokemon.push(pokemon[p].name);
    }
  }
  // Chooses a random pokemon from the array
  chosenPokemon = finalPokemon[Math.floor(Math.random() * finalPokemon.length)];

  // Line breaks for multi-line strings
  let obtainedDescription = personalities[0][chosenNature].split('\n');
  for (var i = 0; i < obtainedDescription.length; i++) {
    thankyou.push(obtainedDescription[i]);
  }
  // thankyou.push(personalities[0][chosenNature]);
  thankyou.push(chosenPokemon + "!");
}

function finish() {
  container = document.getElementById("container");
  var buttonExists = document.getElementById("nextButton");
  // If the next button exists remove it
  if (typeof (buttonExists) != 'undefined' && buttonExists != null) {
    container.removeChild(buttonExists);
  }
  button = document.createElement("button");
  button.appendChild(document.createTextNode("Redo"));
  button.className = "nextButton";
  button.id = "nextButton";
  button.addEventListener("click", function () {
    clear();
    questions = [...json["questions"]];
    score = {
      "Adamant": 0,
      "Bashful": 0,
      "Bold": 0,
      "Brave": 0,
      "Calm": 0,
      "Careful": 0,
      "Docile": 0,
      "Gentle": 0,
      "Hardy": 0,
      "Hasty": 0,
      "Impish": 0,
      "Jolly": 0,
      "Lax": 0,
      "Lonely": 0,
      "Mild": 0,
      "Modest": 0,
      "Naive": 0,
      "Naughty": 0,
      "Quiet": 0,
      "Quirky": 0,
      "Rash": 0,
      "Relaxed": 0,
      "Sassy": 0,
      "Serious": 0,
      "Timid": 0
    };
    count = 0;
    thankyou = ["Thank you for taking the time to answer this quiz.", "I hope you enjoyed it.", "Now then..."];
    textCount = 0;
    finalNature = [];
    finalValue = 0;
    chosenPokemon = "";
    chosenNature = "";
    index();
  });

  // Show the text 
  q = document.createElement("p"); // create the question text with p node
  q.className = "question";
  for (var i = 0; i < thankyou.length; i++) {
    q.appendChild(document.createTextNode(thankyou[i]));
    container.appendChild(q);
    q.appendChild(document.createElement("br"));
    q.appendChild(document.createElement("br"));
  }
  var img = document.createElement("img");
  img.setAttribute("src", "https://play.pokemonshowdown.com/sprites/dex/" + chosenPokemon.toLowerCase() + ".png");
  container.appendChild(img);
  container.appendChild(button);

}

function audio() {
  // the PMD personality quiz music from RTDX
  audioDiv = document.getElementById("audio");
  audio = document.createElement("audio");
  audio.setAttribute("src", "./Quiz.mp3");
  audio.autoplay = true;
  audio.loop = true;
  audio.setAttribute("controls", "controls");
  audio.volume = 0.5;
  audioDiv.appendChild(audio);
}

window.onload = function(){
  audio();
  index();
}