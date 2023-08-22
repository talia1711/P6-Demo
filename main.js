let searchForm = document.getElementById('search-form');
let title = document.getElementById('title');
let author = document.getElementById('author');

function newBook(event) {
    //searchForm.style.display ='block';
    window.location.replace("search.html");
}




function handleSubmit(event) {
    console.log ('handleSubmit');
    console.log ('title ', title.textContent);
    fetch('https://www.googleapis.com/books/v1/volumes?q=inauthor:talia&intitle=star+wars&key=AIzaSyAtMwLNihpdJaRUGogPtWvTk9v_fxomd9E').then((result)=>{
        //loop on the result of books and add to the html
        console.log('result', result);


    }).catch( (error)=>{} );
}

function cancel(event) {
    //searchForm.style.display ='none';
}