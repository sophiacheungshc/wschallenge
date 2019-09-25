const app = document.getElementById('root');

const container = document.createElement('div');
container.setAttribute('class', 'container');
app.appendChild(container);

//fetch request sent to json db server
fetch('http://localhost:3000/data')
    .then( res => res.json() )
    .then( res => {
        res.groups.forEach(furniture => {
            const card = document.createElement('div');
            card.setAttribute('class', 'card');

            const h1 = document.createElement('h1');
            h1.textContent = furniture.name;
            const img = document.createElement('img');
            img.src = furniture.thumbnail.href;

            container.appendChild(card);
            card.appendChild(h1);
            card.appendChild(img);
        })
    })
    .catch(e => console.log(e))