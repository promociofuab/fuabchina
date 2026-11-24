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

// Capa flotant WeChat (landing): s'amaga quan el bloc de contacte entra a la
// pantalla i es manté amagada mentre l'usuari és per sota del bloc.
const wechatFlotant = document.getElementById("wechat-flotant");
const blocContacte = document.getElementById("contacta");

if (wechatFlotant && blocContacte && 'IntersectionObserver' in window) {
    new IntersectionObserver(([entrada]) => {
        const amagar = entrada.isIntersecting || entrada.boundingClientRect.top < 0;
        wechatFlotant.classList.toggle('amagada', amagar);
    }).observe(blocContacte);
}

// Plegar/desplegar la capa flotant: plegada només en queda el títol
const botoPlega = document.getElementById("wechat-flotant-plega");

botoPlega?.addEventListener('click', () => {
    const plegada = wechatFlotant.classList.toggle('plegada');
    botoPlega.setAttribute('aria-expanded', !plegada);
    botoPlega.setAttribute('aria-label', plegada ? '展开微信咨询' : '收起微信咨询');
});
