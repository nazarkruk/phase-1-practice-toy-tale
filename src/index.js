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
  });

  renderEnimals()

  function renderEnimals(){
    fetch(' http://localhost:3000/toys')
    .then(res=>res.json())
    .then(array=> {
      array.forEach(card=>{
      let cardToy = document.createElement('div')
      cardToy.innerHTML = `
      <div class="card">
      <h2>'${card['name']}'</h2>
      <img src="${card['image']}" class="toy-avatar" />
      <p>${card['likes']} Likes</p>
      <button class="like-btn" id="${card["id"]}">Like ❤️</button>
    </div>
      `
      document.querySelector('#toy-collection').appendChild(cardToy)
  
      })
    })

  }


  
  
  //add new toy
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
    renderEnimals()

  }

 
})