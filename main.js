// Find the element
let form = document.querySelector('form');
let popup = document.querySelector('#pageButtons');
let totalHits;
let searchWord;
let chosenColor;

/* function disableButton(button){
    document.querySelector(button).disabled = true;
}

function enableButton(button){
    document.querySelector(button).disabled = false;
} */

form.onsubmit = async event => {
    // Prevent the default "reload page" behavior
    event.preventDefault();

    // Get the values entered by the user
    searchWord = form.word.value;
    chosenColor = form.color.value;

    let url = 'https://pixabay.com/api/?key=33514834-460ad1b7211981a50c737ee93&q='+ chosenColor +'+'+ searchWord +' &image_type=photo&per_page=200';

    if (chosenColor === "Any color") {
        url = 'https://pixabay.com/api/?key=33514834-460ad1b7211981a50c737ee93&q='+ searchWord +' &image_type=photo&per_page=200';
    }
   
    let response = await fetch(url);
    let json = await response.json();
    totalHits = json.totalHits;

    pageButtons.hidden = false;

    /* if(totalHits < 11){
        disableButton("nextPage")
    }; */

    // Har nedanstående kod bara för att se vad som händer efter att fråga skickats via API
    console.log(json.hits[0].webformatURL);

    // Loop with picture, user and tags for 10 objects to follow beneath this line:
    
    // Clear the inputs
    /* form.word.value = '';
    form.color.value = ''; */

     // https://dev.to/satvik/how-to-fetch-images-from-and-api-5h8h - lite källa, som jag ändå fick ändra om allt efteråt.
     const pics = document.querySelectorAll(".image");

     for (i = 0; i < 10; i++) {
         
         let imageFromPUrl = json.hits[i].webformatURL;
         let imageEl = document.createElement("img");
         imageEl.setAttribute("src", imageFromPUrl); 
         let currentImg = "#image" + i;
         let pic = document.querySelector(currentImg);
         
 //flera av dessa här nedanför är helt felaktiga och meningslösa
         pics[i].setAttribute("src", imageFromPUrl); //tror att det är den här som gjorde att det till slut funkade.
        //  pics[i].currentImg = imageFromPUrl; 
        //  pics[i].append(imageEl);
        //  pic.appendChild(imageEl);
        //  pic = imageEl;
     }


     let nextBtn = document.querySelector("#nextPage");
     let previousBtn = document.querySelector("#previousPage");
     let counter = 0; 

     nextBtn.onclick = event => {
        counter++
     }

     previousBtn.onclick = event => {
        counter--; 
     }
     
     


};

//Things to be fixed and random thoughts:
//read totalHits and store in a variable
//decide how many objects that should be read from Pixabay(max 200) and stored. 
//also decided whether the 10 pictures to be displayed should be read from Pixabay 
//or from the amount stored
//read url, user and tags and store as objects in a list?!
//when nextPage-button has been clicked, enable previousPage-button and withdraw 10 from totalHits
//if totalhits < 10, disable nextPage-button

function previousPage(){

}

function nextPage(){

}