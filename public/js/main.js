// API Fetching
document.querySelector('#main-search').addEventListener('click', searchShows)

function searchShows(){
    const searchTerm = document.querySelector('#search-input').value
    console.log(searchTerm)

    fetch(`https://api.tvmaze.com/search/shows?q=${searchTerm}`)
        .then(response => response.json())
        .then(data =>{
            if (data.length <= 0) {
                // NO RESULTS
            }

            let searchResults = document.querySelector('#search-results')
            console.log(searchResults)

            while (searchResults.firstChild) {
                searchResults.removeChild(searchResults.firstChild);
            }

            for(let i=0; i<data.length; i++) {
                let showRow = document.createElement('div')
                let showYear = 'N/A'
                if (data[i].show.premiered) { showYear = data[i].show.premiered.slice(0, 4) }
                
                let showTitle = data[i].show.name
                let showLanguage = data[i].show.language
                let showId = data[i].show.id

                showRow.className = "show-result col-6 col-sm-3"
                showRow.setAttribute('id', `${data[i].show.id}`)
                let showContent = `
                    <img class="show-img" src=${data[i].show.image.medium}>
                    <div class="show-info">
                        <a href="/tracker/search/${showId}">
                            <h4 class="show-title">${showTitle}</h4>
                        </a>
                        <div class="flexed">
                            <span class="show-year flx-half">${showYear}</span>
                            <span class="show-lng flx-half">${showLanguage}</span>
                        </div>
                    </div>
                    `
                showRow.innerHTML = showContent
                searchResults.append(showRow)
            }
        });
}

// SLIDE CAROUSEL
let slideIndex =1;
showSlides (slideIndex)

//Next/Previous controls
function plusSlides (n) {
    showSlides (slideIndex += n);
}

function currentSlide (n) {
    showSlides (slideIndex = n);
}


function showSlides (n) {
    let i;
    let slides = document.getElementsByClassName("my-slides");
    if (n > slides.length) {slideIndex = 1}
    if (n < 1) {slideIndex = slides.length}
    for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
    }

    slides [slideIndex-1].style.display = "block";
}