//code currently not used, feature has been removed but code has been kept 
//in case I change my mind

document.addEventListener('DOMContentLoaded', function(){

    var birthBar = document.querySelector('.birth-bar');
    var birthProgress = document.querySelector('.birth-progress');
    var birthdayMessage = document.getElementById('birthdayMessage');
    var birthText = document.getElementById('birthText');

    // Calculate the current date
    var currentDate = new Date();
    var currentDay = currentDate.getDate();
    var currentMonth = currentDate.getMonth() + 1; // Months are zero-based, so we add 1

    // Set the target date for resetting the birthday bar
    var resetMonth = 1;
    var resetDay = 22;

    if (currentDay === resetDay) {
        birthProgress.style.width = '0';
    } else if (currentDay === resetDay - 1 && currentMonth === resetMonth) {
        birthBar.style.display = 'none';
        birthdayMessage.style.display = 'block';
        birthText.style.display = 'none';
    } else {
        var totalMonths = 12; // Total number of months in a year
        var monthProgress = ((currentMonth - 1) / totalMonths) * 100;

        // Set the width of the birth progress element
        birthProgress.style.width = monthProgress + '%';
    }
});