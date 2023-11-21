/*Code modified from http://xahlee.info/js/js_raining_hearts.html (For raining hearts only)*/
// This somehow breaks without the hearts function??

document.addEventListener('DOMContentLoaded', function () {
    window.addEventListener("load", event => {
        const textElement = document.getElementById('visitorCount');
        textElement.style.display = 'none';
        Love()
    });
      
    /* Edit the page if it's on mobile so it works and everything fits (intended for iphone xr)*/
    function device() {
        const regex = /Mobi|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
        return regex.test(navigator.userAgent);
    }
    
    const mobileLink = "https://osu-sig.vercel.app/card?user=Hobospider132&mode=std&lang=en&round_avatar=true&animation=true&hue=125&mini=true"
    const desktopLink = "https://osu-sig.vercel.app/card?user=Hobospider132&mode=std&lang=en&round_avatar=true&animation=true&hue=200&skills=true"

    let osuLink = document.getElementById('osu');
    let contact = document.getElementById('contact-wrapper');
    let countClamp = document.getElementById('countClamp');
    let main = document.getElementById('main');
    let line = document.getElementById('line');
    let center = document.getElementById('center');
    let timeDiv = document.getElementById('time');

    if (device()) { /* If it's on mobile */
        osuLink.src = mobileLink.src;
        contact.style.width = 'clamp(380px, 8vw, 105px)';
        contact.style.marginLeft = '20px';
        countClamp.style.width = 'clamp(380px,8vw,105px)';
        main.style.marginLeft = '30px';
        line.style.display = 'none';
        center.style.alignContent = 'center';
        timeDiv.style.marginLeft = '60px';
    } else {
        osuLink.src = desktopLink.src;
        timeDiv.style.marginLeft = '340px';
    }   
});
