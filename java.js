// function allButtons () {
//     fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
//     .then((res) => res.json())
//     .then((data) => {
//         console.log(data.categories);
//     }).catch((error) => console.log(error));
// }
// allButtons();
const URL = `https://openapi.programming-hero.com/api/level/5`;

const getFacts = async () => {
    console.log("getting data.......")
    let response = await fetch(URL);
    console.log(response);
    let data = await response.json();
    getData(data.data);
}
getFacts();

const getData = (allData) => {
    const buttonInnerSection = document.getElementById("button-innerSection");
    console.log(allData);
    for( let data of allData) {
        const div = document.createElement("div");
        div.innerText = `id ${data.id}`;
        buttonInnerSection.appendChild(div);
        console.log(data.id);
    }
 }