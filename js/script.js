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
  "pole",
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

class Game {
    constructor() {
      this.game = $(".game");
      this.bodyPartsIndex = 0;
      this.maxBodyPartsIndex = bodyParts.length - 1;
  
      this.game.append(`<img src="images/${bodyParts[this.bodyPartsIndex]}.png">`);
    }
  
    updateBodyPart() {
      if (this.bodyPartsIndex < this.maxBodyPartsIndex) {
        this.bodyPartsIndex++;
        $(".game img").attr("src", `images/${bodyParts[this.bodyPartsIndex]}.png`);
      } else {
        // Game over condition
        $("main").html(""); // Clear the inner HTML of the main container
  
        // Add Batman spinning logo animation
        $("main").append(`
        <img src="images/tobey.png" class="zoom-rotate">
      `);
  
        // You can perform other actions here, such as resetting the game.
      }
    }
  }
  
  class Word {
    constructor(game) {
      this.word = words[1].split("");
      this.game = game;
  
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
  
      if (matchingIndexes.length === 0) {
        // No matching letters, update the body part
        this.game.updateBodyPart();
      }
  
      // Flip all corresponding cards
      matchingIndexes.forEach((matchingIndex) => {
        const card = $(`.card[data-index="${matchingIndex}"]`);
        card.toggleClass("flipped");
  
        const isFlipped = card.hasClass("flipped");
        const rotation = isFlipped ? "rotateY(180deg)" : "rotateY(0deg)";
        card.find(".card-inner").css("transform", rotation);
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
    const game = new Game();
    const word = new Word(game);
    const keyboard = new Keyboard(word);
  });
  

  $(document).ready(function () {
    $("main").on("animationend", ".zoom-rotate", function () {
      // Animation has ended, you can perform additional actions if needed
      console.log("Animation ended");
    });
  });