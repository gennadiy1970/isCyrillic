const refs = {
  form: document.querySelector(".form"),
  list: document.querySelector(".list-group"),
};

const getList = (arr) => {
  const letters = [];
  arr
    .map((e) => ({
      word: e,
      letters: e.split("").map((e) => e.charCodeAt(0)),
    }))
    .filter((e) =>
      e.letters.some((el) => {
        if (el > 122 || el < 36) {
          letters.push({
            word: e.word,
            letter: String.fromCharCode(el),
          });
          return el;
        }
        return false;
      })
    );

  return letters;
};

function showResults(arr) {
  refs.list.innerHTML = '';
  const list = arr
    .map((e) => {
      const letter = e.letter;
      const word = e.word;
      const regex = new RegExp(letter, "g");
      const readyWord = word.replace(
        regex,
        `<b class="text-danger">${letter}</b>`
      );
      return `<li class="list-group-item">${readyWord}</li>`;
    })
    .join("\n");
  refs.list.insertAdjacentHTML("afterbegin", list);
}

function checkCyrillicLettes(event) {
  event.preventDefault();
  const data = new FormData(refs.form);
  const words = data.get("user-text").split(" ");
  const results = getList(words);
  if (results.length) {
    showResults(results);
  }
}

refs.form.addEventListener("submit", checkCyrillicLettes);
