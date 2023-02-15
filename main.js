// Find the element
let form = document.querySelector('form');
let apiKey = '33514834-460ad1b7211981a50c737ee93';
let remainingHits = 0;
let searchWord;
let chosenColor;
let pageNumber = 1;
let url;
let response;
let json;

form.onsubmit = async event => {
    // Prevent the default "reload page" behavior
    event.preventDefault(); 
    
    // Get the values entered by the user
    searchWord = form.word.value;
    chosenColor = form.color.value;

    //let url = 'https://pixabay.com/api/?key=33514834-460ad1b7211981a50c737ee93&q='+ chosenColor +'+'+ searchWord +' &image_type=photo&per_page=200';

    url = 'https://pixabay.com/api/?key=' + apiKey + '&q=' + searchWord + '&colors=' + chosenColor + '&image_type=photo&per_page=10&page'

    if (chosenColor === "any color") {
        url = 'https://pixabay.com/api/?key=' + apiKey + '&q=' + searchWord + '&image_type=photo&per_page=10&page';
    }

    response = await fetch(url);
    json = await response.json();
    remainingHits = json.totalHits;

    pageButtons.hidden = false;

    /* if(totalHits < 11){
        disableButton("nextPage")
    }; */

    // Har nedanstående kod bara för att se vad som händer efter att fråga skickats via API
    console.log(json.hits[0].tags);

    // Clear the inputs
    form.word.value = '';
    form.color.value = 'any color';

    showImages(json.hits);
    showTags(json.hits);
    showUser(json.hits);

    if(remainingHits <= 10){
        disableButton(nextBtn);
    }
}

/* function clearElement(element){
    element.replaceChildren();
} */

function showImages(jsonAnswer) {

    // https://dev.to/satvik/how-to-fetch-images-from-and-api-5h8h - lite källa, som jag ändå fick ändra om allt efteråt.
    const pics = document.querySelectorAll(".image");

    for (i = 0; i < jsonAnswer.length; i++) {

        let imageFromPUrl = jsonAnswer[i].webformatURL;
        //  let imageEl = document.createElement("img"); //ev ta bort
        //  imageEl.setAttribute("src", imageFromPUrl);  //ev tabort
        let currentImg = "#image" + i;
        let pic = document.querySelector(currentImg);

        pics[i].setAttribute("src", imageFromPUrl); //tror att det är den här som gjorde att det till slut funkade.
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
        //users[i].setAttribute("src", userFromP);
        users[i].textContent = "taken by: " + userFromP;
       
};

function disableButton(button){
    button.disabled = true;
}

function enableButton(button){
    button.disabled = false;
}

let nextBtn = document.querySelector("#nextPage");
let previousBtn = document.querySelector("#previousPage");

nextBtn.onclick = async event => {
    pageNumber++

    // Prevent the default "reload page" behavior
    event.preventDefault();

    url = 'https://pixabay.com/api/?key=' + apiKey + '&q=' + searchWord + '&colors=' + chosenColor 
    + '&image_type=photo&per_page=10&page=' + pageNumber;

    if (chosenColor === "any color") {
        url = 'https://pixabay.com/api/?key=' + apiKey + '&q=' + searchWord 
        + '&image_type=photo&per_page=10&page&page=' + pageNumber;
    }

    response = await fetch(url);
    json = await response.json();
    totalHits = json.totalHits;

    showImages(json.hits);
    showTags(json.hits);
    showUser(json.hits);

    remainingHits-=10;
    
    if(pageNumber > 1){
        enableButton(previousBtn);
    }
    
    if(remainingHits < 10){
        disableButton(nextBtn);
    }
}

previousBtn.onclick = async event => {
    pageNumber--;

    // Prevent the default "reload page" behavior
    event.preventDefault();

    url = 'https://pixabay.com/api/?key=' + apiKey + '&q=' + searchWord + '&colors=' + chosenColor 
    + '&image_type=photo&per_page=10&page=' + pageNumber;

    if (chosenColor === "any color") {
        url = 'https://pixabay.com/api/?key=' + apiKey + '&q=' + searchWord 
        + '&image_type=photo&per_page=10&page&page=' + pageNumber;
    }

    response = await fetch(url);
    json = await response.json();
    totalHits = json.totalHits;

    showImages(json.hits);
    showTags(json.hits);
    showUser(json.hits);
    
    remainingHits+=10;

    if(pageNumber === 1){
        disableButton(previousBtn);
    }
}
}