//commented numbers (1-9) are for school presentation

// Adding event listener to execute the 'init' function when the window loads
window.addEventListener('load', init)

//Global variables
let portfolio;
let card;
let descriptionDialog;
let descriptionCard;
let favItems = [];

// Function to initialize the code
function init() {
    // Retrieve the portfolio element and add a click event listener
    portfolio = document.getElementById('projects');
    portfolio.addEventListener('click', portfolioClickHandler);

    //11
    // Call the 'getJSONdata' function with the specified API URL
    getJSONdata(`webservice/index.php`, displayCards)

    // Getting the description dialog element and adding click and close event listeners to it
    descriptionDialog = document.getElementById('description');
    descriptionCard = descriptionDialog.querySelector('.modal-content');
    descriptionDialog.addEventListener('click', descriptionModalClickHandler);
    descriptionDialog.addEventListener('close', dialogCloseHandler);
}

//11
// Function to fetch JSON data from an API
function getJSONdata(apiUrl, successHandler) {
    // Fetch data from the API URL
    fetch(apiUrl)
        .then((response) => {
            // Check if the response is not okay (aka not successful)
            if (!response.ok) {
                // if not okay, throw an error
                throw new Error(response.statusText);
            }
            // Parse the response as JSON and return the result
            return response.json();
        })
        .then(successHandler)
        .catch(ajaxErrorHandler);
}

//11
// Function to display the cards using the retrieved data
function displayCards(data) {
    //for loop to we loop through the numbers we need to load the data in
    for (let i = 0; i < data.length; i++) {
        // Get the element with the ID corresponding to the current index
        //(aka the number from the for loop)
        let cards = document.getElementById(`${i}`)

        //title:
        // Create an 'h3' element for the title
        let title = document.createElement("h3")
        // Set the inner HTML of the title element (which we just created)
        // to the title value from the data
        title.innerHTML = data[i].title
        // Append the title element to the 'cards' element
        cards.appendChild(title)

        //description button:
        //for each card, so we can show the description of each card
        //create a new HTML button element and assigns it to the variable button
        let button = document.createElement('button');
        // Set the inner HTML of the button element (which we just created)
        button.innerHTML = 'Show Description';
        //geef id mee bij het klikken op de button
        button.dataset.id = data[i].id;
        cards.appendChild(button);

        //favourite button:
        //create a new HTML button element and assigns it to the variable button
        let buttonFav = document.createElement('button');
        // Set the inner HTML of the button element (which we just created)
        buttonFav.innerHTML = 'Add Favorite';
        //geef id mee bij het klikken op de button
        buttonFav.dataset.id = data[i].id;
        buttonFav.id = `fav-button${i}`;
        cards.appendChild(buttonFav);
    }
    //55
    // Checking if there are any favorite items stored in local storage
    // and adding them to the favItems array
    // Retrieve the favorite items stored in local storage
    let favoriteItemString = localStorage.getItem('favItems')
    // Check if favoriteItemString is not null (if favorite items are stored)
    //deze statement is nodig zodat de website geen error geeft als we hem voor het eerst bezoeken
    if (favoriteItemString !== null){
        // Parse the favoriteItemString JSON string into a JavaScript object
        favItems = JSON.parse(favoriteItemString)
        // Iterate over each favorite item in the favItems array
        for (let favoriteItem of favItems){
            // Call the addFavorite() function with the current favorite items
            addFavorite(favoriteItem)
        }
    }
}

//33
//This function will handle click events
function portfolioClickHandler(e) {
//This line assigns the target of the event (e.target) to the variable clickedItem.
// The target represents the element that triggered the event, in this case, the element that was clicked
    let clickedItem = e.target;
//This line checks if the nodeName property of the clickedItem is not equal to the string 'BUTTON'.
    if (clickedItem.nodeName !== 'BUTTON') {
        //If the clicked element is not a button, the code immediately returns (exits the function)
        //this check is to see if what we clicked on was a button (and not something else)
        return;
    }
    //assigning id to the variable card
    card = clickedItem.dataset.id;
    //if statement so we call the right action for the right button
    if (clickedItem.innerHTML === 'Show Description') {
        // Fetching description data for a specific card and calling the 'displayDetail' function as a success handler
        getJSONdata(`webservice/index.php?id=${card}`, displayDescription)
    }
    //if statement so we call the right action for the right button
    else if  (clickedItem.innerHTML === 'Add Favorite'){
        addFavorite(card)
        addItemLocalStorage(card)
    }
    //if statement so we call the right action for the right button
    else if (clickedItem.innerHTML === 'Remove Favorite'){
        removeFavorite(card)
        removeItemLocalStorage(card)
    }


}

// Function to display the description of a card
function displayDescription(data) {
    console.log(data)
    descriptionCard.innerHTML = '';
        // Get the element with the ID corresponding to the current index
        //(aka the number from the for loop)
        let cards = document.getElementById(`${card}`)

        //88
        // Create an 'h3' element for the title
        let title = document.createElement("h3")
        // Set the inner HTML of the title element (which we just created)
        // to the title value from the data
        title.innerHTML = data.title;
        // Append the title element to the 'cards' element
        descriptionCard.appendChild(title)

        //88
        //show the description
        // Create an 'p' element for the description
        let description = document.createElement('p')
        // Set the inner HTML of the title element (which we just created)
        // to the description value from the data
        description.innerHTML = data.description;
        // Append the description element to the 'descriptionCard' element
        descriptionCard.appendChild(description);

        //44
        //create close button
        let button = document.createElement('button');
        // Set the inner HTML of the button element (which we just created)
        button.innerHTML = 'close';
        // Append the button element to the 'descriptionCard' element
        descriptionCard.appendChild(button);

        // Open the modal (Description dialog)
        descriptionDialog.showModal();
    }

// Event handler to close description modal click events when clicked on button or backdrop
function descriptionModalClickHandler(e)
{
    if (e.target.nodeName === 'DIALOG' || e.target.nodeName === 'BUTTON') {
        descriptionDialog.close();
    }
}
//55
// Function to mark a card as favorite by changing the text on the button
function addFavorite(card){
    // Get the button element associated with the card
    let buttonFav = document.getElementById(`fav-button${card}`)
    // Change the button text to 'Remove Favorite'
    buttonFav.innerHTML = 'Remove Favorite'
}
//55
// Function to add an item to local storage
function addItemLocalStorage(card){
    console.log(card)
    // Add (push) the card to the favItems array
    favItems.push(card)
    // Convert the favItems array to a JSON string and store it in local storage
    localStorage.setItem("favItems", JSON.stringify(favItems))
    console.log(localStorage.getItem("favItems"))
}

//66
// Function to remove a card from favorites
function removeFavorite(card){
    // Get the button element associated with the card
    let buttonFav = document.getElementById(`fav-button${card}`)
    // Change the button text (back) to 'Add Favorite'
    buttonFav.innerHTML = 'Add Favorite'
}
//66
// Function to remove an item from local storage
function removeItemLocalStorage(card){
    // Find the index of the card in the favItems array
    let itemPosition = favItems.indexOf(card)
    // Remove the card from the favItems array
    favItems.splice(itemPosition, 1)
    // Convert the updated favItems array to a JSON string and store it in local storage
    localStorage.setItem("favItems", JSON.stringify(favItems))
}

// Function to handle AJAX errors
function ajaxErrorHandler(e) {
    console.log(e)
}