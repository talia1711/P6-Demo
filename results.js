function returnToHome(event) {
    //searchForm.style.display ='block';
    window.location.replace("index.html");
}



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
    let parent = event.target.closest('.book-card');
    let id = parent.getAttribute('id');
    let title = parent.getAttribute('title');
    let description = parent.getAttribute('description');
    let image = parent.getAttribute('image');
    let author = parent.getAttribute('author');
    console.log('parents', event.target.closest('.book-card'));
    let favs = sessionStorage.getItem("bookmark") || [];
    favs.add({
        id, title, description, image, author
    });
    favs.setItem('bookmark', favs);
}

fetch(`https://www.googleapis.com/books/v1/volumes?q=inauthor:${params.get('title')}&intitle=${params.get('author')}&key=AIzaSyAtMwLNihpdJaRUGogPtWvTk9v_fxomd9E`)
    .then((result)=>{
    //loop on the result of books and add to the html
    console.log('result', result);
        return result.json();

}).then((data)=>{
    console.log('data', data.items);
    for (let item of data.items){
        var bookElementDiv = document.createElement("div");
        bookElementDiv.className = 'book-card';
        bookElementDiv.setAttribute('id',item.id);
        bookElementDiv.setAttribute('title',item.volumeInfo.title);
        bookElementDiv.setAttribute('description',item.volumeInfo.description?.substring(0,50));
        bookElementDiv.setAttribute('image',item.volumeInfo?.imageLinks?.thumbnail);
        bookElementDiv.setAttribute('author',item.volumeInfo.authors);
        bookElementDiv.innerHTML = `<div class = "bookmark">  
                                        <i class="fa fa-bookmark" onclick="addRemoveBookmark(event)"></i>
                                    </div>       
                                    <p><b>Title:</b> ${item.volumeInfo.title}</p>
                                    <p><b>Id:</b> ${item.id}</p>
                                    <p><b>Author:</b> ${item.volumeInfo.authors}</p>
                                    <p>
                                    <b>Description:</b>: ${item.volumeInfo.description?.substring(0,50)}
                                    </p>
                                    <img src="${item.volumeInfo?.imageLinks?.thumbnail}" width="200px" height="200px" alt="" />`;

        listResults.appendChild (bookElementDiv);
        console.log (item.volumeInfo.title);        
        console.log (item.volumeInfo.authors);        

    }
   
}).catch( (error)=>{
    console.error(error);
} );

