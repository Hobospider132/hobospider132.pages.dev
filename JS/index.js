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

    let contact = document.getElementById('contact-wrapper');
    let main = document.getElementById('main');
    let center = document.getElementById('center');
    let osuLink = document.getElementById('osu');
    if (device()) { 
        /* If it's on mobile */
        contact.style.width = 'clamp(380px, 8vw, 105px)';
        main.style.marginLeft = '30px';
        center.style.alignContent = 'center';
        osuLink.src = "https://osu-sig.vercel.app/card?user=Hobospider132&mode=std&lang=en&round_avatar=true&animation=true&hue=125&mini=true"; 
    } else {
        /* If it's on desktop */
        osuLink.src = 'https://osu-sig.vercel.app/card?user=Hobospider132&mode=std&lang=en&round_avatar=true&animation=true&hue=200&skills=true';     
        var cursor = document.getElementById("cursor");
		document.body.addEventListener("mousemove", function(e) {
		  cursor.style.left = e.clientX + "px",
			cursor.style.top = e.clientY + "px";
		});
    }   
});
