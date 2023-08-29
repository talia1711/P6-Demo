let searchForm = document.getElementById('search-form');
let title = document.getElementById('title');
let author = document.getElementById('author');

function newBook(event) {
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
    window.location.replace("index.html");
}


let listBookmarks =  document.getElementById('list-bookmarks');
let favs = JSON.parse(sessionStorage.getItem("bookmark")) || [];
const placeHolderImage = 'unavailable.png';
for(bookFav of favs){
    var bookElementDiv = document.createElement("div");
    bookElementDiv.className = 'book-card';
    bookElementDiv.setAttribute('id',bookFav.id);
    bookElementDiv.innerHTML = `<div class = "bookmark added">  
                                <i class="fa fa-bookmark" onclick="removeBookmark(event)"></i>
                                </div>       
                                <p><b>Title:</b> ${bookFav.title}</p>
                                <p><b>Id:</b> ${bookFav.id}</p>
                                <p><b>Author:</b> ${bookFav.author}</p>
                                <p>
                                <b>Description:</b>: ${bookFav.description}
                                </p>
                                <img src="${bookFav?.image??placeHolderImage}" width="200px" height="200px" alt="" />`;
    listBookmarks.appendChild (bookElementDiv);
    console.log('ádding to page');
}


function removeBookmark(event){
    console.log('the button was clicked', event);
    let bookCardElement = event.target.closest('.book-card');

    //book metadata
    let id = bookCardElement.getAttribute('id');

    console.log('bookCardElement', event.target.closest('.book-card'));
    
    //session storage
    let favs = JSON.parse(sessionStorage.getItem("bookmark"))|| [];

    console.log('favs: ', favs);
    //check if that is already on the storage, if yes, remove it, make the icon green, if not, add it and make the icon red
    let bookIndex;
    let book = favs.find((element)=>element.id==id);
    console.log('book: ', book);
    console.log('bookIndex: ', bookIndex);
    if(book) {
        favs.filter((element, index)=>{ bookIndex=index; return element.id==id;});
        console.log('book is available on ss');
        favs.splice(bookIndex, 1);
        event.target.parentElement.className = 'bookmark';
        //remove the whole book from the UI bookCardElement
        bookCardElement.remove();
    }

    sessionStorage.setItem('bookmark', JSON.stringify(favs));
}