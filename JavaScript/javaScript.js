const removeActiveClass = () => {
  const activeButton = document.getElementsByClassName("active");
  for( let btn of activeButton) {
    btn.classList.remove("active")
  }
}

// Function will start from here ---

// All Buttons API Fetch ---

const allButtons = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((data) => {
      displayAllButtons(data.data);
    }).catch((error )=> console.log(error));
};

const allCards = (id) => {
  console.log(id);
  const url = `https://openapi.programming-hero.com/api/level/${id}`
  fetch(url)
  .then((res) => res.json())
  .then((data) => {
    removeActiveClass();
    const activeButton = document.getElementById(`${id}`);
    activeButton.classList.add("active");
    displayAllCards(data.data)
  })
  .catch((error )=> console.log(error));

}
// All Cards API Fetch ---
const allVocabulary = (id) => {
  const url = `https://openapi.programming-hero.com/api/word/${id}`
  fetch(url)
  .then((res) => res.json())
  .then((data) => {
    console.log(url);
    displayAllVoc(data.data)
  })
  .catch((error )=> console.log(error));

}

// Display all Buttons ---
const displayAllButtons = (buttons) => {
    const buttonsInnerContainer = document.getElementById("buttonsInner-container");
    for( let button of buttons) {
        const lessonButton = document.createElement("button");
        lessonButton.innerHTML = `
            <button id="${button.level_no}" onclick="allCards('${button.level_no}')" class="btn ml-5"><img src="assets/fa-book-open.png" alt="fa-book-open"> Lesson - ${button.level_no}</button>
        `;
        buttonsInnerContainer.appendChild(lessonButton);

    }
}
// Display all Cards ---
const displayAllCards = (cards) => {
  const errorLayout = document.getElementById("error-layout");
  errorLayout.innerHTML = "" ;
  const startupLayout = document.getElementById("startup-layout");
  startupLayout.innerHTML = "";
  const cardsInnerContainer = document.getElementById("cardsInner-container");
  cardsInnerContainer.innerHTML = "" ;
  if(cards.length === 0 ){
    errorLayout.innerHTML = `
          <div
            class="bg-[#e9ecef] rounded-b-2xl border-[2px] border-[#8d99ae] py-16"
          >
            <img
              class="mx-auto"
              src="assets/alert-error.png"
              alt="alert-error"
            />
            <p class="font-hind font-tiro text-base drop-shadow-sm mb-3">
              এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।
            </p>
            <h2 class="font-hind text-medium text-4xl drop-shadow-sm">
              নেক্সট Lesson এ যান
            </h2>
          </div>
    `;
    return;
  }
  
  for ( let card of cards) {
    const cardsDiv = document.createElement("div"); 
    cardsDiv.innerHTML = `
    <div 
      <div class="bg-[#FFFFFF] p-18 rounded-xl">
            <h3 class="text-medium text-4xl drop-shadow-sm mb-6">${card.word}</h3>
            <p class="text-xl text-normal  drop-shadow-sm mb-6">${card.pronunciation}</p>
            <h3 class="font-hind text-medium text-4xl drop-shadow-sm mb-12 truncate">${card.meaning}</h3>
            <div class="flex justify-between items-center">
                <button class="${card.id}" onclick="allVocabulary(${card.id})" btn bg-btn-clr w-auto h-auto drop-shadow-m border-none px-0"><img src="assets/Group 10.png" alt="Group"></button>
                <button class="detailsButton btn bg-btn-clr w-auto h-auto drop-shadow-m border-none px-0"><img src="assets/Group 9.png" alt="Group"></button>
            </div>
        </div>
        </div>
    `;
    cardsInnerContainer.appendChild(cardsDiv);
  }
} 


const displayAllVoc = (vocabulary) => {
  console.log(vocabulary);
  document.getElementById("word_details").showModal();

  const wordSection = document.getElementById("word-section");
    wordSection.innerHTML = `
          <h1 class="flex items-center text-2xl font-bold mb-7">${vocabulary.word} (  <img class="w-6 h-6" src="https://img.icons8.com/?size=100&id=9622&format=png" alt="">: ${vocabulary.pronunciation}  )</h1>
              <h3 class="text-xl font-semibold mb-2">Meaning</h3>
              <p class="font-mono mb-4">${vocabulary.meaning}</p>
              <h3 class="text-xl font-semibold mb-2">Example</h3>
              <p class="font-mono text-slate-500 mb-4">${vocabulary.sentence}</p>
              <p class="text-xl font-semibold mb-2">সমার্থক শব্দ গুলো</p>`;

  
}
allButtons();