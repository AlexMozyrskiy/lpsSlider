function lpsSlider(e){const t=document.querySelector("."+e.overflowHiddenWindowClass),s=document.querySelectorAll("."+e.sliderItemClass),r=s.length;t.style.display="flex",t.style.overflow="hidden",void 0===e.toShow&&(e.toShow=1),e.toShow>r&&(e.toShow=r);const o=100/e.toShow,a=o+"%";let n=0,l=n+"%";const d=1/e.toShow*e.toSlide;let i=n+d;const c=e.speed/1e3+"s";let u=(r-e.toShow)/e.toShow;void 0===e.toSlide&&(e.toSlide=1),void 0===e.timeOut&&(e.timeOut=0),void 0===e.arrows&&(e.arrows=!1),void 0===e.dots&&(e.dots=!1);for(let e=0;e<r;e++)s[e].style.minWidth=a,s[e].style.transition=c+" margin-left",s[0].style.marginLeft="-"+l;if(void 0!==e.arrows.show){if(void 0===e.arrows.prevClass)alert("dear developer, you indicated arr.arrows.show, which means you wanted to use scroll paths, but you did not specify the arrow class: arr.arrows.prevClass");else var w=document.querySelector("."+e.arrows.prevClass);if(void 0===e.arrows.nextClass)alert("dear developer, you indicated arr.arrows.show, which means you wanted to use scroll paths, but you did not specify the arrow class: arr.arrows.nextClass");else var v=document.querySelector("."+e.arrows.nextClass)}if(0!=e.timeOut){var p=setInterval(y,e.timeOut);t.addEventListener("mouseover",m),t.addEventListener("mouseout",h)}if(e.arrows.show&&(0!=e.timeOut&&(v.addEventListener("mouseover",m),v.addEventListener("mouseout",h),w.addEventListener("mouseover",m),w.addEventListener("mouseout",h)),v.addEventListener("click",()=>{y()}),w.addEventListener("click",()=>{0===n?(i=(n=u)+d,l=100*n+"%",s[0].style.marginLeft="-"+l,L()):n-d<0?(l=100*(n=0)+"%",s[0].style.marginLeft="-"+l,L()):(i=(n-=d)+d,l=100*n+"%",s[0].style.marginLeft="-"+l,L())})),e.dots.show)if(void 0!==e.dots.wrapperClass){t.insertAdjacentHTML("afterend",`<div class="${e.dots.wrapperClass}"></div>`);const s=document.querySelector("."+e.dots.wrapperClass);for(let t=0;t<r;t++)s.insertAdjacentHTML("beforeend",`<span class="${e.dots.class}"></span>`)}else{t.insertAdjacentHTML("afterend",'<div class="lpsSliderDotsWrapper"></div>');const s=document.querySelector(".lpsSliderDotsWrapper");s.style.cssText="\n                                            display: flex;\n                                            align-items: center;\n                                            justify-content: center;\n                                            ";for(let e=0;e<r;e++)s.insertAdjacentHTML("beforeend",`<span class="lpsSliderDot" style="height: 50px; width: 50px; background-color: gray; border-radius: 50%; cursor: pointer; text-align: center;"><div style="padding-top: 50%; transform: translateY(-25%);">${e+1}</div></span>`);var f=document.getElementsByClassName("lpsSliderDot");f[0].children[0].style.transform="scale(2) translateY(-25%)";for(let t=0;t<r;t++)f[t].addEventListener("mouseover",m),f[t].addEventListener("mouseout",h),f[t].addEventListener("click",function(){t<=r-e.toShow?S(t):S(r-e.toShow)})}function m(e){clearInterval(p)}function h(t){p=setInterval(y,e.timeOut)}function y(){n===u?(i=(n=0)+d,l=100*n+"%",s[0].style.marginLeft="-"+l,L()):i>u?(l=100*(n=u)+"%",s[0].style.marginLeft="-"+l,L()):(i=(n+=d)+d,l=100*n+"%",s[0].style.marginLeft="-"+l,L())}function S(e){i=(n=e*(o/100))+d,l=100*n+"%",s[0].style.marginLeft="-"+l,L()}function L(){if(e.dots.show&&void 0===e.dots.wrapperClass){for(let e=0;e<r;e++)f[e].children[0].style.transform="scale(1) translateY(-25%)";f[Math.round(100*n/o)].children[0].style.transform="scale(2) translateY(-25%)"}}}lpsSlider({overflowHiddenWindowClass:"slider",sliderItemClass:"slider__item",toShow:3,timeOut:2e3,speed:500,toSlide:2,arrows:{show:!0,prevClass:"arrow_prev",nextClass:"arrow_next"},dots:{show:!0,wrapperClass:"slider__dots-wrapper",class:"slider__dot"}});