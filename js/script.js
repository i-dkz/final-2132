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
  "dead",
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
      console.log(this.bodyPartsIndex);
      $(".game img").attr(
        "src",
        `images/${bodyParts[this.bodyPartsIndex]}.png`
      );
    } else {
      this.updateLastImage();
      $(".key").removeClass(".key").addClass("key-pressed");
      console.log(this.bodyPartsIndex, ": last one");

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
              location.reload();
            });
          }, 1000);
        }, 1500);
      }, 5500);
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
    const matchingIndexes = this.word.reduce((indexes, letter, index) => {
      if (letter === keyId) {
        indexes.push(index);
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
});

$(document).ready(function () {
  $("main").on("animationend", ".zoom-rotate", function () {
    console.log("Animation ended");
  });
});
