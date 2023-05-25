window.addEventListener('load',init)

function init() {
    getJSONdata(`webservice/index.php`, displayCards)
}

function getJSONdata(apiUrl, successHandler)
{
    fetch(apiUrl)
        .then((response) => {
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            return response.json();
        })
        .then(successHandler)
        .catch(ajaxErrorHandler);
}

 function displayCards(data){
    for (let i = 1; i < data.length+1; i++){
        let cards = document.getElementById(`${i}`)
        console.log(`${i}`)

        let title = document.createElement("h3")
        title.innerHTML = data[i].title
        cards.appendChild(title)
    }
 }

 function ajaxErrorHandler(e){
    console.log(e)
 }