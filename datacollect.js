function sendDataToServer(userData) {
    fetch('http://localhost:5000/collectuserdata', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    }).then(response => {
        if (response.ok) {
            console.log('User data sent successfully');
        } else {
            console.error('Error sending user data:', response.statusText);
        }
    }).catch(error => {
        console.error('Error sending user data:', error);
    });
}

document.addEventListener('DOMContentLoaded', function() { 
    const userData = {
        userAgent: navigator.userAgent,
        language: navigator.language,
        cookiesEnabled: navigator.cookieEnabled,
        screenWidth: window.screen.width,
        screenHeight: window.screen.height,
        colorDepth: window.screen.colorDepth,
        latitude: null,  // Placeholder for lat
        longitude: null   // Placeholder for lon
    };

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            userData.latitude = position.coords.latitude;
            userData.longitude = position.coords.longitude;
            sendDataToServer(userData);
        });
    } else {
        sendDataToServer(userData);
    }
});
