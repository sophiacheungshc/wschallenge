const app = document.getElementById('root');

const container = document.createElement('div');
container.setAttribute('class', 'container');
app.appendChild(container);

//request sent to json db server
var request = new XMLHttpRequest();
request.open('GET', 'http://localhost:3000/data', true);
request.onload = function () {

    var data = JSON.parse(this.response);
    if (request.status >= 200 && request.status < 400) {
        data.groups.forEach(furniture => {
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
    } else {
        const error = document.createElement('marquee');
        error.textContent = "Something is broken :(";
        app.appendChild(error);
    }
}

request.send();