// Variables
const apiKey = '33514834-460ad1b7211981a50c737ee93';
const form = document.querySelector('form');
const nextBtn = document.querySelector("#nextPage");
const previousBtn = document.querySelector("#previousPage");
const images = document.querySelectorAll('.image');
const usersAndTags = document.querySelectorAll('p');

let totalHits = 0;
let remainingHits = 0;
let searchWord;
let chosenColor;
let pageNumber = 1;
let url;
let response;
let json;


// Functions
function disableButton(button) {
    button.disabled = true;
}

function enableButton(button) {
    button.disabled = false;
}

function clearImages() {
    for (let i = 0; i < images.length; i++) {
        if (images[i].getAttribute('src') != '') {
            images[i].src = '';
        }
    }
}

function clearUsersAndTags() {
    for (let i = 0; i < usersAndTags.length; i++) {
        if (usersAndTags[i].textContent != '') {
            usersAndTags[i].textContent = '';
        }
    }
}

function showImages(jsonAnswer) {
    
    //const pics = document.querySelectorAll(".image");

    for (i = 0; i < jsonAnswer.length; i++) {

        let imageFromPUrl = jsonAnswer[i].webformatURL;
        let currentImg = "#image" + i;
        let pic = document.querySelector(currentImg);

       images[i].setAttribute("src", imageFromPUrl);
    }
};

function showTags(jsonAnswer) {
    const tags = document.querySelectorAll(".tag");

    for (i = 0; i < jsonAnswer.length; i++) {
        let tagFromP = jsonAnswer[i].tags;
        let currentTag = "#tag" + i;
        let t = document.querySelector(currentTag);
        tags[i].textContent = tagFromP;
    }
};

function showUser(jsonAnswer) {
    const users = document.querySelectorAll(".user");

    for (i = 0; i < jsonAnswer.length; i++) {
        let userFromP = jsonAnswer[i].user;
        let currentUser = "#user" + i;
        let user = document.querySelector(currentUser);
        users[i].textContent = "taken by: " + userFromP;
    }
};


// Events
form.onsubmit = async event => {

    event.preventDefault();

    clearImages();
    clearUsersAndTags();

    searchWord = form.word.value;
    chosenColor = form.color.value;

    url = 'https://pixabay.com/api/?key=' + apiKey + '&q=' + searchWord + '&colors=' + chosenColor + '&per_page=10&page'

    if (chosenColor === "any color") {
        url = 'https://pixabay.com/api/?key=' + apiKey + '&q=' + searchWord + '&per_page=10&page';
    }

    response = await fetch(url);
    json = await response.json();
    totalHits = json.totalHits;

    showImages(json.hits);
    showTags(json.hits);
    showUser(json.hits);

    remainingHits = totalHits;

    if (pageButtons.hidden = true) {
        pageButtons.hidden = false;
    }
    
    disableButton(previousBtn);

    if (totalHits < 11) {
        disableButton(nextBtn);
    }

    if (totalHits > 10 && (nextBtn.disabled = true)) {
        enableButton(nextBtn);
    }
}

nextBtn.onclick = async event => {
    pageNumber++

    event.preventDefault();

    url = 'https://pixabay.com/api/?key=' + apiKey + '&q=' + searchWord + '&colors=' + chosenColor + '&per_page=10&page=' + pageNumber;

    if (chosenColor === "any color") {
        url = 'https://pixabay.com/api/?key=' + apiKey + '&q=' + searchWord + '&per_page=10&page&page=' + pageNumber;
    }

    response = await fetch(url);
    json = await response.json();

    showImages(json.hits);
    showTags(json.hits);
    showUser(json.hits);

    remainingHits -= 10;

    if (pageNumber > 1) {
        enableButton(previousBtn);
    }

    if (remainingHits < 10) {
        disableButton(nextBtn);
    }
}

previousBtn.onclick = async event => {
    pageNumber--;

    event.preventDefault();

    url = 'https://pixabay.com/api/?key=' + apiKey + '&q=' + searchWord + '&colors=' + chosenColor + '&per_page=10&page=' + pageNumber;

    if (chosenColor === "any color") {
        url = 'https://pixabay.com/api/?key=' + apiKey + '&q=' + searchWord + '&per_page=10&page&page=' + pageNumber;
    }

    response = await fetch(url);
    json = await response.json();

    showImages(json.hits);
    showTags(json.hits);
    showUser(json.hits);

    remainingHits += 10;

    if (pageNumber === 1) {
        disableButton(previousBtn);
    }

    if (nextBtn.disabled = true) {
        enableButton(nextBtn);
    }
}