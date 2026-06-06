    var slides = document.querySelectorAll('.slide');
    var btns = document.querySelectorAll('.btn');
    let currentSlide = 1;

    // Javascript for image slider manual navigation
    var manualNav = function(manual){
      slides.forEach((slide) => {
        slide.classList.remove('active3');

        btns.forEach((btn) => {
          btn.classList.remove('active3');
        });
      });

      slides[manual].classList.add('active3');
      btns[manual].classList.add('active3');
    }

    btns.forEach((btn, i) => {
      btn.addEventListener("click", () => {
        manualNav(i);
        currentSlide = i;
      });
    });

    // Javascript for image slider autoplay navigation
    var repeat = function(active3Class){
      let active3 = document.getElementsByClassName('active3');
      let i = 1;

      var repeater = () => {
        setTimeout(function(){
          [...active3].forEach((active3Slide) => {
            active3Slide.classList.remove('active3');
          });

        slides[i].classList.add('active3');
        btns[i].classList.add('active3');
        i++;

        if(slides.length == i){
          i = 0;
        }
        if(i >= slides.length){
          return;
        }
        repeater();
      }, 10000);
      }
      repeater();
    }
    repeat();