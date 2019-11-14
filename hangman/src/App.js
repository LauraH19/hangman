import React from 'react';
import './App.css';
import ReactDOM from 'react-dom';

let input  = ''
let word_array = []
let counter = 7 //Number of guesses


//array with alphabet for buttons
let alphabet = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"]

//array with random words to guess
let random_words = ["pen", "brave", "licence", "polite", "read", "stride", "law", "cancel", "slime", "sacred", "mention", "crop", "wound", "ball", "free", "store", "laundry", "expect", "stock", "agree", "endure", "variety", "vision", "project", "animal", "cafe", "error", "package", "remain", "future", "concede", "chaos", "price", "ethnic", "trend", "sigh", "fool", "share", "fox", "summit"


]

//create random number and select word with this number
let random_number = Math.floor(Math.random() * 11);
word_array = random_words[random_number].split('');

//array to store if a letter was guessed correctly
let history = new Array(word_array.length)

//class of Placeholder for letters
//includes methodes constructor() and render()
class Placeholder extends React.Component {

  //set initial state of value to _ and id to 0
  constructor(props) {
    super(props);
    this.state = {
      value: "_ ", 
      id: 0
    };
  }

  //return the placeholder or letter of this place
  render() {
    return (
     <span className="placeholder" id={this.props.id}>{this.state.value}</span>
    );
  }
}

//class for displaying the word that has to be guessed and handling the input
//class includes constructor(), handleSubmit() and render() 
class Word extends React.Component {

  //create ref for each placeholderElement
  constructor(props){
    super(props);
    this.placeholderElement = React.createRef();
  }

  //click on button, get input, check if letter is in word, check if word is completed
  handleSubmit = (event) => {
    
    //variable for checking if a letter was included in the word
    let hit = false 

    //prevent page from reload
    event.preventDefault()

    //get input from button and disable clicked button
    let input = event.target.value
    event.target.disabled = true

    //iterate over the random selected word    
    word_array.map(function(letter, index){

      //check for each letter in word if input is the same 
      if(letter.toUpperCase() === input.toUpperCase()){

        //replace placeholder with letter, set variable hit to true and mark place of word in history array as a hit
        document.getElementById(index).innerHTML = letter
        hit = true
        history[index] = 'x'

        //set variable won to true, change if there is an empty place in history array (= if one letter is not yet guessed)
        let won = true
        for(var i=0; i<word_array.length; i++){
          if(history[i]!='x'){
            won = false
          }
        }

        //if variable won is true every letter was guessed correctly
        //show the success message
        if(won == true){
          document.getElementById("success").style.display = "block"
          document.getElementById("success").innerHTML = "<p>You won the game</p>"
        }
      }
    });

    //if the input was not included in word (hit == false) and a guess is left, decrement counter
    if(hit === false && counter !== 1){
      counter--
    } 
    //if the input was not included in word (hit == false) and no guess is left, decrement counter and show message that game is lost
    else if (hit === false && counter ===1) {
      counter--
      document.getElementById("success").style.display = "block"
    }
    
    //change counter number
    document.getElementById("counter").innerHTML = counter + " Guesses left"
  }


  render() {
    //display placeholder or word, the form and the counter
    return (
      <div className="Word">
        <div className="guess"> 
          {word_array.map((char, index) => <Placeholder id={index} ref={this.placeholderElement}/>)}
        </div>
        <form onSubmit={this.handleSubmit}>
          <label>Guess a letter: </label>
          {alphabet.map((char, index) => <button type="submit" value={char} onClick={e => this.handleSubmit(e, "value")}>{char}</button>)}
        </form>
        <p id="counter"> {counter} Guesses left</p> 
      </div>
    );
  }
}



//includes the game and the success message
class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <Word />
        <div id="success">
          <p>You lost the game</p>
        </div>
      </div>
    );
  }
}
export default Game;
