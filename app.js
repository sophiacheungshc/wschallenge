const app = document.getElementById('root');

const container = document.createElement('div');
container.setAttribute('class', 'container');
app.appendChild(container);

//fetch request sent to json db server
fetch('http://localhost:3000/data')
    .then( res => res.json() )
    .then( res => {
        res.groups.forEach((furniture, idx) => {
            const card = document.createElement('div');
            card.setAttribute('class', 'card');
            card.setAttribute('style', `background-image: url(${furniture.hero.href})`);
            
            const modal = document.createElement('div');
            modal.setAttribute('class', 'modal close');
            modal.setAttribute('id', `${idx}`)
            
            const button = document.createElement('button');
            button.innerHTML = "x";

            const h1 = document.createElement('h1');
            h1.textContent = furniture.name;

            // priceRange => selling => high/low
            // price => regular/selling
            const price = document.createElement('h5');
            price.textContent = `$ ${furniture.priceRange ? furniture.priceRange.selling.high : furniture.price.regular}`;
            
            container.appendChild(card);
            card.appendChild(modal);
            modal.appendChild(button);

            card.appendChild(h1);
            // card.appendChild(img);
            card.appendChild(price);

            card.addEventListener('click', function(){
                document.getElementById(`${idx}`).classList.toggle("close");
            })
            button.addEventListener('click', function(){
                document.getElementById(`${idx}`).classList.add("close");
            })
        })
    })
    .catch(e => console.log(e))