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
                
            }

            let searchResults = document.querySelector('#search-results')
            console.log(searchResults)
            for(let i=0; i<data.length; i++) {
                console.log(data[i].show)
                let showRow = document.createElement('div')
                let showRating = data[i].show.rating.average
                let showTitle = data[i].show.name
                let showGenres = data[i].show.genres
                let showContent = `
                    <div class="showResult">
                        <img class="show-img" src=${data[i].show.image.medium}>
                        <div class="show-info">
                            <a href="">
                                <h4 class="show-title">${data[i].show.name}</h4>
                            </a>
                            <span class="show-rating">${data[i].show.rating.average}</span>
                             <span class="show-genre">${data[i].show.summarry}</span>
                        </div>
                    </div>
                    `
                showRow.innerHTML = showContent
                searchResults.append(showRow)
            }
        });
}

