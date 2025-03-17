// code for clock

document.addEventListener('DOMContentLoaded', function () {

    var timeDiv = document.getElementById('time');
    var timeFill = document.getElementById('time-filler');
    timeDiv.style.display = 'none';
    
    async function delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async function show() {
        await delay(890);
        timeFill.style.display = 'none'
        timeDiv.style.display = 'block';
    }

    function isDST() {
        const AusOptions = { timeZone: 'Australia/Sydney', hour24: true };
        const AusToday = new Date().toLocaleString('en-GB', AusOptions);
    
        const [, AusTime]  = AusToday.split(', ');
    
        let [AusHr] = AusTime.split(':');
    
        const UTCOptions = { timeZone: 'UTC', hour12: true};
        const UTCToday = new Date().toLocaleString('en-GB', UTCOptions);
    
        const [, UTCTime] = UTCToday.split(', ');
    
        let [UTCHr] = UTCTime.split(":");
    
        let num_AusHr = Number(AusHr);
        let num_UTCHr = Number(UTCHr);        
        // console.log("Australia time: ", num_AusHr);
        // console.log("UTC time: ", num_UTCHr);
        // console.log(num_AusHr - num_UTCHr);
        return num_AusHr - num_UTCHr === 11;
    }

    function dateNow() {

        let hour = document.getElementById('hour');
        let min = document.getElementById('min');
        let sec = document.getElementById('sec');
    
        let month = document.getElementById('month');
        let day = document.getElementById('day');
        let year = document.getElementById('year');
        let timeDiff = document.getElementById('diff');
    
        const options = { timeZone: 'Australia/Sydney', hour12: false };
        const rn = new Date().toLocaleString('en-GB', options);
    
        const parts = rn.split(', ');
        const [dateStr, timeStr] = parts;
    
        const [monthNow, dayNow, yearNow] = dateStr.split('/');
        let [hrNow, minNow, secNow] = timeStr.split(':');

        const DST = isDST();
        DSTZone = DST ? "AEDT" : "AEST";
        UTCDiff = DST ? 11 : 10;

        month.innerHTML = monthNow;
        day.innerHTML = dayNow;
        year.innerHTML = `${yearNow} |  ${DSTZone}`;

        if (hrNow > 12) {
            hrNow = hrNow - 12;
        } 

        if (hrNow == 0) {
            hrNow = 12;
        }
        
        hour.innerHTML = String(hrNow);
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
        }else if(diffHours > 0){
           diff = `${diffHours} hours ahead | UTC +{UTCDiff}`;
        } else{
           diff = `UTC +${UTCDiff}`;
        }
        timeDiff.innerHTML = diff;
    }

    setInterval(dateNow, 1000);
    show();
});
