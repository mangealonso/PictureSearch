// Find the element
let form = document.querySelector('form');


form.onsubmit = async event => {
    // Prevent the default "reload page" behavior
    event.preventDefault();

    // Get the values entered by the user
    let searchWord = form.word.value;
    let chosenColor = form.color.value;

    let url = 'https://pixabay.com/api/?key=33514834-460ad1b7211981a50c737ee93&q='+ chosenColor +'+'+ searchWord +' &image_type=photo&per_page=200';
    let response = await fetch(url);
    let json = await response.json();

    console.log(json);
    
    // Clear the inputs
    /* form.word.value = '';
    form.color.value = ''; */
};



function previousPage(){

}

function nextPage(){

}

//read totalHits and store in a variable
//decide how many objects that should be read from Pixabay(max 200) and whether the 10 pictures 
//to be displayed should be read from Pixabay or from the amount stored
//read url, user and tags and store as objects in a list?!
//show 10 pictures
//when nextPage-button has been clicked, enable previousPage-button and withdraw 10 from totalHits
//if totalhits < 10, disable nextPage-button