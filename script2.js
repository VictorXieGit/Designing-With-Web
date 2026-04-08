/* ================================================================
    script.js — Victor's Little Spectacle
    ================================================================
    This file handles fetching the shows from the JSON dataset and 
    displaying them dynamically on the page.
*/

document.addEventListener('DOMContentLoaded', () => {
    
    const showsContainer = document.getElementById('shows-container');
    const jsonUrl = 'https://makerslab.em-lyon.com/dww/data/shows.json';

    /* I didn't know how to get the data from the URL, so I asked the AI.
       Prompt: "How do I get data from a json url in javascript and use it in my html?"
       → The AI told me to use fetch() and .then() to get the response.
    */
    fetch(jsonUrl)
        .then(response => response.json())
        .then(data => {
            
            /*
               When I looked at the JSON, the structure was complicated. 
               The shows were separated into different categories (musicals, comedies, plays) 
               instead of being in one simple list.
               
               Prompt: "My json has a 'categories' list and then objects for each category. 
               How do I put all the shows in one single list to make my cards?"
               → The AI gave me this code to loop through the categories and merge 
               everything into an 'allShows' array.
            */
            let allShows = [];
            
            if (data.categories) {
                data.categories.forEach(categoryName => {
                    const showsInCategory = data[categoryName];
                    
                    if (showsInCategory) {
                        showsInCategory.forEach(show => {
                            // I keep the category name to display it on the card later
                            show.category = categoryName; 
                            allShows.push(show); 
                        });
                    }
                });
            }

            /* Now that I have a simple list of all shows, I can loop through it 
               to create the cards, just like I did manually in HTML.
            */
            allShows.forEach(show => {

                /*
                   I copy-pasted my HTML card structure here.
                   I replaced the static text with the variables from the JSON using ${...}
                */
                const cardHTML = `
                <article class="card">
                    <div class="card-image">
                        <img src="${show.image}" alt="Image of ${show.title}">
                        <button class="card-favorite" aria-label="Add to favorites">
                            <i data-lucide="heart"></i>
                        </button>
                    </div>
                    <div class="card-body">
                        <div class="card-info">
                            <h3 class="card-title">${show.title}</h3>
                            <p class="card-meta">Category : ${show.category}</p>
                            <p class="card-meta">Theater : ${show.location}</p>
                            <p class="card-dates">From ${show.dates.from} to ${show.dates.to}</p>
                            <p class="card-desc">
                                ${show.description}
                            </p>
                        </div>
                        <div class="card-footer">
                            <span class="card-price">$ ${show.price}</span>
                            <span class="card-tickets">(${show.tickets_remaining} tickets remaining)</span>
                        </div>
                    </div>
                </article>
                `;

                // Add the new card to the container
                showsContainer.innerHTML += cardHTML;
            });

            /* My heart icons were not showing up on the new cards!
               Prompt: "I generate HTML with javascript but my lucide icons don't appear anymore."
               → The AI told me I have to call lucide.createIcons() AGAIN after adding the HTML, 
               otherwise the library doesn't see the new <i> tags.
            */
            lucide.createIcons();
        })
        .catch(error => {
            // Just a simple error message in the console if the link is broken
            console.log("Error loading the JSON", error);
        });
});