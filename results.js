function returnToHome(event) {
    //searchForm.style.display ='block';
    window.location.replace("index.html");
}

const placeHolderImage = 'unavailable.png';



console.log('úrl', window.location.search);
let listResults =  document.getElementById('list-results');
const url = new URL(
    window.location.href,
  );

const params = new URLSearchParams(window.location.search);
console.log(params); // Logs "?q=123"
console.log(params.get('title')); // Logs "?q=123"
console.log(params.get('author')); // Logs "?q=123"

function addRemoveBookmark(event){
    console.log('the button was clicked', event);
    let bookCardElement = event.target.closest('.book-card');

    //book metadata
    let id = bookCardElement.getAttribute('id');
    let title = bookCardElement.getAttribute('title');
    let description = bookCardElement.getAttribute('description');
    let image = bookCardElement.getAttribute('image');
    let author = bookCardElement.getAttribute('author');

    console.log('bookCardElement', event.target.closest('.book-card'));
    
    //session storage
    let favs = JSON.parse(sessionStorage.getItem("bookmark"))|| [];




    console.log('favs: ', favs);
    //check if that is already on the storage, if yes, remove it, make the icon green, if not, add it and make the icon red
    let bookIndex;
    let book = favs.find((element)=>element.id==id);
    console.log('book: ', book);
    if(book) {
        favs.filter((element, index)=>{ bookIndex=index; return element.id==id;});
        console.log('book is available on ss');
        favs.splice(bookIndex,1);
        event.target.parentElement.className = 'bookmark';
    }else {
    console.log('book is ! available on ss');
       favs.push({
            id, title, description, image, author
        });
        console.log('favs after add: ', favs);
        event.target.parentElement.className = 'bookmark added'; 
    }

    sessionStorage.setItem('bookmark', JSON.stringify(favs));
    
}

fetch(`https://www.googleapis.com/books/v1/volumes?q=inauthor:${params.get('title')}&intitle=${params.get('author')}`)
    .then((result)=>{
    //loop on the result of books and add to the html
    console.log('result', result);
        return result.json();

}).then((data)=>{
    console.log('data', data.items);
    for (let item of data.items){
       
        //session storage
        let favs = JSON.parse(sessionStorage.getItem("bookmark")) || [];
        //check if that is already on the storage, if yes, remove it, make the icon green, if not, add it and make the icon red
        let book = favs.find((element)=>element.id==item.id);
        let classBookmarkIcon = book? 'bookmark added' : 'bookmark'; 

        var bookElementDiv = document.createElement("div");
        bookElementDiv.className = 'book-card';
        bookElementDiv.setAttribute('id',item.id);
        bookElementDiv.setAttribute('title',item.volumeInfo.title);
        bookElementDiv.setAttribute('description',item.volumeInfo.description?.substring(0,50));
        bookElementDiv.setAttribute('image',item.volumeInfo?.imageLinks?.thumbnail);
        bookElementDiv.setAttribute('author',item.volumeInfo.authors);
        bookElementDiv.innerHTML = `<div class = "${classBookmarkIcon}">  
                                        <i class="fa fa-bookmark" onclick="addRemoveBookmark(event)"></i>
                                    </div>       
                                    <p><b>Title:</b> ${item.volumeInfo.title}</p>
                                    <p><b>Id:</b> ${item.id}</p>
                                    <p><b>Author:</b> ${item.volumeInfo.authors}</p>
                                    <p>
                                    <b>Description:</b>: ${item.volumeInfo.description?.substring(0,50)}
                                    </p>
                                    <img src="${item.volumeInfo?.imageLinks?.thumbnail??placeHolderImage}" width="200px" height="200px" alt="" />`;

        listResults.appendChild (bookElementDiv);
        console.log (item.volumeInfo.title);        
        console.log (item.volumeInfo.authors);        

    }
   
}).catch( (error)=>{
    console.error(error);
} );

