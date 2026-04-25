//Code pour le bouton pour remonter la page
const bouton = document.getElementById("up");

bouton.addEventListener('click', allerEnHaut);

window.onscroll = function () { 
    apparait() ;
};

function apparait() {
 
    if (document.body.scrollTop > 500 || document.documentElement.scrollTop > 500) {
        bouton.style.opacity = 1;
        bouton.style.visibility = "visible";
    } else {
        bouton.style.opacity = 0;
        bouton.style.visibility = "hidden";
    }
}

function allerEnHaut() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

let scroll;


window.addEventListener("scroll", () => {
  bouton.style.opacity = "1";

  // Réinitialise le timer
  clearTimeout(scroll);

  // Lance un nouveau timer
  scroll = setTimeout(() => {
    bouton.style.opacity = "0";
  }, 2000);
})



// Menu burger
const menuToggle = document.getElementById('menuToggle');
const burger = document.getElementById('burger');
const menuLien = document.querySelectorAll('#menu a');


burger.addEventListener('click', (e) => {
  e.stopPropagation();
  menuToggle.classList.toggle('active');
});


menuLien.forEach(lien => {
  lien.addEventListener('click', () => {
    menuToggle.classList.remove('active');
  });
});

document.addEventListener('click', () => {
  menuToggle.classList.remove('active');
});




//Effet “machine à écrire” (code issu de CodePen)
var TxtRotate = function (el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
};

TxtRotate.prototype.tick = function () {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];

    if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';

    var that = this;
    var delta = 300 - Math.random() * 100;

    if (this.isDeleting) { delta /= 2; }

    if (!this.isDeleting && this.txt === fullTxt) {
        delta = this.period;
        this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        this.loopNum++;
        delta = 500;
    }

    setTimeout(function () {
        that.tick();
    }, delta);
};

window.onload = function () {
    var elements = document.getElementsByClassName('txt-rotate');
    for (var i = 0; i < elements.length; i++) {
        var toRotate = elements[i].getAttribute('data-rotate');
        var period = elements[i].getAttribute('data-period');
        if (toRotate) {
            new TxtRotate(elements[i], JSON.parse(toRotate), period);
        }
    }
    // INJECT CSS
    var css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = ".txt-rotate > .wrap { border-right: 0.08em solid #666 }";
    document.body.appendChild(css);
};


//Bloc Parcours : fait apparaitre les entrées au scroll (code issu de CodePen)

(function () {
    "use strict";

    const isElementInViewport = el => {
        const rect = el.getBoundingClientRect();
        const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
        return rect.top < viewportHeight && rect.bottom > 0;
    };

    const detectAndAnimate = (selector) => {
        document.querySelectorAll(selector).forEach(element => {
            if (isElementInViewport(element)) {
                element.classList.add('is-visible');
            }
        });
    };

    const handleScroll = () => {
        detectAndAnimate('.animate-on-scroll');
        detectAndAnimate('.animate-on-scroll2');
        detectAndAnimate('.animate-on-scroll3');
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
})();

