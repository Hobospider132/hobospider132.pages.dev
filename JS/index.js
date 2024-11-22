/* Edit the page if it's on mobile so it works and everything fits (intended for iphone xr)*/

function device() {
    const regex = /Mobi|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
    return regex.test(navigator.userAgent);
}

document.addEventListener('DOMContentLoaded', function () {
    window.addEventListener("load", event => {
        const textElement = document.getElementById('visitorCount');
        textElement.style.display = 'none';
    });  

    lozad('.lozad', {
        load: function(el) {
            el.src = el.dataset.src;
        }
    }).observe()

    let contact = document.getElementById('contact-wrapper');
    let main = document.getElementById('main');
    let center = document.getElementById('center');
    let timeDiv = document.getElementById('time');
    let timeFill = document.getElementById('time-filler');	
    if (device()) { 
        /* If it's on mobile */
        contact.style.width = 'clamp(380px, 8vw, 105px)';
        contact.style.marginLeft = '20px';
        main.style.marginLeft = '30px';
        center.style.alignContent = 'center';
        timeDiv.style.marginLeft = '60px';
        timeFill.style.marginLeft = '60px';
    } else {
        /* If it's on desktop */
        timeDiv.style.marginLeft = '340px';
        timeFill.style.marginLeft = '340px';
    }   
});
