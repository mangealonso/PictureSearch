// Find the element
let form = document.querySelector('form');


form.onsubmit = async event => {
    // Prevent the default "reload page" behavior
    event.preventDefault();

    // Get the values entered by the user
    let searchWord = form.word.value;
    let chosenColor = form.color.value;

    let url = 'https://pixabay.com/api/';
    let response = await fetch(url);
    let json = await response.json();
    
    // Clear the inputs
    form.word.value = '';
    form.color.value = '';
};



function previousPage(){

}

function nextPage(){

}