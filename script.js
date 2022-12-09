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
    element.addEventListener("mouseenter",()=>{ // Lägger en eventlistener på alla element som aktiveras när muspekaren hovrar över ett element.
     bookList.forEach(index => {
      if (element.textContent.includes(index.author +' - '+ index.title)){
        createPanel(index);
      }

     })
    }) 
    element.addEventListener("mouseout",()=> { // Ett litet problem här är att om man raderar det man har skrivit i sökfältet när rutan är uppe så stannar den kvar.
     var removeBox = document.querySelector('.hover')
     if (removeBox){
      document.body.removeChild(removeBox);
     }
    })
  });
}
  async function createPanel(index){
  var link ='https://gik2f8-labs.herokuapp.com/books/'+ index.id.toString() // All info om böcker sparas i index så vi kan komma åt id med hjälp av det och lägga till det i länken
  const result = await fetch(link)
  const data = await result.json()
  .then((data) => {afterWaiting(data)})
  .catch((e) => e);
}

function afterWaiting(result){
  
  var html = document.createElement("div");
  var image = document.createElement("img");
  // Alla styles för bilden
  image.src= result.coverImage
  image.style.height ='80%';
  image.style.alignSelf='center';
  image.style.paddingLeft='1rem';
  image.style.paddingRight='1rem';

  html.innerText ="Författare: "+ '\n' +result.author + '\n' +'\n'+"Titel: " +'\n' +result.title +'\n' +'\n' + "Släpptes:"+'\n' +result.releaseDate +'\n' + '\n' + "Antal sidor:"+'\n'+ result.pages;
  html.appendChild(image);
  html.className ='hover'
  document.body.appendChild(html);
// Alla styles på rutan
  const divStyle = document.querySelector(".hover");
  divStyle.style.backgroundColor='white';
  divStyle.style.color = 'grey';
  divStyle.style.height ='20rem';
  divStyle.style.width ='20rem';
  divStyle.style.display='flex';
  divStyle.style.marginLeft='40%';
  divStyle.style.marginTop='1rem';
  divStyle.style.paddingLeft='1rem';
}