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
- Les titres de section suivent un patron cohérent : `<h3><span class="lbl-row"><i class="fa-solid fa-feather i-left"></i><span class="lbl">Titre</span><i class="fa-solid fa-feather i-right"></i></span></h3>` — traits horizontaux haut/bas, plumes dorées encadrant le titre, rangée d'étoiles ✦ générée via `::after`.
- Les images décoratives qui nécessitent une accessibilité lecteur d'écran utilisent la classe `image-accessibilite` (les positionne hors écran visuellement tout en les conservant dans le DOM).
- Le menu burger est activé/désactivé via la classe `active` sur `#menuToggle` ; cliquer sur un lien de navigation ou n'importe où en dehors le ferme.
- Les animations au scroll ciblent `.animate-on-scroll`, `.animate-on-scroll2`, `.animate-on-scroll3` — ajouter cette classe aux éléments devant apparaître au défilement.
- L'effet machine à écrire dans le header est piloté par les attributs `data-rotate` et `data-period` sur les éléments `.txt-rotate`.

## Accessibilité

Le site a été mis aux normes WCAG 2.1 AA tout en conservant strictement l'apparence visuelle. Points à respecter pour les évolutions futures :

- **Structure** : un unique `<h1>` global masqué via `.image-accessibilite` en haut du `<body>`, suivi d'un skip link `.skip-link` (visible uniquement au focus). Tout le contenu principal vit dans `<main id="contenu">`. Chaque `<section>` est reliée à son titre via `aria-labelledby`.
- **Hiérarchie des titres** : `<h2>` pour le header, `<h3>` pour les titres de section, `<h4>` pour les cartes (parcours, réalisations, étapes de présentation). Le footer utilise les classes `.footer-brand` (h2) et `.footer-title` (h3) qui répliquent le visuel des anciens `<h5>`/`<h6>`. Les logos "Marie Vial" sont des `<span class="brand-name">`, jamais des `<h1>`.
- **Menu burger** : `<button id="burger">` avec `aria-expanded`, `aria-controls="menu"`, `aria-label` mis à jour en JS ("Ouvrir le menu" / "Fermer le menu"). La touche `Escape` ferme le menu et restaure le focus sur le bouton.
- **Bouton retour en haut** : `<button id="up">` avec `aria-label`. Son `tabindex` est géré dynamiquement (`-1` quand caché) pour ne pas être atteignable au clavier dans cet état.
- **Onglets "Compétences"** : pattern WAI-ARIA tablist complet (`role="tab"`/`tabpanel`, `aria-selected`, `aria-controls`, `aria-labelledby`, attribut `hidden` sur les panneaux inactifs, navigation flèches/Home/End avec roving `tabindex`). Voir `activerTab()` dans `script.js`.
- **Icônes Font Awesome** : toute icône décorative (toujours accompagnée d'un libellé textuel) doit avoir `aria-hidden="true"`. Les icônes seules (réseaux sociaux du footer) gardent un `aria-label` sur le `<a>` parent.
- **Liens externes** (`target="_blank"`) : toujours ajouter `rel="noopener noreferrer"` et un `aria-label` indiquant "(ouvre dans un nouvel onglet)".
- **Préférence de mouvement réduit** : la media query `prefers-reduced-motion: reduce` dans `style.css` désactive animations et transitions. Côté JS, l'effet machine à écrire est remplacé par un libellé statique (`prefersReducedMotion` au début de `script.js`).
- **Fallback no-JS** : un `<style>` dans `<noscript>` rend visibles les éléments `.animate-on-scroll*` quand JS est désactivé.
- **Focus** : règle globale `:focus-visible` (contour doré 2 px, offset 3 px). Ne pas la supprimer.
- **Images décoratives** : `alt=""` + `role="presentation"`. Pour celles qui doivent être annoncées au lecteur d'écran tout en restant invisibles, utiliser la classe `.image-accessibilite`.
