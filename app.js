const url =
  "https://opentdb.com/api.php?amount=1&difficulty=easy&type=multiple";
const question = document.querySelector(".question");
const optionList = Array.from(document.querySelectorAll("li"));
const nextBtn = document.querySelector(".next");

async function getData() {
  try {
    // getting data from api
    let response = await fetch(url);
    let data = (await response.json()).results[0];

    question.innerHTML = data.question;

    // Answer List
    let answerLists = [
      data.correct_answer,
      data.incorrect_answers[0],
      data.incorrect_answers[1],
      data.incorrect_answers[2],
    ];

    // Shuffle Answer List
    answerLists = shuffleAnswer(answerLists);

    // Inputting the answer lists in options
    optionList.forEach((option) => {
      option.innerHTML = answerLists[optionList.indexOf(option)];
      if (option.innerHTML == data.correct_answer) {
        option.classList.add("correctAnswer");
      }

      // Coloring the Options
      option.addEventListener("click", (event) => {
        let target = event.target;
        optionList.forEach((items) => {
          if (items.classList.contains("correctAnswer")) {
            items.style.backgroundColor = "green";
          } else {
            items.style.backgroundColor = "red";
          }
        });
      });
    });

    // Removing the Previous Background Color
    nextBtn.addEventListener("click", () => {
      optionList.forEach((item) => {
        item.style.backgroundColor = null;
        if (item.classList.contains("correctAnswer")) {
          item.classList.remove("correctAnswer");
        }
      });
    });
  } catch (error) {
    console.error(error);
  }
}

// NextBtnEvent
nextBtn.addEventListener("click", getData);

// Answer Array Shuffle
function shuffleAnswer(arr) {
  let randomIndex;
  for (let currentIndex = arr.length - 1; currentIndex > 0; currentIndex--) {
    randomIndex = Math.floor(Math.random() * (currentIndex + 1));
    [arr[currentIndex], arr[randomIndex]] = [
      arr[randomIndex],
      arr[currentIndex],
    ];
  }
  return arr;
}

function defaultColor(arr) {
  arr.forEach((item) => {
    // item.style.backgroundColor = null;
  });
}

getData();
