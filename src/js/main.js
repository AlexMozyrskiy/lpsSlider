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
    arrows: false                          // показывать ли стрелки, по умолчанию false
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

    const minWidth = (100 / arr.toShow),                                                                 // тут будут проценты для добавление в style каждому item мин ширины, то есть сколько 1 item займет места в окне в процентах. Например если разраб хочет видеть 2 items в окне он ставит toShow: 2 и получается, что minWidth будет 50% (100 / 2) + %
    minWidthPercent = minWidth + '%';
    let marLeft = 0;                                                                                // изначальное значение, для первого элемента, показывает первый item
    let marLeftPercent = marLeft + '%';
    let marLeftNext = marLeft + 1 / arr.toShow * arr.toSlide;                                   // маргин следующий за текущим, чтобы определить не вылезет ли он за максимальгый, если да, то вычислим оставшиеся слайды и двинем на оставшиеся слайды
    const slideSpeed = arr.speed / 1000 + 's';                                                  // время за которое слайд прокрутится
    const notVisibleCount = sliderItemsLenght - arr.toShow;                 // количество невидимых слайдов, оставишхся за окном с overflow = hidden
    let marMax = notVisibleCount / arr.toShow;                                  // максимальный маргин при котором мы достигнем последнего слайда
    
    if(typeof arr.toSlide == "undefined") {         // если разработчик не указал при вызове функции на сколько items листать слайдер по умеолчанию будет 1
        arr.toSlide = 1;
    }
    if(typeof arr.timeOut == "undefined") {         // если разработчик не указал при вызове функции на сколько items листать слайдер по умеолчанию будет 1
        arr.timeOut = 0;
    }
    if(typeof arr.arrows == "undefined") {
        arr.arrows = false;
    }

    for(let i = 0; i < sliderItemsLenght; i++) {
        sliderItems[i].style.minWidth = minWidthPercent;                                   // добавим к каждому item мин ширину, исходя сколько разработчик хочет показывать items в окне
        sliderItems[i].style.transition = slideSpeed + ' margin-left';              // скорость анимации перелистывания слайдов
        sliderItems[0].style.marginLeft = '-' + marLeftPercent;                      // изначальное значение при загрузке сранице, для первого элемента, показывает первый item
    }

    // -------------- проверим, если разработчик указал показывать стрелки, но не указал классы этих стрелок выдадим сообщение, в противном случаее присвоим переменным элементы с этими классами ---------------------
    if(typeof arr.arrows.show != "undefined") {                     // проверим, если разработчик указал 

        if(typeof arr.arrows.arrowPrevClass == "undefined") {
            alert ('dear developer, you indicated arr.arrows.show, which means you wanted to use scroll paths, but you did not specify the arrow class: arr.arrows.arrowPrevClass');
        } else {
            var arrowPrev = document.querySelector('.' + arr.arrows.arrowPrevClass);
        }

        if(typeof arr.arrows.arrowNextClass == "undefined") {
            alert ('dear developer, you indicated arr.arrows.show, which means you wanted to use scroll paths, but you did not specify the arrow class: arr.arrows.arrowNextClass');
        } else {
            var arrowNext = document.querySelector('.' + arr.arrows.arrowNextClass);
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
    if(typeof arr.arrows.show != "undefined") {                               // если показываем стрелки
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
        // overflowHiddenElement.insertAdjacentHTML('afterend', `<span class="${arr.arrows.arrowsClass} ${arr.arrows.arrowNextClass}"></span>`);
        // overflowHiddenElement.insertAdjacentHTML('afterend', `<span class="${arr.arrows.arrowsClass} ${arr.arrows.arrowPrevClass}"></span>`);
    }
    // ----------------------------------- / Если показываем стрелки -------------------------------




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
            marLeftNext = marLeft + 1 / arr.toShow * arr.toSlide;       // маргин следующий за текущим, чтобы определить не вылезет ли он за максимальгый, если да, то вычислим оставшиеся слайды и двинем на оставшиеся слайды
            marLeftPercent = marLeft * 100 + '%';
            sliderItems[0].style.marginLeft = '-' + marLeftPercent;
        } else if(marLeftNext > marMax) {                                  // если сл маргин будет больше текущего перелестнем на последний слайд
            marLeft = marMax;
            marLeftPercent = marLeft * 100 + '%';
            sliderItems[0].style.marginLeft = '-' + marLeftPercent;
        } else {
            marLeft = marLeft + 1 / arr.toShow * arr.toSlide;
            marLeftNext = marLeft + 1 / arr.toShow * arr.toSlide;           // маргин следующий за текущим, чтобы определить не вылезет ли он за максимальгый, если да, то вычислим оставшиеся слайды и двинем на оставшиеся слайды
            marLeftPercent = marLeft * 100 + '%';
            sliderItems[0].style.marginLeft = '-' + marLeftPercent;
        }
    }

    function flipSlideLeft()                            // листаем слайды влево
    {
        if(marLeft === 0) {                                        // если находимся в самом начале на первом слайде тогда в лево листнем на последний слайд
            marLeft = marMax;
            marLeftNext = marLeft + 1 / arr.toShow * arr.toSlide;       // маргин следующий за текущим, чтобы определить не вылезет ли он за максимальгый, если да, то вычислим оставшиеся слайды и двинем на оставшиеся слайды
            marLeftPercent = marLeft * 100 + '%';
            sliderItems[0].style.marginLeft = '-' + marLeftPercent;
        } else if((marLeft - 1 / arr.toShow * arr.toSlide) < 0) {              // если при перелистывании влево сл перелистываение выйдет за пределы то есть будет меньше первого слайда
            marLeft = 0;
            marLeftPercent = marLeft * 100 + '%';
            sliderItems[0].style.marginLeft = '-' + marLeftPercent;
        } else {
            marLeft = marLeft - 1 / arr.toShow * arr.toSlide;
            marLeftNext = marLeft + 1 / arr.toShow * arr.toSlide;           // маргин следующий за текущим, чтобы определить не вылезет ли он за максимальгый, если да, то вычислим оставшиеся слайды и двинем на оставшиеся слайды
            marLeftPercent = marLeft * 100 + '%';
            sliderItems[0].style.marginLeft = '-' + marLeftPercent;
        }
    }
    // -------------- / Вспомогательные функции, вызываем в коде слайдера -----------------------
}










lpsSlider({
    overflowHiddenWindowClass: 'slider',
    sliderItemClass: 'slider__item',
    toShow: 3,
    timeOut: 2000,
    speed: 1000,
    toSlide: 2,
    arrows: {
        show: true,
        // arrowsClass: 'arrows',
        arrowPrevClass: 'arrow_prev',
        arrowNextClass: 'arrow_next',
    },
});