// code for clock
document.addEventListener('DOMContentLoaded', function() {
    async function delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async function show() {
        await delay(890);
        timeDiv.style.display = 'block';
        timeFill.style.display = 'none';
    } 

    let hour = document.getElementById('hour');
    let min = document.getElementById('min');
    let sec = document.getElementById('sec');

    let month = document.getElementById('month');
    let day = document.getElementById('day');
    let year = document.getElementById('year');
    let timeDiff = document.getElementById('diff');

    let timeDiv = document.getElementById('time');
    let timeFill = document.getElementById('time-filler');

    timeDiv.style.display = 'none';
    timeFill.style.display = 'block';

    function dateNow() {
        // Create a new Date object in Germany's timezone (CET)
        const options = { timeZone: 'Europe/Berlin', hour12: false };
        const rn = new Date().toLocaleString('en-GB', options);

        const parts = rn.split(', ');
        const [dateStr, timeStr] = parts;

        const [monthNow, dayNow, yearNow] = dateStr.split('/');
        let [hrNow, minNow, secNow] = timeStr.split(':');

        month.innerHTML = monthNow;
        day.innerHTML = dayNow;
        year.innerHTML = `${yearNow} | CET time`;

        if (hrNow > 12) {
            hrNow = hrNow - 12;
        }
        
        if (hrNow == 0) {
            hrNow = 12;
        }
        
        hour.innerHTML = hrNow;
        sec.innerHTML = String(secNow).padStart(2, '0');
        min.innerHTML = String(minNow).padStart(2, '0');

        // time for the user (used to calculate offset for user)
        const userOptions = { hour12: false };
        const userRn = new Date().toLocaleString('en-GB', userOptions);

        const diffMins = (new Date(userRn) - new Date(rn)) / (1000 * 60); // convert to mins
        const diffHours = diffMins / 60; // convert to hours

        let diff;
        
        if(diffHours < 0) {
        diff = `${Math.abs(diffHours)} hours behind | UTC +1`;
        }else if(diffHours > 0){
        diff = `${diffHours} hours ahead | UTC +1`;
        } else{
        diff = `Same timezone | UTC +1`
        }

        timeDiff.innerHTML = diff;

    }

    setInterval(dateNow, 1000);
    show();
});