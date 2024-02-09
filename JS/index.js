/* Edit the page if it's on mobile so it works and everything fits (intended for iphone xr)*/
function device() {
    const regex = /Mobi|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
    return regex.test(navigator.userAgent);
}

function preloadImage(url, priority) {
    const img = new Image();
    if (priority) {
      img.imagePriority = priority;
    }
    img.src = url;
}

preloadImage("https://hobospider132.github.io/images/discord.webp", 'high');
preloadImage("https://hobospider132.github.io/images/twitter.webp", 'high');
preloadImage("https://hobospider132.github.io/images/reddit.webp", 'high');
preloadImage("https://hobospider132.github.io/images/envelope.webp", 'high');
preloadImage("https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Osu%21_Logo_2016.svg/512px-Osu%21_Logo_2016.svg.png", 'high');

if (device()) {
    var imageUrl = 'https://osu-sig.vercel.app/card?user=Hobospider132&mode=std&lang=en&mini=true';
    preloadImage(imageUrl, 'low');
} else {
    var imageUrl = 'https://osu-sig.vercel.app/card?user=Hobospider132&mode=std&lang=en&w=400&h=233';
    preloadImage(imageUrl, 'low');
}

document.addEventListener('DOMContentLoaded', function () {
    window.addEventListener("load", event => {
        const textElement = document.getElementById('visitorCount');
        textElement.style.display = 'none';
    });

    let contact = document.getElementById('contact-wrapper');
    let main = document.getElementById('main');
    let line = document.getElementById('line');
    let center = document.getElementById('center');
    let timeDiv = document.getElementById('time');
    let timeFill = document.getElementById('time-filler');	
    
    if (device()) { 
        /* If it's on mobile */
        contact.style.width = 'clamp(380px, 8vw, 105px)';
        contact.style.marginLeft = '20px';
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
