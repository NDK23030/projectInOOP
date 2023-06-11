export default class Accordion {
    constructor(headSelector) {
        this.header = document.querySelectorAll(headSelector);
    }

    init() {
        this.header.forEach(btn => {
            btn.addEventListener('click', function() {
                const msg = btn.closest('.module__info-show').nextElementSibling;
                msg.classList.add('animated', 'fadeIn');
                msg.classList.toggle('msg');
                msg.style.marginTop = '20px';
            });
        })
    }
}