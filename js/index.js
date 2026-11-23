const boto = document.getElementById("icona-burger");
const menu = document.getElementById("menupral");
const elementsprincipals = document.querySelectorAll('.puntprincipal');
const botodesplegable = document.getElementById("menulateral-desplegable");
const menulateral = document.getElementById("menulateral");
const tancalateral = document.getElementById("tancalateral");

// Menú principal (mòbil)
boto?.addEventListener('click', () => {
    const obert = menu.classList.toggle('visible');
    boto.setAttribute('aria-expanded', obert);
});

// Menú lateral (només a la pàgina interior)
function alternaLateral(obrir) {
    const obert = menulateral.classList.toggle('actiu', obrir);
    botodesplegable?.setAttribute('aria-expanded', obert);
    if (obert) tancalateral?.focus();
    else botodesplegable?.focus();
}

botodesplegable?.addEventListener('click', () => alternaLateral(true));
tancalateral?.addEventListener('click', () => alternaLateral(false));

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menulateral?.classList.contains('actiu')) alternaLateral(false);
});

// Submenús: només un obert alhora
elementsprincipals.forEach(puntmenu => {
    const titol = puntmenu.querySelector('.titol-puntprincipal');
    if (!titol) return;

    titol.addEventListener('click', () => {
        const obert = puntmenu.classList.toggle('obert');
        titol.setAttribute('aria-expanded', obert);

        elementsprincipals.forEach(altrePare => {
            if (altrePare !== puntmenu) {
                altrePare.classList.remove('obert');
                altrePare.querySelector('.titol-puntprincipal')?.setAttribute('aria-expanded', 'false');
            }
        });
    });
});
