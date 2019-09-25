const app = document.getElementById('root');
const container = document.createElement('div');
container.setAttribute('class', 'container');
app.appendChild(container);

//fetch request sent to local json db server
fetch('http://localhost:3000/data')
    .then( res => res.json() )
    .then( res => {
        //for each furniture item, display a card with details (price and name)
        res.groups.forEach((furniture, idx) => {
            const card = document.createElement('div');
            card.setAttribute('class', 'card');
            card.setAttribute('style', `background-image: url(${furniture.hero.href})`);
            
            //modal starts off as hidden
            const modal = document.createElement('div');
            modal.setAttribute('class', 'modal hidden');
            modal.setAttribute('id', `${idx}`)

            const h1 = document.createElement('h1');
            h1.textContent = furniture.name;
            
            // priceRange => selling => high/low
            // price => regular/selling
            const price = document.createElement('h5');
            price.textContent = `$ ${furniture.priceRange ? furniture.priceRange.selling.high : furniture.price.regular}`;
            
            let caro = new Carousel(furniture.images, modal);
            modal.appendChild(caro.add());

            card.appendChild(modal);
            card.appendChild(h1);
            card.appendChild(price);
            
            //show previously hidden carousel overlay when card is clicked
            card.addEventListener('click', () => {
                modal.classList.remove('hidden');
            });

            container.appendChild(card);
        })
    })
    .catch(e => console.log(e))

//ES6 class to keep carousel logic in one place
class Carousel {
    constructor(images, parent) {
        this.images = images;
        this.parent = parent;
        this.container = document.createElement('div');
        this.container.setAttribute('class', 'caro-container');

        this.addX();

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

    addX(){
        const button = document.createElement('button');
        button.innerHTML = "x";
        button.addEventListener('click', (e) => {
            //needed to stop event bubbling!
            e.stopPropagation();
            this.parent.classList.add('hidden');
        });
        this.container.appendChild(button);
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
        //loop back around when going out of bounds
        if (n > this.slides.length) {
            this.slideIdx = 1;
        } else if (n < 1) {
            this.slideIdx = this.slides.length;
        }

        //only display image at current slide index
        for (let i = 0; i < this.slides.length; i++) {
            this.slides[i].style.display = 'none';
        }
        //have dots show corresponding progress
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
        prev.innerHTML = `&#10094;`
        prev.addEventListener('click', () => this.moveSlide(-1));

        let next = document.createElement('a');
        next.setAttribute('class', 'next');
        next.innerHTML = `&#10095;`
        next.addEventListener('click', () => this.moveSlide(1));

        this.container.appendChild(prev);
        this.container.appendChild(next);
    }

    addDots() {
        let dots = document.createElement('div');
        dots.setAttribute('class', 'dots');

        for (let i = 0; i < this.images.length; i++) {
            let dot = document.createElement('span');
            dot.setAttribute('class', 'dot');
            dots.appendChild(dot);
            this.dots.push(dot);
        }

        this.container.appendChild(dots);
    }
}