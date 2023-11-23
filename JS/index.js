/* Edit the page if it's on mobile so it works and everything fits (intended for iphone xr)*/
function device() {
    const regex = /Mobi|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
    return regex.test(navigator.userAgent);
}

let preload = document.getElementById('osu-load');
if (device()) {
    preload.src = 'https://osu-sig.vercel.app/card?user=Hobospider132&mode=std&lang=en&round_avatar=true&animation=true&hue=125&mini=true';
} else {
    preload.src = 'https://osu-sig.vercel.app/card?user=Hobospider132&mode=std&lang=en&round_avatar=true&animation=true&hue=200&skills=true';
}

document.addEventListener('DOMContentLoaded', function () {
    window.addEventListener("load", event => {
        const textElement = document.getElementById('visitorCount');
        textElement.style.display = 'none';
    });
    
    let osuLink = document.getElementById('osu');
    let contact = document.getElementById('contact-wrapper');
    let countClamp = document.getElementById('countClamp');
    let main = document.getElementById('main');
    let line = document.getElementById('line');
    let center = document.getElementById('center');
    let timeDiv = document.getElementById('time');
    
    if (device()) { 
        /* If it's on mobile */
        osuLink.src = preload.src;
        contact.style.width = 'clamp(380px, 8vw, 105px)';
        contact.style.marginLeft = '20px';
        countClamp.style.width = 'clamp(380px,8vw,105px)';
        main.style.marginLeft = '30px';
        line.style.display = 'none';
        center.style.alignContent = 'center';
        timeDiv.style.marginLeft = '60px';
    } else {
        /* If it's on desktop */
        osuLink.src = preload.src
        timeDiv.style.marginLeft = '340px';
    }   
});
