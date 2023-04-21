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

  fetch('http://localhost:3000/toys')
    .then(resp => resp.json())
    .then(data => createCards(data));

  function createCards(toys) {
    for ( const toy of toys) {
      createCard(toy);
    }
  };

  function createCard(toy) {
    const card = document.createElement('div');
    const h2 = document.createElement('h2');
    const img = document.createElement('img');
    const p = document.createElement('p');
    const btn = document.createElement('button');
    card.className = 'card';
    h2.textContent = toy.name;
    img.src = toy.image;
    img.className = 'toy-avatar';
    p.textContent = `${toy.likes} Likes`;
    btn.className = 'like-btn';
    btn.textContent = 'Like ❤️';
    btn.id = toy.id;
    card.appendChild(h2);
    card.appendChild(img);
    card.appendChild(p);
    card.appendChild(btn);
    btn.addEventListener('click', function() {
      toy.likes += 1;
      p.textContent = `${toy.likes} Likes`;
      fetch(`http://localhost:3000/toys/${toy.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          'likes': toy.likes,
        })
      });
    });
    document.querySelector('#toy-collection').appendChild(card);
  };

  const form = document.querySelector('form');
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    fetch('http://localhost:3000/toys', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        'name': form.name.value,
        'image': form.image.value,
        'likes': 0
      })
    })
      .then(resp => resp.json())
      .then(data => createCard(data));
  });
});
