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
            button.addEventListener('click', function(){
                modal.setAttribute('class', 'modal close');
            })

            const h1 = document.createElement('h1');
            h1.textContent = furniture.name;

            // priceRange => selling => high/low
            // price => regular/selling
            const price = document.createElement('h5');
            price.textContent = `$ ${furniture.priceRange ? furniture.priceRange.selling.high : furniture.price.regular}`;
            
            card.addEventListener('click', function(){
                modal.classList.remove("close");
            });

            container.appendChild(card);
            card.appendChild(modal);
            modal.appendChild(button);

            let caro = new Carousel(furniture.images);
            modal.appendChild(caro.add());

            card.appendChild(h1);
            card.appendChild(price);

        })
    })
    .catch(e => console.log(e))

class Carousel {
    constructor(images) {
        this.images = images;
        this.container = document.createElement('div');
        this.container.setAttribute('class', 'caro-container');
        this.slideIdx = 1;

        this.slides = [];
        this.addSlides();

        this.dots = [];
        this.addDots();
        this.addArrows();

        this.showSlides(this.slideIdx);
    }

    add() {
        return this.container;
    }

    addSlides() {
        this.images.forEach(image => {
            let slide = document.createElement('div');
            slide.setAttribute('class', 'slide fade');
            let img = document.createElement('img');
            img.setAttribute('src', image.href);
            img.setAttribute('alt', image.alt);
            slide.appendChild(img);

            this.container.appendChild(slide);
            this.slides.push(slide);
        })
    }

    showSlides(n) {
        if (n > this.slides.length) {
            this.slideIdx = 1;
        } else if (n < 1) {
            this.slideIdx = this.slides.length;
        }

        for (let i = 0; i < this.slides.length; i++) {
            this.slides[i].style.display = 'none';
        }
        for (let i = 0; i < this.dots.length; i++) {
            this.dots[i].classList.remove('active');
        }

        this.slides[this.slideIdx - 1].style.display = 'block';
        this.dots[this.slideIdx - 1].classList.add('active');
    }

    moveSlide(dir) {
        this.showSlides(this.slideIdx += dir);
    }

    addArrows() {
        let prev = document.createElement('a');
        prev.setAttribute('class', 'prev');
        prev.innerText = '&#10094;'
        prev.addEventListener('click', () => this.moveSlide(-1));

        let next = document.createElement('a');
        next.setAttribute('class', 'next');
        next.innerText = '&#10095;'
        next.addEventListener('click', () => this.moveSlide(1));

        this.container.appendChild(prev);
        this.container.appendChild(next);
    }

    addDots() {
        let dots = document.createElement('div');
        for (let i = 0; i < this.images.length; i++) {
            let dot = document.createElement('span');
            dots.appendChild(dot);
            this.dots.push(dot);
        }

        this.container.appendChild(dots);
    }
}