/* Edit the page if it's on mobile so it works and everything fits (intended for iphone xr)*/

function device() {
    const regex = /Mobi|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
    return regex.test(navigator.userAgent);
}

if (device()) {
    var imageUrl = 'https://osu-sig.vercel.app/card?user=Hobospider132&mode=std&lang=en&round_avatar=true&animation=true&hue=125&mini=true';
} else {
    var imageUrl = 'https://osu-sig.vercel.app/card?user=Hobospider132&mode=std&lang=en&round_avatar=true&animation=true&hue=200&skills=true';
}

function load() {
    window.addEventListener('scroll', function () {
        let osuContainer = document.getElementById('osuContainer');
        let osuLink = document.getElementById('osu');

        if (window.scrollY + window.innerHeight > osuContainer.offsetTop) {
            osuLink.src = imageUrl;
            window.removeEventListener('scroll', arguments.callee);
        }
    });
}

document.addEventListener('DOMContentLoaded', function () {
    window.addEventListener("load", event => {
        const textElement = document.getElementById('visitorCount');
        textElement.style.display = 'none';
    });

    lozad('.lozad', {
        load: function(el) {
            el.src = el.dataset.src;
            el.onload = function() {
                el.classList.add('fade')
            }
        }
    }).observe()

    let contact = document.getElementById('contact-wrapper');
    let main = document.getElementById('main');
    let line = document.getElementById('line');
    let center = document.getElementById('center');
    let timeDiv = document.getElementById('time');
    let timeFill = document.getElementById('time-filler');	
    let osuLink = document.getElementById('osu');
    if (device()) { 
        /* If it's on mobile */
        contact.style.width = 'clamp(380px, 8vw, 105px)';
        contact.style.marginLeft = '20px';
        main.style.marginLeft = '30px';
        line.style.display = 'none';
        center.style.alignContent = 'center';
        timeDiv.style.marginLeft = '60px';
        timeFill.style.marginLeft = '60px';
        load();
    } else {
        /* If it's on desktop */
        timeDiv.style.marginLeft = '340px';
        timeFill.style.marginLeft = '340px';
        load();
    }   
});
