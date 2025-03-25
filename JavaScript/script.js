const levelsUrl = 'https://openapi.programming-hero.com/api/levels/all';
const vocabularyUrl = (levelId) => `https://openapi.programming-hero.com/api/level/${levelId}`;

document.addEventListener('DOMContentLoaded', async () => {
    const levelsContainer = document.getElementById('buttons-container');
    const vocabularySection = document.getElementById('cards-container');
    const defaultText = '<p class="text-center text-xl">Select a lesson to see the vocabulary words.</p>';

    vocabularySection.innerHTML = defaultText;

    try {
        const response = await axios.get(levelsUrl);
        const levels = response.data.levels;

        levels.forEach(level => {
            const button = document.createElement('button');
            button.innerText = level.name;
            button.className = 'btn bg-btn-clr drop-shadow-md border-4 border-[#3d2c8d] ml-4';
            button.onclick = () => loadVocabulary(level.id);
            levelsContainer.appendChild(button);
        });
    } catch (error) {
        console.error('Error fetching levels:', error);
    }
});

async function loadVocabulary(levelId) {
    const vocabularySection = document.getElementById('cards-container');
    vocabularySection.innerHTML = '';

    try {
        const response = await axios.get(vocabularyUrl(levelId));
        const words = response.data.words;

        words.forEach(word => {
            const card = document.createElement('div');
            card.className = 'bg-white p-6 rounded-xl drop-shadow-md';
            card.innerHTML = `
                <h3 class="text-2xl font-bold mb-2">${word.word}</h3>
                <p class="text-base mb-2"><strong>Meaning:</strong> ${word.meaning}</p>
                <p class="text-base mb-4"><strong>Pronunciation:</strong> ${word.pronunciation}</p>
                <button class="btn bg-btn-clr border-2 border-[#8d99ae] mr-2" onclick="playAudio('${word.audio}')">🔊</button>
                <button class="btn bg-btn-clr border-2 border-[#f9c74f]" onclick="addToFavorites('${word.word}')">⭐</button>
            `;
            vocabularySection.appendChild(card);
        });
    } catch (error) {
        console.error('Error fetching vocabulary:', error);
        vocabularySection.innerHTML = '<p class="text-center text-xl text-red-500">Failed to load vocabulary. Try again later.</p>';
    }
}

function playAudio(audioUrl) {
    const audio = new Audio(audioUrl);
    audio.play();
}

function addToFavorites(word) {
    alert(`${word} added to favorites!`);
}
