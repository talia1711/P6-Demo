let searchForm = document.getElementById('search-form');
let title = document.getElementById('title');
let author = document.getElementById('author');

function newBook(event) {
    console.log ('new book was clicked');
    searchForm.style.display ='block';
}

function handleSubmit(event) {
    console.log ('handleSubmit');
    console.log ('title ', title.textContent);
    fetch('').then((result)=>{
        //loop on the result of books and add to the html


    }).catch( (error)=>{} );
}

function cancel(event) {
    //searchForm.style.display ='none';
}