// code for clock

document.addEventListener('DOMContentLoaded', function () {
    
    async function delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async function show() {
        await delay(890);
        timeFill.style.display = 'none';
        timeDiv.style.display = 'block';
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

    function isDST() {
        const options = { timeZone: 'Australia/Sydney' };
        const today = new Date().toLocaleString('en-GB', options);
        const startDST = new Date(undefined, 9, 1); // October 1st
        const endDST = new Date(undefined, 3, 7);   // April 7th
        
        return today >= startDST.toLocaleString('en-GB', options) &&
               today <= endDST.toLocaleString('en-GB', options);
    }

    function dateNow() {
        const options = { timeZone: 'Australia/Sydney', hour12: false };
        const rn = new Date().toLocaleString('en-GB', options);

        const parts = rn.split(', ');
        const [dateStr, timeStr] = parts;

        const [monthNow, dayNow, yearNow] = dateStr.split('/');
        let [hrNow, minNow, secNow] = timeStr.split(':');

        const isDaylightSavingTime = isDST();
        DSTZone = isDaylightSavingTime ? "AEDT" : "AEST";
        UTCDiff = isDaylightSavingTime ? 11 : 10;

        month.innerHTML = monthNow;
        day.innerHTML = dayNow;
        year.innerHTML = `${yearNow} |  ${DSTZone}`;
        console.log(DSTZone);

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

        if (diffHours < 0) {
           diff = `${Math.abs(diffHours)} hours behind | UTC +${UTCDiff}`;
           console.log(UTCDiff);
        }else if(diffHours > 0){
           diff = `${diffHours} hours ahead | UTC +{UTCDiff}`;
           console.log(UTCDiff);
        } else{
           diff = `UTC +${UTCDiff}`;
           console.log(UTCDiff);
        }

        timeDiff.innerHTML = diff;

    }

    setInterval(dateNow, 1000);
    show();
});