export default class Forms {
    constructor(form, input) {
        this.forms = document.querySelectorAll(form);
        this.inputs = document.querySelectorAll(input);
        this.message = {
            loading: 'Загрузка...',
            success: 'Спасибо! Скоро мы с вами свяжемся',
            failure: 'Что-то пошло не так!'
        };
    }

    async postData(data) {
        let res = await fetch('assets/question.php', {
            method: 'POST',
            body: data
        });

        return await res.text();
    }

    clearInputs() {
        this.inputs.forEach(input => {
            input.value = '';
        });
    }

    checkMailInputs() {
        const mailInputs = document.querySelectorAll('[type="email"]');
    
        mailInputs.forEach(input => {
            input.addEventListener('input', () => {
                input.value = input.value.replace(/[^a-z 0-9 @ \.]/ig, '');
            });
        });
    }

    initMask() {
        
        let setCursorPosition = (pos, elem) => {
            elem.focus();
            let range;

            if(elem.setSelectionRange) {
                elem.setSelectionRange(pos, pos);
            } else if(elem.createTextRange) {
                range = elem.createTextRange();

                range.colapse(true);
                range.moveEnd('character', pos);
                range.moveStart('character', pos);
                range.select();
            }
        };

        function maskNumber(e) {
            let matrix = '+1 (___) ___-____',
                i = 0,
                def = matrix.replace(/\D/g, ''),
                value = this.value.replace(/\D/g, '');

            if (def.length >= value.length) {
                value = def;
            }

            this.value = matrix.replace(/./g, function(a) {
                return /[_\d]/.test(a) && i < value.length ? value.charAt(i++) : i >= value.length ? '' : a;
            });

            if(e.type === 'blur') {
                if(this.value.length == 2) {
                    this.value = '';
                }
            } else {
                setCursorPosition(this.value.length, this);
            }
        }

        let inputs = document.querySelectorAll('[name="phone"]');

        inputs.forEach(input => {
            input.addEventListener('input', maskNumber);
            // input.addEventListener('keypress', maskNumber);
            input.addEventListener('click', maskNumber);
            input.addEventListener('focus', maskNumber);
            input.addEventListener('blur', maskNumber);
        });
    }

    init() {
        this.checkMailInputs();
        this.initMask();
        this.forms.forEach(form => {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                
                let textMessage = document.createElement('div');
                textMessage.style.cssText = `
                    margin-top: 15px;
                    font-size: 18px;
                    color: grey;
                `;
                textMessage.textContent = this.message.loading;
                textMessage.classList.add('animated', 'fadeInUp');
                form.appendChild(textMessage);
    
                const formData = new FormData(form);
    
                this.postData(formData)
                    .then(res => {
                        console.log(res);
                        textMessage.textContent = this.message.success;
                    })
                    .catch(() => {
                        textMessage.textContent = this.message.failure;
                    })
                    .finally(() => {
                        this.clearInputs();
                        setTimeout(() => {
                            textMessage.remove();
                        }, 6000);
                    });
    
            });
        });
    }

}