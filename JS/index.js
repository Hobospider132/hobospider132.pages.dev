/*Code modified from http://xahlee.info/js/js_raining_hearts.html (For raining hearts only)*/

document.addEventListener('DOMContentLoaded', function () {
    window.addEventListener("load", event => {
        const textElement = document.getElementById('visitorCount');
        textElement.style.display = 'none';
        Love()
    });
    function Love() {
        const num_of_hearts = 20;
        const driftX = 50;
        const gravity = 25;
        const update_speed = 900; // millisecond
        const heartTypes = [... "💖💗🌸🌺"];

        const viewportWidth = document.documentElement.clientWidth;

        const viewSpaceWidth = viewportWidth + 50;

        const randomInt = ((xmin, xmax) => (Math.floor(Math.random() * (xmax + 1 - xmin) + xmin)));

        const randomReal = ((xmin, xmax) => (Math.random() * (xmax - xmin) + xmin));

        const randomColor = () => ("hsla" + "(" + randomInt(0, 360) + "," +
            randomInt(70, 100) + "%," +
            randomInt(40, 60) + "%," +
            randomReal(0.2, 0.3) + ")");

        const heart_box = document.createElement("div");
        heart_box.setAttribute("id", "heart_box");

        const f_new_heart = (() => {
            const yy = document.createElement("div");
            yy.textContent = heartTypes[Math.floor(Math.random() * heartTypes.length)];
            yy["xxleft"] = randomInt(0, viewSpaceWidth);
            yy.style.left = yy["xxleft"] + "px";
            yy["xxtop"] = -90;
            yy.style.top = yy["xxtop"] + "px";
            yy["xrotate"] = randomInt(-150, 150);
            yy.style.transform = "rotate(" + yy["xrotate"] + "deg)";
            yy.style.color = randomColor();
            yy["xsize"] = 10 + randomInt(0, 30);
            yy.style.fontSize = yy["xsize"] + "px";

            yy.style.position = "fixed";
            yy.style.zIndex = randomInt(100, 9999).toString();
            yy.style.transition = "top linear 1.5s, left linear 1.5s, transform linear 1.5s";
            return yy;
        });

        { for (let i = 0; i < num_of_hearts; i++) { heart_box.appendChild(f_new_heart()) } };

        document.body.appendChild(heart_box);

        const heartNodes = Array.from(heart_box.children);

        const f_update_positions = (() => {

            heartNodes.forEach((xx) => {
                xx["xxleft"] +=
                    (() => {
                        const rnd = Math.random();
                        if (rnd < 0.3333) {
                            return 0;
                        } else if (rnd < 0.6666) {
                            return driftX;
                        } else {
                            return -driftX;
                        }
                    })();

                xx["xxtop"] += (xx["xsize"] / 20) * gravity;

                if (xx["xrotate"] !== 0) {
                    xx["xrotate"] += randomInt(-30, 60);
                    xx.style.transform = "rotate(" + xx["xrotate"] + "deg)";
                }

                xx.style.left = xx["xxleft"] + "px";
                xx.style.top = xx["xxtop"] + "px";

                const heartBottom = xx.getBoundingClientRect().bottom;
                const viewHeight = document.documentElement.clientHeight;
                const removeThreshold = viewHeight + 100;

                if (heartBottom > removeThreshold) {
                    xx.remove(); // Remove the heart element from the DOM
                }
            });
            
        });
        setInterval(f_update_positions, update_speed);
    };     
      
    /* Edit the page if it's on mobile so it works and everything fits (intended for iphone xr)*/
    function device() {
        const regex = /Mobi|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
        return regex.test(navigator.userAgent);
    }

    let osuLink = document.getElementById('osu');
    let contact = document.getElementById('contact-wrapper');
    let countClamp = document.getElementById('countClamp');
    let main = document.getElementById('main');
    let line = document.getElementById('line');
    let center = document.getElementById('center');
    let timeDiv = document.getElementById('time');

    if (device()) { /* If it's on mobile */
        osuLink.src = "https://osu-sig.vercel.app/card?user=Hobospider132&mode=std&lang=en&round_avatar=true&animation=true&hue=125&mini=true";
        contact.style.width = 'clamp(380px, 8vw, 105px)';
        contact.style.marginLeft = '20px';
        countClamp.style.width = 'clamp(380px,8vw,105px)';
        main.style.marginLeft = '30px';
        line.style.display = 'none';
        center.style.alignContent = 'center';
        timeDiv.style.marginLeft = '60px';
    } else {
        osuLink.src = "https://osu-sig.vercel.app/card?user=Hobospider132&mode=std&lang=en&round_avatar=true&animation=true&hue=200&skills=true";
        timeDiv.style.marginLeft = '340px';
    }   
});
