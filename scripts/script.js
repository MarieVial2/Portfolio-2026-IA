// Détection de la préférence de mouvement réduit
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

//Code pour le bouton pour remonter la page
const bouton = document.getElementById("up");

bouton.addEventListener('click', allerEnHaut);

window.onscroll = function () {
    apparait();
};

function apparait() {

    if (document.body.scrollTop > 500 || document.documentElement.scrollTop > 500) {
        bouton.style.opacity = 1;
        bouton.style.visibility = "visible";
        bouton.removeAttribute('tabindex');
    } else {
        bouton.style.opacity = 0;
        bouton.style.visibility = "hidden";
        bouton.setAttribute('tabindex', '-1');
    }
}

function allerEnHaut() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

let scroll;


window.addEventListener("scroll", () => {
  bouton.style.opacity = "1";
  bouton.removeAttribute('tabindex');

  // Réinitialise le timer
  clearTimeout(scroll);

  // Lance un nouveau timer
  scroll = setTimeout(() => {
    bouton.style.opacity = "0";
    bouton.setAttribute('tabindex', '-1');
  }, 2000);
})



// Menu burger
const menuToggle = document.getElementById('menuToggle');
const burger = document.getElementById('burger');
const menuLien = document.querySelectorAll('#menu a');

function ouvrirMenu() {
  menuToggle.classList.add('active');
  burger.setAttribute('aria-expanded', 'true');
  burger.setAttribute('aria-label', 'Fermer le menu');
}

function fermerMenu() {
  menuToggle.classList.remove('active');
  burger.setAttribute('aria-expanded', 'false');
  burger.setAttribute('aria-label', 'Ouvrir le menu');
}

burger.addEventListener('click', (e) => {
  e.stopPropagation();
  if (menuToggle.classList.contains('active')) {
    fermerMenu();
  } else {
    ouvrirMenu();
  }
});


menuLien.forEach(lien => {
  lien.addEventListener('click', () => {
    fermerMenu();
  });
});

document.addEventListener('click', () => {
  fermerMenu();
});

// Fermeture du menu burger avec Escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && menuToggle.classList.contains('active')) {
    fermerMenu();
    burger.focus();
  }
});




//Effet "machine à écrire" (code issu de CodePen)
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
            try {
                var options = JSON.parse(toRotate);
                if (prefersReducedMotion) {
                    // Affiche directement la première option, sans animation
                    elements[i].textContent = options[0];
                } else {
                    new TxtRotate(elements[i], options, period);
                }
            } catch (err) { /* Ignore parsing errors */ }
        }
    }
    // INJECT CSS (curseur clignotant uniquement si l'animation est active)
    if (!prefersReducedMotion) {
        var css = document.createElement("style");
        css.type = "text/css";
        css.innerHTML = ".txt-rotate > .wrap { border-right: 0.08em solid #666 }";
        document.body.appendChild(css);
    }
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


// Compétences : pattern tablist accessible (clic + flèches + Home/End)
const tabs = Array.from(document.querySelectorAll('.competences-pill[role="tab"]'));

function activerTab(tab, donnerFocus = true) {
    const wrap = tab.closest('.competences-wrap');
    const target = tab.dataset.competence;

    wrap.querySelectorAll('.competences-pill').forEach(t => {
        t.classList.remove('is-active');
        t.setAttribute('aria-selected', 'false');
        t.setAttribute('tabindex', '-1');
    });
    wrap.querySelectorAll('.competences-content').forEach(c => {
        c.classList.remove('is-active');
        c.setAttribute('hidden', '');
    });

    tab.classList.add('is-active');
    tab.setAttribute('aria-selected', 'true');
    tab.setAttribute('tabindex', '0');
    if (donnerFocus) tab.focus();

    const panneau = wrap.querySelector(`[data-competence-target="${target}"]`);
    if (panneau) {
        panneau.classList.add('is-active');
        panneau.removeAttribute('hidden');
    }
}

tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => activerTab(tab, false));

    tab.addEventListener('keydown', (e) => {
        let cible = null;
        if (e.key === 'ArrowRight') {
            cible = tabs[(index + 1) % tabs.length];
        } else if (e.key === 'ArrowLeft') {
            cible = tabs[(index - 1 + tabs.length) % tabs.length];
        } else if (e.key === 'Home') {
            cible = tabs[0];
        } else if (e.key === 'End') {
            cible = tabs[tabs.length - 1];
        }
        if (cible) {
            e.preventDefault();
            activerTab(cible, true);
        }
    });
});
