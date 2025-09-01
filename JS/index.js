/* Edit the page if it's on mobile so it works and everything fits (intended for iphone xr)*/

function device() {
    const regex = /Mobi|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
    return regex.test(navigator.userAgent);
}

document.addEventListener('DOMContentLoaded', function () {
    let contact = document.getElementById('contact-wrapper');
    let main = document.getElementById('main');
    let center = document.getElementById('center');
    if (device()) { 
        /* If it's on mobile */
        contact.style.width = 'clamp(380px, 8vw, 105px)';
		document.body.style.justifySelf = "center";
		document.body.style.zoom = "70%";	
        center.style.alignContent = 'center'; 
    } else {
        /* If it's on desktop */    
        var cursor = document.getElementById("cursor");
	document.body.addEventListener("mousemove", function(e) {
	  cursor.style.left = e.clientX + "px",
		cursor.style.top = e.clientY + "px";
	});
    }   
});

