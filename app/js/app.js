import '../sass/index.scss';

document.addEventListener('DOMContentLoaded', () => {


const imagesContainerEl = document.querySelector('.slider__images-container');
const imgEl1 = document.querySelector('.slider__image-container--first img');
const imgEl2 = document.querySelector('.slider__image-container--second img');
let dragging = false;
// odleglosc od lewej krawedzi
// const img1ContainerEl =  document.querySelector('.slider__image-container--first');
const img2ContainerEl = document.querySelector('.slider__image-container--second');
const handleEl = document.querySelector('.slider__handle');
const dividerEl = document.querySelector('.slider__divider');
let imagesContainerWidth;
let imagesContainerLeftOffset; 


// clientX to przesuniecie w lini poziomej w px - potrzebna do slidera
//clientX
const getOffset = (clientX) => { 
    const offset = clientX - imagesContainerLeftOffset;
    if (offset < 0) {
        return 0;
    } else if (offset > imagesContainerWidth){
        return imagesContainerWidth
    }
    else return offset;
};

const move = (clientX) => {
    const offset = getOffset(clientX);
    // zmierzamy do wartosci procentowej
    const percent = offset/imagesContainerWidth * 100;
    console.log(percent);
    
    dividerEl.style.left = `${percent}%`;
    //zmieniamy drugiemu obrazkowi  wielkosc
    img2ContainerEl.style.width = `${percent}%`;
}


// funkcja wywolujaca
const initEvents= ()=> {
    handleEl.addEventListener('mousedown', () => {dragging = true});
    handleEl.addEventListener('mouseup', () => {dragging = false});
    
    //przekazujemy event
    window.addEventListener('mousemove', (event) => {
        if (dragging) {
            move(event.clientX);
        } else
         return
    });



}

const adjustImagesSize = ()=> {
    imagesContainerWidth = imagesContainerEl.offsetWidth;
    imgEl1.style.width = `${imagesContainerWidth}px`;
    imgEl2.style.width = imagesContainerWidth + 'px';
    imagesContainerLeftOffset = imagesContainerEl.offsetLeft;
    window.addEventListener('resize', adjustImagesSize);
}

adjustImagesSize();
initEvents();








});