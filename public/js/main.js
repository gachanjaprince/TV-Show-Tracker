const deleteBtn = document.querySelectorAll('.del')
const todoItem = document.querySelectorAll('span.not')
const todoComplete = document.querySelectorAll('span.completed')

Array.from(deleteBtn).forEach((el)=>{
    el.addEventListener('click', deleteTodo)
})

Array.from(todoItem).forEach((el)=>{
    el.addEventListener('click', markComplete)
})

Array.from(todoComplete).forEach((el)=>{
    el.addEventListener('click', markIncomplete)
})

async function deleteTodo(){
    const todoId = this.parentNode.dataset.id
    try{
        const response = await fetch('todos/deleteTodo', {
            method: 'delete',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'todoIdFromJSFile': todoId
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}

async function markComplete(){
    const todoId = this.parentNode.dataset.id
    try{
        const response = await fetch('todos/markComplete', {
            method: 'put',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'todoIdFromJSFile': todoId
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}

async function markIncomplete(){
    const todoId = this.parentNode.dataset.id
    try{
        const response = await fetch('todos/markIncomplete', {
            method: 'put',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'todoIdFromJSFile': todoId
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}

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
                        <a href="tracker/search/${showId}">
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