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
        const currentDate = new Date();
        const isDST = isDaylightSavingTime(currentDate);

        const options = { timeZone: 'Australia/Sydney', hour12: false };
        const rn = currentDate.toLocaleString('en-GB', options);

        const parts = rn.split(', ');
        const [dateStr, timeStr] = parts;

        const [monthNow, dayNow, yearNow] = dateStr.split('/');
        let [hrNow, minNow, secNow] = timeStr.split(':');

        month.innerHTML = monthNow;
        day.innerHTML = dayNow;
        year.innerHTML = `${yearNow} | ${isDST ? 'AEDT' : 'AEST'} time`;

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
        const userRn = currentDate.toLocaleString('en-GB', userOptions);

        const diffMins = (currentDate - new Date(rn)) / (1000 * 60); // convert to mins
        const diffHours = diffMins / 60; // convert to hours

        let diff;

        if (diffHours < 0) {
            diff = `${Math.abs(diffHours)} hours behind | UTC +${isDST ? 11 : 10}`;
        } else if (diffHours > 0) {
            diff = `${diffHours} hours ahead | UTC +${isDST ? 11 : 10}`;
        }

        timeDiff.innerHTML = diff;
    }

    // Function to check if daylight saving time is currently observed
    function isDaylightSavingTime(date) {
        const january = new Date(date.getFullYear(), 0, 1);
        const july = new Date(date.getFullYear(), 6, 1);
        return date.getTimezoneOffset() < Math.max(january.getTimezoneOffset(), july.getTimezoneOffset());
    }

    setInterval(dateNow, 1000);
    show();
});
