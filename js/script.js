const bodyParts = [
  "pole",
  "rope",
  "head",
  "torso",
  "right-leg",
  "left-leg",
  "right-arm",
  "left-arm",
  "dead",
];

const words = new Map([
  ["javascript", "Web scripting language."],
  ["polymorphism", "Versatile function."],
  ["aliens", "Extraterrestrial beings."],
  ["algorithm", "Problem-solving procedure."],
  ["programming", "Code creation process."],
  ["developer", "Code writer."],
  ["database", "Electronic data collection."],
  ["function", "Task-specific code block."],
  ["variable", "Named memory location."],
  ["loop", "Repeated instruction set."],
  ["html", "Web markup language."],
  ["css", "Style sheet language."],
  ["git", "Version control system."],
  ["nodejs", "JavaScript runtime."],
  ["framework", "Standardized toolset."],
  ["responsive", "Device-friendly design."],
  ["api", "Software interaction rules."],
  ["debugging", "Defect resolution process."],
  ["frontend", "User interface."],
  ["backend", "Server-side logic."],
]);

class Game {
  constructor() {
    this.game = $(".game");
    this.bodyPartsIndex = 0;
    this.maxBodyPartsIndex = bodyParts.length - 1;

    this.game.append(
      `<img src="images/${bodyParts[this.bodyPartsIndex]}.png">`
    );
  }

  updateLastImage() {
    this.bodyPartsIndex++;
    $(".game img").attr("src", `images/${bodyParts[this.bodyPartsIndex]}.png`);

    setTimeout(() => {
      this.bodyPartsIndex++;
      $(".game img").attr(
        "src",
        `images/${bodyParts[this.bodyPartsIndex]}.png`
      );

      $("main").addClass("show-grim-reaper");
      setTimeout(() => {
        $(".game img").attr("src", `images/${bodyParts[0]}.png`);
        $(".grim-reaper").attr("src", `images/reaper-dead.png`);
        $("main").removeClass("show-grim-reaper").addClass("hide-grim-reaper");
      }, 1800);
    }, 1500);
  }

  updateBodyPart() {
    if (this.bodyPartsIndex < this.maxBodyPartsIndex - 2) {
      this.bodyPartsIndex++;
      $(".game img").attr(
        "src",
        `images/${bodyParts[this.bodyPartsIndex]}.png`
      );
    } else {
      this.updateLastImage();
      $(".key").off("click").removeClass("key").addClass("key-pressed");

      $(".card").addClass("flipped");
      const isFlipped = $(".card").hasClass("flipped");
      const rotation = isFlipped ? "rotateY(180deg)" : "rotateY(0deg)";
      $(".card .card-inner").css("transform", rotation);

      setTimeout(() => {
        $("main").html("");

        $("main").append(`
          <img src="images/tobey.png" class="zoom-rotate">
        `);

        setTimeout(() => {
          $("main").append(`
            <h1>you let him die!</h1>
            <span>HOW COULD YOU?</span>
          `);
          setTimeout(() => {
            $("main").append(`
                <div class="button">REDEEM YOURSELF</button>
            `);

            $(".button").click(function () {
              location.reload(true);
            });
          }, 1000);
        }, 1500);
      }, 5500);
    }
  }
}

class Word {
  constructor(game) {
    const wordArray = Array.from(words.keys());
    this.random = Math.floor(Math.random() * wordArray.length);

    this.correctlyGuessedLetters = [];
    this.word = wordArray[this.random];
    this.splitWord = this.word.split("");

    this.hint = words.get(this.word);

    this.game = game;

    this.splitWord.forEach((element, index) => {
      $(".cards").append(`
          <div class="card" data-index="${index}">
            <div class="card-inner">
              <div class="card-face front">
                <img src="images/underscore.png" alt="_" />
              </div>
              <div class="card-face back">
                <img src="images/${element}.png" alt="${element.toLowerCase()}" />
              </div>
            </div>
          </div>
        `);
    });

    $(".cards").append(`
      <div class="hint-container">
        <div class="hint">?</div>
        <div class="tooltip">${this.hint}</div>
      </div>
      `);
  }

  flipCard(keyId) {
    const matchingIndexes = this.splitWord.reduce((indexes, letter, index) => {
      if (letter === keyId) {
        indexes.push(index);
        this.correctlyGuessedLetters.push(letter);
      }
      return indexes;
    }, []);

    if (matchingIndexes.length === 0) {
      this.game.updateBodyPart();
    }

    matchingIndexes.forEach((matchingIndex) => {
      const card = $(`.card[data-index="${matchingIndex}"]`);
      card.toggleClass("flipped");

      const isFlipped = card.hasClass("flipped");
      const rotation = isFlipped ? "rotateY(180deg)" : "rotateY(0deg)";
      card.find(".card-inner").css("transform", rotation);
    });
    const allLettersGuessed =
      this.correctlyGuessedLetters.length === this.splitWord.length;

    if (allLettersGuessed) {
      $(".key").off("click").removeClass("key").addClass("key-pressed");

      $(".card").addClass("flipped");
      const isFlipped = $(".card").hasClass("flipped");
      const rotation = isFlipped ? "rotateY(180deg)" : "rotateY(0deg)";
      $(".card .card-inner").css("transform", rotation);

      setTimeout(() => {
        $(".game img").attr("src", `images/released.png`);

        setTimeout(() => {
          $("main").html("");

          $("main").append(`
            <img src="images/jj.png" class="zoom-rotate jj">
          `);

          setTimeout(() => {
            $("main").append(`
              <h1>you saved him!</h1>
              <span>you're INFAMOUS!</span>
            `);
            setTimeout(() => {
              $("main").append(`
                  <div class="button">Save more</button>
              `);

              $(".button").click(function () {
                location.reload(true);
              });
            }, 1000);
          }, 1500);
        }, 1500);
      }, 2000);
    }
  }
}

class Keyboard {
  constructor(word) {
    $(".key").click(function (event) {
      const keyId = $(this).attr("id");

      if (!$(this).hasClass("pressed")) {
        word.flipCard(keyId);
        $(this).removeClass("key").addClass("key-pressed").addClass("pressed");
        $(this).off("click");
      }
    });
  }
}

$(document).ready(function () {
  const game = new Game();
  const word = new Word(game);
  const keyboard = new Keyboard(word);

  const letterInput = $("#letterInput");
  const submitButton = $(".disabled"); 

  letterInput.on("input", function () {
    const submittedLetter = letterInput.val().toLowerCase();

    const isValidLetter = /^[a-z]$/.test(submittedLetter);

    submitButton
      .addClass("submit", isValidLetter)
      .removeClass("disabled", isValidLetter);
  });

  $("#letterForm").submit(function (event) {
    event.preventDefault(); 
    const submittedLetter = letterInput.val().toLowerCase();

    $(`.key[id="${submittedLetter}"]`).click();

    letterInput.val("");

    submitButton.addClass("disabled").removeClass("submit");
  });
});

$(document).ready(function () {
  $("main").on("animationend", ".zoom-rotate", function () {
    console.log("Animation ended");
  });
});
