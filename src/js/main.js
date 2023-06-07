import SliderMain from "./modules/slider/sliderMain";
import SliderMini from "./modules/slider/sliderMini";
import VideoPlayer from "./modules/playVideo";
import Difference from "./modules/difference";
import Forms from "./modules/forms";

window.addEventListener('DOMContentLoaded', () => {
    const slider = new SliderMain({btns: '.next', container: '.page'});
    slider.render();

    const showUpSlider = new SliderMini({
        container: '.showup__content-slider', 
        prev: '.showup__prev', 
        next: '.showup__next',
        activeClass: 'card-active',
        animate: true
    });
    showUpSlider.init();

    const modulesSlider = new SliderMini({
        container: '.modules__content-slider', 
        prev: '.modules__info-btns .slick-prev', 
        next: '.modules__info-btns .slick-next',
        activeClass: 'card-active',
        animate: true,
        autoplay: true
    });
    modulesSlider.init();

    const feedSlider = new SliderMini({
        container: '.feed__slider', 
        prev: '.feed__slider .slick-prev', 
        next: '.feed__slider .slick-next',
        activeClass: 'feed__item-active'
    });
    feedSlider.init(); 

    const player = new VideoPlayer('.showup .play', '.overlay');
    player.init();

    new Difference('.officerold', '.officernew', '.officer__card-item').init();

    new Forms('.form', 'input').init();
});