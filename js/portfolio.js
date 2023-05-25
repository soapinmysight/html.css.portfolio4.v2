window.addEventListener('load',init)

// Function to initialize the code
function init() {
    // Call the 'getJSONdata' function with the specified API URL
    getJSONdata(`webservice/index.php`, displayCards)
}

function getJSONdata(apiUrl, successHandler)
{
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
 function displayCards(data){
    //for loop so we loop through the numbers we need to load the data in
    for (let i = 0; i < data.length+1; i++){
        // Get the element with the ID corresponding to the current index
        //(aka the number from the for loop)
        let cards = document.getElementById(`${i}`)

        //console logs for debugging purposes
        console.log(`${i}`)
        console.log(data[i].title)

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
        button.dataset.id = data[i];
        cards.appendChild(button);
    }
 }

 function ajaxErrorHandler(e){
    console.log(e)
 }