export default class Slider {
    constructor() {
        this.imagesContainerEl = document.querySelector('.slider__images-container');
        this.imgEl1 = document.querySelector('.slider__image-container--first img');
        this.imgEl2 = document.querySelector('.slider__image-container--second img');

        this.dragging = false;
        this.img2ContainerEl = document.querySelector('.slider__image-container--second');
        this.handleEl = document.querySelector('.slider__handle');
        this.dividerEl = document.querySelector('.slider__divider');
        this.imagesContainerWidth;
        this.imagesContainerLeftOffset;
        this.init();
    }

    // metody

    // clientX to przesuniecie w lini poziomej w px - potrzebna do slidera
    //clientX
    getOffset = (clientX) => {
        const offset = clientX - this.imagesContainerLeftOffset;
        if (offset < 0) {
            return 0;
        } else if (offset > this.imagesContainerWidth) {
            return this.imagesContainerWidth
        } else return offset;
    };

    move = (clientX) => {
        const offset = this.getOffset(clientX);
        // zmierzamy do wartosci procentowej
        const percent = offset / this.imagesContainerWidth * 100;
        // console.log(percent);

        this.dividerEl.style.left = `${percent}%`;
        //zmieniamy drugiemu obrazkowi  wielkosc
        this.img2ContainerEl.style.width = `${percent}%`;
    }


    // funkcja wywolujaca
    events = () => {
        this.handleEl.addEventListener('mousedown', () => {
            this.dragging = true
        });
        this.handleEl.addEventListener('mouseup', () => {
            this.dragging = false
        });
        //urzadzenia mobilne 
        this.handleEl.addEventListener('touchstart', () => {
            this.dragging = true
        });
        this.handleEl.addEventListener('touchend', () => {
            this.dragging = false
        });

        window.addEventListener('touchmove', (event) => {
            if (this.dragging) {
                this.move(event.touches[0].clientX);
            } else
                return
        });

        //przekazujemy event
        window.addEventListener('mousemove', (event) => {
            if (this.dragging) {
                this.move(event.clientX);
            } else
                return
        });


    }

    adjustImagesSize = () => {
        this.imagesContainerWidth = this.imagesContainerEl.offsetWidth;
        // ustalenie szerolosci wraz z borderem i paddidngiem
        this.imgEl1.style.width = `${this.imagesContainerWidth}px`;
        this.imgEl2.style.width = this.imagesContainerWidth + 'px';
        // ustalenie odlegosci od lewej krawedzi 
        this.imagesContainerLeftOffset = this.imagesContainerEl.offsetLeft;

        window.addEventListener('resize', this.adjustImagesSize);
    }

    init() {
        this.events();
        this.adjustImagesSize();
    }

}