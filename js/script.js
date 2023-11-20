const alphabet = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];
const bodyParts = [
  "head",
  "torso",
  "right-leg",
  "left-leg",
  "right-arm",
  "left-arm",
];

const words = [
  "antidisestablishmentarianism",
  "javascript",
  "polymorphism",
  "aliens",
];

class Game {}

class Man {}

class Word {
    constructor() {
      this.word = words[1].split("");
  
      this.word.forEach((element) => {
        $(".cards").append(`
          <div class="card">
            <div class="card-inner">
              <div class="card-face front">
                <img src="images/underscore.png" alt="_" />
              </div>
              <div class="card-face back">
                <img src="images/${element}.png"/>
              </div>
            </div>
          </div>
        `);
      });
    }
  }
  

class Keyboard {
  constructor() {
    // Add click event listeners to all keys
    $(".key").click((event) => {
      // Get the ID of the clicked key
      let keyId = $(event.currentTarget).attr("id");

      // Implement your logic based on the clicked key
      console.log("Key clicked:", keyId);
    });
  }
}

// Instantiate the Keyboard class when the document is ready
$(document).ready(function () {
  const keyboard = new Keyboard();
  const word = new Word();
});
