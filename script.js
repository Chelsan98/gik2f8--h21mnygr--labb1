'use strict';

let bookList = [];

window.addEventListener('load', () => {
  getAll().then((apiBooks) => (bookList = apiBooks));
});

searchField.addEventListener('keyup', (e) =>
  renderBookList(
    bookList.filter(({ title, author }) => {
      const searchTerm = e.target.value.toLowerCase();
      return (
        title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        author.toLowerCase().includes(searchTerm.toLowerCase())
      );
    })
  )
);

function renderBookList(bookList) {
  const existingElement = document.querySelector('.book-list');

  const root = document.getElementById('root');
  // bookList.forEach(element => {
  //   console.log(element);
  //   element.addEventListener("mouseenter", ()=>{debugger;}) 
  // });
  
  
  existingElement && root.removeChild(existingElement);
  bookList.length > 0 && searchField.value && root.insertAdjacentHTML('beforeend', BookList(bookList));
  var bookHovers =document.querySelectorAll('.book-list__item');
  bookHovers.forEach(element => {
    element.addEventListener("mouseenter",()=>{
     bookList.forEach(index => {
      if (element.textContent.includes(index.author +' - '+ index.title)){
        /*skapa fönster här */
        debugger;
      }
     })
    }) 
  });
}



