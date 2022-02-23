let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  }) 
  
  let toyForm = document.querySelector('.add-toy-form')
  toyForm.addEventListener('submit', addNewToy)     
  
  function addNewToy(e){
    e.preventDefault()
    let toyName = e.target.name.value
    let toyImage = e.target.image.value
    fetch('http://localhost:3000/toys', {
      method: 'POST',
      headers:{
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        name:toyName,
        image: toyImage,
        likes:0
      })
    })
    .then(res => res.json())
    .then(card => renderToy(card)) 
  }

})


getAllToys()

function getAllToys(){
  fetch(' http://localhost:3000/toys')
  .then(res=>res.json())
  .then(toyArray=> {toyArray.forEach(card=>renderToy(card))})
}


function renderToy(card){
  let toyCard = document.createElement('div')
      toyCard.innerHTML = `
      <div class="card">
      <h2>'${card.name}'</h2>
      <img src="${card['image']}" class="toy-avatar" />
      <p>
        <span class = 'like-count'>${card.likes}</span> Likes
      </p>
      <button class="like-btn" id="${card.id}">Like ❤️</button>
    </div>
      `
      let likeBtn = toyCard.querySelector('.like-btn')
      likeBtn.addEventListener('click', ()=>{
        card.likes += 1
        toyCard.querySelector('.like-count').textContent = card.likes
        fetch(`http://localhost:3000/toys/${card.id}`,{
          method: "PATCH",
          headers:{
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            "likes": card.likes
          })

        })
 
      })
      document.querySelector('#toy-collection').appendChild(toyCard)
}







