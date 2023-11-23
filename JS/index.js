/* Edit the page if it's on mobile so it works and everything fits (intended for iphone xr)*/
function device() {
    const regex = /Mobi|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
    return regex.test(navigator.userAgent);
}

function preloadImage(url, priority) {
    const img = new Image();
    
    // Set the priority (optional, default is 'auto')
    if (priority) {
      img.imagePriority = priority;
    }
    
    // Set the URL to preload
    img.src = url;
}

if (device()) {
    var imageUrl = 'https://osu-sig.vercel.app/card?user=Hobospider132&mode=std&lang=en&round_avatar=true&animation=true&hue=125&mini=true';
    preloadImage(imageUrl, 'low');
} else {
    var imageUrl = 'https://osu-sig.vercel.app/card?user=Hobospider132&mode=std&lang=en&round_avatar=true&animation=true&hue=200&skills=true';
    preloadImage(imageUrl, 'low');
}

document.addEventListener('DOMContentLoaded', function () {
    window.addEventListener("load", event => {
        const textElement = document.getElementById('visitorCount');
        textElement.style.display = 'none';
    });

    let contact = document.getElementById('contact-wrapper');
    let countClamp = document.getElementById('countClamp');
    let main = document.getElementById('main');
    let line = document.getElementById('line');
    let center = document.getElementById('center');
    let timeDiv = document.getElementById('time');
    let timeFill = document.getElementById('time-filler');
    
    if (device()) { 
        /* If it's on mobile */
        contact.style.width = 'clamp(380px, 8vw, 105px)';
        contact.style.marginLeft = '20px';
        countClamp.style.width = '8vw';
        main.style.marginLeft = '30px';
        line.style.display = 'none';
        center.style.alignContent = 'center';
        timeDiv.style.marginLeft = '60px';
        timeFill.style.marginLeft = '60px';
        window.addEventListener('scroll', function () {
            let osuContainer = document.getElementById('osuContainer');
            let osuLink = document.getElementById('osu');
    
            if (window.scrollY + window.innerHeight > osuContainer.offsetTop) {
                osuLink.src = imageUrl;
                // Remove the scroll event listener after loading the image
                window.removeEventListener('scroll', arguments.callee);
            }
        });
    } else {
        /* If it's on desktop */
        timeDiv.style.marginLeft = '340px';
        timeFill.style.marginLeft = '340px';
        window.addEventListener('scroll', function () {
            let osuContainer = document.getElementById('osuContainer');
            let osuLink = document.getElementById('osu');
    
            if (window.scrollY + window.innerHeight > osuContainer.offsetTop) {
                osuLink.src = imageUrl;
                // Remove the scroll event listener after loading the image
                window.removeEventListener('scroll', arguments.callee);
            }
        });
    }   
});
