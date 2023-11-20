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
  
      this.word.forEach((element, index) => {
        $(".cards").append(`
          <div class="card" data-index="${index}">
            <div class="card-inner">
              <div class="card-face front">
                <img src="images/underscore.png" alt="_" />
              </div>
              <div class="card-face back">
                <img src="images/${element}.png" alt="${element.toUpperCase()}" />
              </div>
            </div>
          </div>
        `);
      });
    }
  
    flipCard(keyId) {
      // Find all occurrences of the clicked key in the word
      const matchingIndexes = this.word.reduce((indexes, letter, index) => {
        if (letter === keyId) {
          indexes.push(index);
        }
        return indexes;
      }, []);
  
      // Flip all corresponding cards
      matchingIndexes.forEach((matchingIndex) => {
        const card = $(`.card[data-index="${matchingIndex}"]`);
        card.toggleClass('flipped');
  
        const isFlipped = card.hasClass('flipped');
        const rotation = isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)';
        card.find('.card-inner').css('transform', rotation);
      });
    }
  }
  
  class Keyboard {
    constructor(word) {
      // Add click event listeners to all keys
      $(".key").click(function (event) {
        // Get the ID of the clicked key
        const keyId = $(this).attr("id");

        // Check if the key has already been pressed
        if (!$(this).hasClass("pressed")) {
          // Call the flipCard method of the Word class based on the clicked key
          word.flipCard(keyId);
        
          // Add a class to indicate that the key has been pressed
          $(this).removeClass("key").addClass("key-pressed").addClass("pressed");

          
          // Remove the click event listener for this key
          $(this).off("click");
        }
      });
    }
  }
  
  
  $(document).ready(function () {
    const word = new Word();
    const keyboard = new Keyboard(word);
  });
  
  
  
