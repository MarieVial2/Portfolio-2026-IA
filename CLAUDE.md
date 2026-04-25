# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Présentation du projet

Site portfolio statique de Marie Vial (développeuse web junior). Pas de système de build ni de gestionnaire de paquets — ouvrir `index.html` directement dans un navigateur pour développer.

## Structure des fichiers

- `index.html` — site mono-page avec quatre sections ancre : `#presentation`, `#parcours`, `#realisations`, `#competences`
- `styles/style.css` — feuille de style principale (desktop et grands écrans)
- `styles/style-750.css` — surcharges responsive, chargé via `<link media="screen and (max-width: 750px)">`
- `scripts/script.js` — JS vanilla pour : bouton retour en haut, menu burger, effet machine à écrire dans le header, animations au scroll (`.animate-on-scroll`)
- `cv/` — contient le CV en PDF
- `images/` — toutes les images du site

## Dépendances (CDN, aucune installation locale nécessaire)

- Bootstrap 5.2.3 (CSS + bundle JS)
- Font Awesome 6 (via le kit `dcef3565c8`)
- Google Fonts : Itim, Montserrat, Quicksand

## Conventions importantes

- Tout le contenu est en français — conserver le français pour tous les textes de l'interface.
- Les titres de section suivent un patron cohérent : icônes bookmark encadrant le titre (`<i class="fa-solid fa-bookmark i-left"></i>Titre<i class="fa-solid fa-bookmark i-right"></i>`).
- Les images décoratives qui nécessitent une accessibilité lecteur d'écran utilisent la classe `image-accessibilite` (les positionne hors écran visuellement tout en les conservant dans le DOM).
- Le menu burger est activé/désactivé via la classe `active` sur `#menuToggle` ; cliquer sur un lien de navigation ou n'importe où en dehors le ferme.
- Les animations au scroll ciblent `.animate-on-scroll`, `.animate-on-scroll2`, `.animate-on-scroll3` — ajouter cette classe aux éléments devant apparaître au défilement.
- L'effet machine à écrire dans le header est piloté par les attributs `data-rotate` et `data-period` sur les éléments `.txt-rotate`.
