window.addEventListener('load', init)

//Global variables
let portfolio;
let card;
let detailDialog;
let detailContent;
let favItems = [];

// Function to initialize the code
function init() {
    // Retrieve the portfolio element and add a click event listener
    portfolio = document.getElementById('projects');
    portfolio.addEventListener('click', portfolioClickHandler);

    // Call the 'getJSONdata' function with the specified API URL
    getJSONdata(`webservice/index.php`, displayCards)

    detailDialog = document.getElementById('description');
    detailContent = detailDialog.querySelector('.modal-content');
    detailDialog.addEventListener('click', detailModalClickHandler);
    detailDialog.addEventListener('close', dialogCloseHandler);
}

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

// Function to display the cards using the retrieved data
function displayCards(data) {
    //for loop to we loop through the numbers we need to load the data in
    for (let i = 0; i < data.length; i++) {
        // Get the element with the ID corresponding to the current index
        //(aka the number from the for loop)
        let cards = document.getElementById(`${i}`)

        // Create an 'h3' element for the title
        let title = document.createElement("h3")
        // Set the inner HTML of the title element (which we just created)
        // to the title value from the data
        title.innerHTML = data[i].title
        // Append the title element to the 'cards' element
        cards.appendChild(title)

        //next piece of code creates a detail button for each part so we can show the description of each part
        //create a new HTML button element and assigns it to the variable button
        let button = document.createElement('button');
        // Set the inner HTML of the button element (which we just created)
        button.innerHTML = 'Show Details';
        //geef id mee bij het klikken op de button
        button.dataset.id = data[i].id;
        cards.appendChild(button);

        //next piece of code creates a detail button for each part so we can Add Favorite
        //create a new HTML button element and assigns it to the variable button
        let buttonFav = document.createElement('button');
        // Set the inner HTML of the button element (which we just created)
        buttonFav.innerHTML = 'Add Favorite';
        //geef id mee bij het klikken op de button
        buttonFav.dataset.id = data[i].id;
        buttonFav.id = `fav-button${i}`;
        cards.appendChild(buttonFav);
    }
    let favoriteItemString = localStorage.getItem('favItems')
    if (favoriteItemString !== null){
        favItems = JSON.parse(favoriteItemString)
        for (let favoriteItem of favItems){
            addFavorite(favoriteItem)
        }
    }
}

//This function will handle click events
function portfolioClickHandler(e) {
//This line assigns the target of the event (e.target) to the variable clickedItem.
// The target represents the element that triggered the event, in this case, the element that was clicked
    let clickedItem = e.target;
//This line checks if the nodeName property of the clickedItem is not equal to the string 'BUTTON'.
//The nodeName property represents the name of the node (HTML element) in uppercase.
//If the clicked element is not a button, the code immediately returns, exiting the function.
//This is a check to ensure that the click event was specifically triggered by a button element.
    if (clickedItem.nodeName !== 'BUTTON') {
        return;
    }
    //assigning id to the variable card
    card = clickedItem.dataset.id;
    //
    if (clickedItem.innerHTML === 'Show Details') {
    getJSONdata(`webservice/index.php?id=${card}`, displayDetail)
    }
    //
    else if  (clickedItem.innerHTML === 'Add Favorite'){
        addFavorite(card)
        addItemLocalStorage(card)
    }
    else if (clickedItem.innerHTML === 'Remove Favorite'){
        removeFavorite(card)
        removeItemLocalStorage(card)
    }


}

function displayDetail(data) {
    console.log(data)
    detailContent.innerHTML = '';
        // Get the element with the ID corresponding to the current index
        //(aka the number from the for loop)
        let cards = document.getElementById(`${card}`)

        // Create an 'h3' element for the title
        let title = document.createElement("h3")
        // Set the inner HTML of the title element (which we just created)
        // to the title value from the data
        title.innerHTML = data.title;
        // Append the title element to the 'cards' element
    detailContent.appendChild(title)

        //show the detail description
        let description = document.createElement('p')
        description.innerHTML = data.description;
    detailContent.appendChild(description);

        //create close button
        let button = document.createElement('button');
        // Set the inner HTML of the button element (which we just created)
        button.innerHTML = 'close';
    detailContent.appendChild(button);

        // Open the modal (detail dialog)
        detailDialog.showModal();

        // Add the 'dialog-open' class to the gallery element to apply a blur effect
        portfolio.classList.add('dialog-open');
    }

/**
 * Close the modal if clicked on the close button or outside the modal (on the backdrop)
 *
 * @param e
 */
function detailModalClickHandler(e)
{
    if (e.target.nodeName === 'DIALOG' || e.target.nodeName === 'BUTTON') {
        detailDialog.close();
    }
}

/**
 * Close the underlying blur effect when dialog is closed (both on our own click or the native ESC key)
 *
 * @param e
 */
//TODO remove this or use this
function dialogCloseHandler(e)
{
    portfolio.classList.remove('dialog-open');
}

//function for changing colors
function addFavorite(card){
    let buttonFav = document.getElementById(`fav-button${card}`)
    buttonFav.innerHTML = 'Remove Favorite'
}
function addItemLocalStorage(card){
    console.log(card)
    favItems.push(card)
    localStorage.setItem("favItems", JSON.stringify(favItems))
    console.log(localStorage.getItem("favItems"))
}

function removeFavorite(card){
    let buttonFav = document.getElementById(`fav-button${card}`)
    buttonFav.innerHTML = 'Add Favorite'
}
function removeItemLocalStorage(card){
    let itemPosition = favItems.indexOf(card)
    favItems.splice(itemPosition, 1)
    localStorage.setItem("favItems", JSON.stringify(favItems))
}


    function ajaxErrorHandler(e) {
        console.log(e)
    }