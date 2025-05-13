//If the "X" icon is clicked, we set the "Search" element search bar to null
document.getElementById("X").addEventListener("click",function(){document.getElementById("search").value = ""})
//If either enter or searc icon is clocked search is initiated
document.getElementById("search").addEventListener("keypress",function(event){
    if(event.key=="Enter")
    {
        event.preventDefault();
        search()
    }
})
document.getElementById("glass").addEventListener("click",function(){search()})
//Function to check whether artist details and results panel are populated
//Required gif posisitioning and clearing of elements specified
function check()
{
    if (document.getElementById('artist_details').innerHTML === '' && document.getElementById('result').innerHTML === '')
    {
        document.getElementById("Gif").innerHTML='<img src="/static/images/images/loading.gif">';
    }
    else if (document.getElementById('artist_details').innerHTML !== '') 
        {
            document.getElementById('artist_details').innerHTML = '';
            document.getElementById("secondGif").innerHTML='<img src="/static/images/images/loading.gif">';
        }
    else{
        document.getElementById("secondGif").innerHTML='<img src="/static/images/images/loading.gif">';
    }
        

}


// Search function to pass the string to be searched to the back end
function search()
{
    check();
    // Clearing 'No Results Found block if any
    document.getElementById('noResults').innerHTML = '';
    const str= (document.getElementById("search").value).trim();
    //Checking if the string searched is null and if so triggering the validation message
    if (str === "") {
        document.getElementById('validation').click();
        document.getElementById("Gif").innerHTML='';
        document.getElementById("secondGif").innerHTML='';
        return; 
    }
    
    // Opening new request and sending the string to back end
    var xhr = new XMLHttpRequest();
    xhr.open('GET', '/search?name=' + encodeURIComponent(str), true);
    xhr.onload = function(){
        if (xhr.status === 200) {
            const response = JSON.parse(xhr.responseText);
            // Creating "No results found" block if nothing was returned from Artsy
            if (response.length === 0) {
                document.getElementById('noResults').innerHTML = '<div class="no-results">No results found.</div>';
            }
            // If there is a result, building the cards to display the results
            result = '';
            response.forEach(function(artist) {
                result += `
                <div class="card" artist-id="${artist.id}">
                    <div>
                        <img src="${artist.image}" alt="${artist.id}" />
                        <p>${artist.name}</p>
                    </div>
                </div>
                `;
            });
            // Displaying results and removing the Gifs
            document.getElementById('result').innerHTML = result;
            document.getElementById("Gif").innerHTML='';
            document.getElementById("secondGif").innerHTML='';
            // Setting the event Listener for the cards and setting the active card.
            cards = document.querySelectorAll('.card');
            for (let i = 0; i < cards.length; i++) {
                cards[i].addEventListener('click', function () {
                    cards.forEach(function (card) {card.classList.remove('active');});
                    cards[i].classList.add('active');
                    const artistId = cards[i].getAttribute('artist-id');
                    artistdetails(artistId);});
                };
        } else{
            document.getElementById('noResults').innerHTML = '<div style="height: 20px;"></div><div class="no-results">No results found</div>';
            document.getElementById("Gif").innerHTML='';
            document.getElementById("secondGif").innerHTML='';
            document.getElementById('artist_details').innerHTML = '';
            document.getElementById('result').innerHTML = '';
        }};
        xhr.send();
 } 
// Function to get the artist details on clicking the cards
 function artistdetails(artistId)
 {
    document.getElementById('artist_details').innerHTML = '';
    document.getElementById('secondGif').innerHTML = '<img src="/static/images/images/loading.gif">';
    var xhr = new XMLHttpRequest();
    xhr.open('GET', '/artists/' + artistId, true);
    xhr.onload = function () {
        if (xhr.status === 200) {
            const response = JSON.parse(xhr.responseText);
            // Building the results according to the specification
            document.getElementById('artist_details').innerHTML = `
                    <h2 id="Name">${response.name}  (${response.birthday} - ${response.deathday})</h2>
                <p id="nationality">${response.nationality}</p>
                <p id="biography">${response.biography}</p>
                `;
        } else {
            console.log('Error fetching artist details');
        }

        // Hide the loading indicator after the request completes
        document.getElementById('secondGif').innerHTML = '';
    };
    xhr.send();
}


 