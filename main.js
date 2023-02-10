// Find the element
let form = document.querySelector('form');


form.onsubmit = async event => {
    // Prevent the default "reload page" behavior
    event.preventDefault();

    // Get the values entered by the user
    let searchWord = form.word.value;
    let chosenColor = form.color.value;

    let url = 'https://pixabay.com/api/?key=33514834-460ad1b7211981a50c737ee93&q='+ chosenColor +'+'+ searchWord +' &image_type=photo';
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