export default class Carousel {
    constructor(images){
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

    add(){
        return this.container;
    }

    addSlides(){
        this.images.forEach( image => {
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

    showSlides(n){
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

        this.slides[this.slideIndex - 1].style.display = 'block';
        this.dots[this.slideIndex - 1].classList.add('active');
    }

    moveSlide(dir){
        this.showSlides(this.slideIndex += dir);
    }

    addArrows(){
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

    addDots(){
        let dots = document.createElement('div');
        for(let i = 0; i < this.images.length; i++){
            let dot = document.createElement('span');
            dots.appendChild(dot);
            this.dots.push(dot);
        }

        this.container.appendChild(dots);
    }
}