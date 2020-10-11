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

    if(typeof arr.toShow == "undefined") {          // если разработчик не указал при вызове функции сколько items показывать по умеолчанию будет 1
        arr.toShow = 1;
    } 
    if(arr.toShow > sliderItems.length) {           // если разработчик указал что показывать больше слайдо, чем их есть, покажем сколько их есть
        arr.toShow = sliderItems.length;
    }

    const minWidth = (100 / arr.toShow),                                                                 // тут будут проценты для добавление в style каждому item мин ширины, то есть сколько 1 item займет места в окне в процентах. Например если разраб хочет видеть 2 items в окне он ставит toShow: 2 и получается, что minWidth будет 50% (100 / 2) + %
    minWidthPercent = minWidth + '%';
    let marLeft = 0;                                                                                // изначальное значение, для первого элемента, показывает первый item
    let marLeftPercent = marLeft + '%';
    const slideSpeed = arr.speed / 1000 + 's';                                                  // время за которое слайд прокрутится

    
    if(typeof arr.toSlide == "undefined") {         // если разработчик не указал при вызове функции на сколько items листать слайдер по умеолчанию будет 1
        arr.toSlide = 1;
    }
    if(typeof arr.timeOut == "undefined") {         // если разработчик не указал при вызове функции на сколько items листать слайдер по умеолчанию будет 1
        arr.timeOut = 0;
    }
    if(typeof arr.arrows == "undefined") {
        arr.arrows = false;
    }

    
    // ---------- сколько раз надо двигать чтобы добраться до конца полоски слайдов -------------------
    const notVisibleCount = sliderItems.length - arr.toShow;                 // количество невидимых слайдов, оставишхся за окном с overflow = hidden
    const maxDriveCount = notVisibleCount / arr.toSlide;                       // сколько раз двигаем чтобы добраться до конца (максимальное количество движений)
    let currentDriveCount = 0;                                                  // сколько раз уже прокрутили, текущее количество прокруток
    // ---------- / сколько раз надо двигать чтобы добраться до конца полоски слайдов -----------------

    overflowHiddenElement.style.display = 'flex';
    overflowHiddenElement.style.overflow = 'hidden';

    for(let i = 0; i < sliderItems.length; i++) {
        sliderItems[i].style.minWidth = minWidthPercent;                                   // добавим к каждому item мин ширину, исходя сколько разработчик хочет показывать items в окне
        sliderItems[i].style.transition = slideSpeed + ' margin-left';              
        sliderItems[0].style.marginLeft = '-' + marLeftPercent;                      // изначальное значение при загрузке сранице, для первого элемента, показывает первый item
    }

    if(arr.timeOut != 0) {                                                          // если пользхователь захотел слайдить через определенный интервал времени
        setInterval(() => {
            if(currentDriveCount < maxDriveCount) {                                          // если ещё не дошли до последнего слайда
                if((currentDriveCount + 1) >= maxDriveCount) {                     // если следующее движение слайда последнее, то выполним этот код, сдесь вычислим сколько слайдов осталось и двинем на это количество
                    const slidesLeft = sliderItems.length - arr.toShow - (currentDriveCount * arr.toSlide);         // сколько слайдов осталось
                    marLeft = (marLeft + slidesLeft / arr.toShow);                     // новый маргин с учетом сколько слайдов осталось
                    marLeftPercent = marLeft * 100 + '%';
                    sliderItems[0].style.marginLeft = '-' + marLeftPercent;
                    currentDriveCount = -1;                                          // когда достигаем последнего слайда обнуляем счетчик прокруток, чтобы он продолжал работать дальше, так же
                    marLeft = - (1 / arr.toShow * arr.toSlide);                     // делаем маргин таким образом, чтобы при его следующем вычислении он получил значение 0 и слайдер прокуртил на 1 слайд
                } else {
                    marLeft = (marLeft + 1 / arr.toShow * arr.toSlide);                     // новый маргин с учетом сколько разработчик указал он хочет прокуручивать и видеть слайдов
                    marLeftPercent = marLeft * 100 + '%';
                    sliderItems[0].style.marginLeft = '-' + marLeftPercent;     // вставляем новый маргин для прокрутки
                    currentDriveCount++;
                }
            }
        }, arr.timeOut);
    }

    if(arr.arrows.show) {                                                            // если показываем стрелки
        const arrowPrev = document.querySelector('.' + arr.arrows.arrowPrevClass),
              arrowNext = document.querySelector('.' + arr.arrows.arrowNextClass);

        arrowNext.addEventListener('click', () => {
            console.log('ad');
        });
        // overflowHiddenElement.insertAdjacentHTML('afterend', `<span class="${arr.arrows.arrowsClass} ${arr.arrows.arrowNextClass}"></span>`);
        // overflowHiddenElement.insertAdjacentHTML('afterend', `<span class="${arr.arrows.arrowsClass} ${arr.arrows.arrowPrevClass}"></span>`);
    }
}







lpsSlider({
    overflowHiddenWindowClass: 'slider',
    sliderItemClass: 'slider__item',
    toShow: 2,
    // timeOut: 1000,
    speed: 1000,
    toSlide: 1,
    arrows: {
        show: true,
        arrowsClass: 'arrows',
        arrowPrevClass: 'arrow_prev',
        arrowNextClass: 'arrow_next',
    },
});