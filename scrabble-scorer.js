// inspired by https://exercism.io/tracks/javascript/exercises/etl/solutions/91f99a3cca9548cebe5975d7ebca6a85

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

//let newPointStructure={'a':1, 'b': 3, 'k':5 };
let newPointStructure = {};

//newPointStructure = transform(oldPointStructure);
//console.log('newPointStructure', Number(newPointStructure));
//console.log("letter a: ", newPointStructure.a);
//console.log("letter b: ", newPointStructure.b);
//console.log("letter k: ", newPointStructure['k']);
 
function transform(obj) {

  for (let m in obj ){
    //console.log("obj[m]", obj[m]);
    
    for( let i = 0; i < obj[m].length; i++ ){
      //console.log("New array", obj[m][i]);
     newPointStructure[(obj[m][i]).toLowerCase()] = m;

    }
    newPointStructure[' '] = 0;
  }
  //console.log("newPointStructure",newPointStructure);
  return newPointStructure;  
  
};
newPointStructure = transform(oldPointStructure);
//console.log('newPointStructure', newPointStructure);
//console.log('oldPointStructure', oldPointStructure);
//console.log(transform(oldPointStructure));

function scrabbleScore(word){
  let letterPoints = 0;
  for( let i = 0; i < word.length; i++ ){
    letterPoints += Number(newPointStructure[word[i]]);
  }
  return letterPoints;
}


function oldScrabbleScorer(word) {
  word = word.toUpperCase();
	let letterPoints = 0;
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if ( oldPointStructure[pointValue].includes(word[i]) ) {
			 //letterPoints += `Points for '${word[i]}': ${pointValue}\n`
       pointValueconv = Number( pointValue );
       letterPoints += pointValueconv;
		  }
 
	  }
	}
	return letterPoints;
 }

 function simpleScore(word){
   //word = word.toUpperCase();
   let pointValue=1;
   let letterPoints=0;
   
   for( let i = 0; i < word.length; i++){
     //letterPoints += `Points for '${word[i]}': ${pointValue}\n`
     letterPoints += pointValue;
    }
    return letterPoints;
 }

 function vowelBonusScore(word){
   word = word.toUpperCase();
   let pointValue=0;
   let letterPoints=0;
   let vowel =['A', 'E', 'I', 'O', 'U'];
   
   for( let i = 0; i < word.length; i++){
      if(vowel.includes(word[i])){
        pointValue = 3;
      } else {
        pointValue = 1;
      }
     // letterPoints += `Points for '${word[i]}': ${pointValue}\n`
      letterPoints += pointValue;
    }
    return letterPoints;
}


// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {

  console.log("Let's play some scrabble! \n");
  let word = input.question("Enter a word to score: ");
    
  //let letters = "";
  let letters = /^[A-Za-z ]*$/;
  if(!letters.test(word)){
    console.log("Please enter a word not a number or symbol");
    return -1;
  }
  return word;
 
 /*console.log(oldScrabbleScorer(scrabbleScore));
  let simpleScore = input.question("Enter a word to score");
  console.log(simpleScorer(simpleScore));
  let vowelBonusScore = input.question("Enter a word to score");
  console.log(vowelBonusScorer(vowelBonusScore));*/
  
  
};

//let simpleScore;

//let vowelBonusScore;

//let scrabbleScore;

const scoringAlgorithms = 
[{
  name: "Simple Score",
  description: "Each letter is worth 1 point",
  scorerFunction: function(word){ return simpleScore(word)}
  /*scorerFunction: function(word){
    let letterPoints=0;
    for( let i = 0; i < word.length; i++){
      letterPoints = letterPoints + 1;
     //letterpoints = word.length;
      //console.log(letterpoints);
    }
    return letterPoints;
    return word.length;
  }*/
 },
 {
  name: "Bonus Vowels",
  description: "Vowels are 3 pts, consonants are 1 pt",
  scorerFunction:function(word){ return vowelBonusScore(word)}
 },
 {
  name:"Scrabble",
  description:"The traditional scoring algorithm",
 // scorerFunction: function(word){ return oldScrabbleScorer(word)}
  scorerFunction:function(word){ return scrabbleScore(word)}
  
 }];

/*console.log("algorithm name: ", scoringAlgorithms[0].name);
console.log("scorerFunction result:", scoringAlgorithms[0].scorerFunction("JavaScript"));*/

function scorerPrompt() {
  let scoringAlgorithm = input.question( `Which Scoring Algorithm would you like to use ?

  0 - Simple: One point per character
  1 - Vowel Bonus: Vowels are worth 3 points
  2 - Scrabble: Uses scrabble point system
  Enter 0, 1, or 2 : `);
  const validOptions = ['0','1','2'];
  if(!validOptions.includes(scoringAlgorithm)){
    console.log("Please enter only 0 1 and 2");
    return -1;
  }
  //console.log(scoringAlgorithm);
  return scoringAlgorithm;

} 



//function transform() {};

//let newPointStructure;

function runProgram() {
  //let newWord = initialPrompt();
  let newWord = -1;
  while ( newWord === -1 ){
    newWord = initialPrompt();
  }
  let score = -1;
  while( score === -1 ){
    score =  scorerPrompt();
  }
  //console.log(newWord);
  //console.log(score);
  console.log(`Score for ${newWord} : ${scoringAlgorithms[score].scorerFunction(newWord)}`);
   
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScore: simpleScore,
   vowelBonusScore: vowelBonusScore,
   scrabbleScore: scrabbleScore,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};

