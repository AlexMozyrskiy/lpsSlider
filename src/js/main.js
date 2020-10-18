function lpsSlider(arr)
/*
Входные параметры.
{
    overflowHiddenWindowClass: '',         // класс окна в котором будет карусель
    sliderItemClass: '',                       // фото или items для карусели
    toSlide:                             // шаг для слайдера, сколько фото или items каруселить за раз
    toShow:                                 // сколько items показывать в окне
    timeOut:                              // тайм аут между перелистываниями слайдов, в миллисекундах
    speed:                                  // время за которое слайд прокрутится, в миллисеекундах
    arrows: {                               // стрелки перелистывания
        show: true,                         // если есть стрелки next и prev добавить ли им функционал
        prevClass: 'arrow_prev',       // html класс стрелки влево
        nextClass: 'arrow_next',       // html класс стрелки вправо
    },
    dots: {                                         // dots переключения слайдов. Если указать в show: true, а в wrapperClass не указывать вставятся точеи по умолчанию
        show: true,                                 // показываем ли
        wrapperClass: 'slider__dots-wrapper',       // класс обертки для dots слайдов
        class: 'slider__dot',                       // класс отдельно взятой dot
    },
}
*/
{
    
    const overflowHiddenElement = document.querySelector('.' + arr.overflowHiddenWindowClass),      // получаем окно в котором будет карусель
    sliderItems = document.querySelectorAll('.' + arr.sliderItemClass);                             // получаем все items для карусели
    const sliderItemsLenght = sliderItems.length;                                                   // количество слайдов

    overflowHiddenElement.style.display = 'flex';
    overflowHiddenElement.style.overflow = 'hidden';

    if(typeof arr.toShow == "undefined") {          // если разработчик не указал при вызове функции сколько items показывать по умеолчанию будет 1
        arr.toShow = 1;
    } 
    if(arr.toShow > sliderItemsLenght) {           // если разработчик указал что показывать больше слайдо, чем их есть, покажем сколько их есть
        arr.toShow = sliderItemsLenght;
    }

    const minWidth = (100 / arr.toShow),                                    // сколько занимает ширины 1 слайд, тут будут проценты для добавление в style каждому item мин ширины, то есть сколько 1 item займет места в окне в процентах. Например если разраб хочет видеть 2 items в окне он ставит toShow: 2 и получается, что minWidth будет 50% (100 / 2) + %
    minWidthPercent = minWidth + '%';
    let marLeft = 0;                                                        // изначальное значение, для первого элемента, показывает первый item
    let marLeftPercent = marLeft + '%';
    const marMin = 1 / arr.toShow * arr.toSlide;                            // минимальный шаг маргина
    let marLeftNext = marLeft + marMin;                                     // маргин следующий за текущим, чтобы определить не вылезет ли он за максимальгый, если да, то вычислим оставшиеся слайды и двинем на оставшиеся слайды
    const slideSpeed = arr.speed / 1000 + 's';                              // время за которое слайд прокрутится
    const notVisibleCount = sliderItemsLenght - arr.toShow;                 // количество невидимых слайдов, оставишхся за окном с overflow = hidden
    let marMax = notVisibleCount / arr.toShow;                              // максимальный маргин при котором мы достигнем последнего слайда
    
    if(typeof arr.toSlide == "undefined") {         // если разработчик не указал при вызове функции на сколько items листать слайдер по умеолчанию будет 1
        arr.toSlide = 1;
    }
    if(typeof arr.timeOut == "undefined") {         // если разработчик не указал при вызове функции на сколько items листать слайдер по умеолчанию будет 1
        arr.timeOut = 0;
    }
    if(typeof arr.arrows == "undefined") {          // если разработчик не указал при вызове функции показ стрелок
        arr.arrows = false;
    }
    if(typeof arr.dots == "undefined") {
        arr.dots = false;
    }

    for(let i = 0; i < sliderItemsLenght; i++) {
        sliderItems[i].style.minWidth = minWidthPercent;                                   // добавим к каждому item мин ширину, исходя сколько разработчик хочет показывать items в окне
        sliderItems[i].style.transition = slideSpeed + ' margin-left';              // скорость анимации перелистывания слайдов
        sliderItems[0].style.marginLeft = '-' + marLeftPercent;                      // изначальное значение при загрузке сранице, для первого элемента, показывает первый item
    }

    // -------------- проверим, если разработчик указал показывать стрелки, но не указал классы этих стрелок выдадим сообщение, в противном случаее присвоим переменным элементы с этими классами ---------------------
    if(typeof arr.arrows.show != "undefined") {                     // проверим, если разработчик указал 

        if(typeof arr.arrows.prevClass == "undefined") {
            alert ('dear developer, you indicated arr.arrows.show, which means you wanted to use scroll paths, but you did not specify the arrow class: arr.arrows.prevClass');
        } else {
            var arrowPrev = document.querySelector('.' + arr.arrows.prevClass);
        }

        if(typeof arr.arrows.nextClass == "undefined") {
            alert ('dear developer, you indicated arr.arrows.show, which means you wanted to use scroll paths, but you did not specify the arrow class: arr.arrows.nextClass');
        } else {
            var arrowNext = document.querySelector('.' + arr.arrows.nextClass);
        }
    }
    // -------------- / проверим, если разработчик указал показывать стрелки, но не указал классы этих стрелок выдадим сообщение-------------------

    // -------------- если указан автоматический скролл, указана переменная arr.timeOut --------------------------------------------
        if(arr.timeOut != 0) {                                                          // если пользователь захотел слайдить через определенный интервал времени
            var interval = setInterval(flipSlideRight, arr.timeOut);                      // первоначально запустим слайдер при загрузке скрипта 1 раз

            overflowHiddenElement.addEventListener('mouseover', pauseSlides);           // при наведении мыши на окно overflowHiddenElement остановим слайдер
            overflowHiddenElement.addEventListener('mouseout', resumeSlides);           // при нахождении мыши не на окне overflowHiddenElement запустим слайдер дальше
        }
    // -------------- / если указан автоматический скролл, указана переменная arr.timeOut ------------------------------------------

    // ----------------------------------- Если показываем стрелки ---------------------------------
    if(arr.arrows.show) {                                            // если показываем стрелки
        if(arr.timeOut != 0) {                                              // и если разработчик включил автоматическую прокрутку
            arrowNext.addEventListener('mouseover', pauseSlides);                           // при наведении мыши на стрелку Next остановим слайдер
            arrowNext.addEventListener('mouseout', resumeSlides);                           // при нахождении мыши не на стрелке Next запустим слайдер дальше

            arrowPrev.addEventListener('mouseover', pauseSlides);
            arrowPrev.addEventListener('mouseout', resumeSlides);
        }

        arrowNext.addEventListener('click', () => {                            // если нажали на стрелку next
            flipSlideRight();
        });
        arrowPrev.addEventListener('click', () => {                            // если нажали на стрелку prev
            flipSlideLeft();
        });
        // overflowHiddenElement.insertAdjacentHTML('afterend', `<span class="${arr.arrows.arrowsClass} ${arr.arrows.nextClass}"></span>`);
        // overflowHiddenElement.insertAdjacentHTML('afterend', `<span class="${arr.arrows.arrowsClass} ${arr.arrows.prevClass}"></span>`);
    }
    // ----------------------------------- / Если показываем стрелки -------------------------------

    // ----------------------------------- Если показываем точки -----------------------------------
    if(arr.dots.show) {                               // если показываем точки
        if(typeof arr.dots.wrapperClass != "undefined") {                                           // если разработчик указал классы точек, сделаем точки с указанным классом
            overflowHiddenElement.insertAdjacentHTML('afterend', `<div class="${arr.dots.wrapperClass}"></div>`);   // вставим обертку для точек после overflowHiddenElement
            const dotsParrentDiv = document.querySelector('.' + arr.dots.wrapperClass);

            for(let i = 0; i < sliderItemsLenght; i++) {                                                        // вствим спаны точек с указанными классами 
                if(i != 0) {                                                                                    // если это не первая точка проста встави класс точки
                    dotsParrentDiv.insertAdjacentHTML('beforeend', `<span class="${arr.dots.class}"></span>`);
                } else {                                                                                        // если это первая точка вставим еще и класс активность для точки
                    dotsParrentDiv.insertAdjacentHTML('beforeend', `<span class="${arr.dots.class} ${arr.dots.activeClass}"></span>`);
                }
            }

            var lpsSliderDots = document.getElementsByClassName(arr.dots.class);                        // возьмём все точки

            for(let i = 0; i < sliderItemsLenght; i++) {
                lpsSliderDots[i].addEventListener('mouseover', pauseSlides);                           // при наведении мыши на любую dot остановим слайдер
                lpsSliderDots[i].addEventListener('mouseout', resumeSlides);                           // при нахождении мыши не на любой dot запустим слайдер дальше

                lpsSliderDots[i].addEventListener('click', function() {                                 // при клике на точку прыгнем на соответствующий слайд
                    if(i <= (sliderItemsLenght - arr.toShow)) {                     // если кликают на слайд меньше максимально возможного показа слайдов окне overflowHiddenElement (условие, чтобы мы не вышли за последний слйд и не показали пустоту)
                        jumpToSlide(i);
                    } else {
                        jumpToSlide((sliderItemsLenght - arr.toShow));              // если кликают по слайду больше максимально допустимого к показу и мы при переходе на него выйдем за самый последний слайд, просто перейдем к последнему слайду, чтобы он окзался на самой правой позицци в окне overflowHiddenElement
                    }
                });
            }
        } else {                                                                            // если разработчик не указал html для точек вставим html по умочанию
            overflowHiddenElement.insertAdjacentHTML('afterend', '<div class="lpsSliderDotsWrapper"></div>');   // вставим обертку для точек после overflowHiddenElement
            const dotsParrentDiv = document.querySelector('.lpsSliderDotsWrapper');
            dotsParrentDiv.style.cssText = `
                                            display: flex;
                                            align-items: center;
                                            justify-content: center;
                                            `;                                                              // вставим нужные стили обертке для точек

            for(let i = 0; i < sliderItemsLenght; i++) {                                                    // вставим точки равное количеству слайдов с нужными стилями по умолчанию
                dotsParrentDiv.insertAdjacentHTML('beforeend', `<span class="lpsSliderDot" style="height: 50px; width: 50px; background-color: gray; border-radius: 50%; cursor: pointer; text-align: center;"><div style="padding-top: 50%; transform: translateY(-25%);">${i + 1}</div></span>`);
            }

            var lpsSliderDots = document.getElementsByClassName('lpsSliderDot');                        // возьмём все точки

            lpsSliderDots[0].children[0].style.transform = 'scale(2) translateY(-25%)';                 // сделаем активным с самого начала первую dot

            for(let i = 0; i < sliderItemsLenght; i++) {
                lpsSliderDots[i].addEventListener('mouseover', pauseSlides);                           // при наведении мыши на любую dot остановим слайдер
                lpsSliderDots[i].addEventListener('mouseout', resumeSlides);                           // при нахождении мыши не на любой dot запустим слайдер дальше

                lpsSliderDots[i].addEventListener('click', function() {                                 // при клике на точку прыгнем на соответствующий слайд
                    if(i <= (sliderItemsLenght - arr.toShow)) {                     // если кликают на слайд меньше максимально возможного показа слайдов окне overflowHiddenElement (условие, чтобы мы не вышли за последний слйд и не показали пустоту)
                        jumpToSlide(i);
                    } else {
                        jumpToSlide((sliderItemsLenght - arr.toShow));              // если кликают по слайду больше максимально допустимого к показу и мы при переходе на него выйдем за самый последний слайд, просто перейдем к последнему слайду, чтобы он окзался на самой правой позицци в окне overflowHiddenElement
                    }
                });
            }
        }
    }
    // ----------------------------------- Если показываем точки -----------------------------------




    // -------------- Вспомогательные функции, вызываем в коде слайдера ------------------------- 
    function pauseSlides(event)
    {
        clearInterval(interval); // Clear the interval we set earlier
    }

    function resumeSlides(event)
    {
        interval = setInterval(flipSlideRight, arr.timeOut);
    }

    function flipSlideRight()                               // листаем слайды вправо
    {
        if(marLeft === marMax) {                                        // если достигли последнего слайда, тоесть текущий маргин равен макисмальному перелистнем на первый слайд
            marLeft = 0;
            marLeftNext = marLeft + marMin;       // маргин следующий за текущим, чтобы определить не вылезет ли он за максимальгый, если да, то вычислим оставшиеся слайды и двинем на оставшиеся слайды
            marLeftPercent = marLeft * 100 + '%';
            sliderItems[0].style.marginLeft = '-' + marLeftPercent;
            activeDot();
        } else if(marLeftNext > marMax) {                                  // если сл маргин будет больше текущего перелестнем на последний слайд
            marLeft = marMax;
            marLeftPercent = marLeft * 100 + '%';
            sliderItems[0].style.marginLeft = '-' + marLeftPercent;
            activeDot();
        } else {
            marLeft = marLeft + marMin;
            marLeftNext = marLeft + marMin;           // маргин следующий за текущим, чтобы определить не вылезет ли он за максимальгый, если да, то вычислим оставшиеся слайды и двинем на оставшиеся слайды
            marLeftPercent = marLeft * 100 + '%';
            sliderItems[0].style.marginLeft = '-' + marLeftPercent;
            activeDot();
        }
    }

    function flipSlideLeft()                            // листаем слайды влево
    {
        if(marLeft === 0) {                                        // если находимся в самом начале на первом слайде тогда в лево листнем на последний слайд
            marLeft = marMax;
            marLeftNext = marLeft + marMin;       // маргин следующий за текущим, чтобы определить не вылезет ли он за максимальгый, если да, то вычислим оставшиеся слайды и двинем на оставшиеся слайды
            marLeftPercent = marLeft * 100 + '%';
            sliderItems[0].style.marginLeft = '-' + marLeftPercent;
            activeDot();
        } else if((marLeft - marMin) < 0) {              // если при перелистывании влево сл перелистываение выйдет за пределы то есть будет меньше первого слайда
            marLeft = 0;
            marLeftPercent = marLeft * 100 + '%';
            sliderItems[0].style.marginLeft = '-' + marLeftPercent;
            activeDot();
        } else {
            marLeft = marLeft - marMin;
            marLeftNext = marLeft + marMin;           // маргин следующий за текущим, чтобы определить не вылезет ли он за максимальгый, если да, то вычислим оставшиеся слайды и двинем на оставшиеся слайды
            marLeftPercent = marLeft * 100 + '%';
            sliderItems[0].style.marginLeft = '-' + marLeftPercent;
            activeDot();
        }
    }

    function jumpToSlide(slidNumber)                              // переметиться к слайду по порядковому номеру (slidNumber), slidNumber начинается с 0
    {
        marLeft = slidNumber * (minWidth / 100);     // minWidth / 100 чтобы привести числа к нужной разрядности
        marLeftNext = marLeft + marMin;       // маргин следующий за текущим, чтобы определить не вылезет ли он за максимальгый, если да, то вычислим оставшиеся слайды и двинем на оставшиеся слайды
        marLeftPercent = marLeft * 100 + '%';
        sliderItems[0].style.marginLeft = '-' + marLeftPercent;
        activeDot();
    }

    function currentSlide()                                                 // текущий слайд
    {
        return Math.round((marLeft * 100) / minWidth);
    }

    function activeDot()                                                // добавление стилей активности текущей dot
    {
        if(arr.dots.show && typeof arr.dots.wrapperClass == "undefined") {
            for(let i = 0; i < sliderItemsLenght; i++) {
                lpsSliderDots[i].children[0].style.transform = 'scale(1) translateY(-25%)';
            }

            lpsSliderDots[currentSlide()].children[0].style.transform = 'scale(2) translateY(-25%)';
        } else {
            for(let i = 0; i < sliderItemsLenght; i++) {
                lpsSliderDots[i].classList.remove('active__class');
            }
            lpsSliderDots[currentSlide()].classList.add('active__class');
        }
    }
    // -------------- / Вспомогательные функции, вызываем в коде слайдера -----------------------
}










lpsSlider({
    overflowHiddenWindowClass: 'slider',
    sliderItemClass: 'slider__item',
    toShow: 3,
    timeOut: 2000,
    speed: 500,
    toSlide: 2,
    arrows: {
        show: true,
        prevClass: 'arrow_prev',
        nextClass: 'arrow_next',
    },
    dots: {
        show: true,
        wrapperClass: 'slider__dots-wrapper',
        class: 'slider__dot',
        activeClass: 'active__class',
    },
});