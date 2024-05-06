// Function to check token expiration
export function checkTokenExpiration() {
    const token = localStorage.getItem('userinfo');
    const expirationTime = localStorage.getItem('expirationTime');

    if (token && expirationTime) {
        const currentTime = new Date().getTime();
        if (currentTime > expirationTime) {
            // Token expired, remove from local storage
            localStorage.removeItem('userinfo');
            localStorage.removeItem('expirationTime');
            alert('Your session has expired. Please log in again.');
            // Redirect to login page or perform necessary action
        }
    }
}

// Set token expiration time (24 hours from now)
function setTokenExpiration() {
    const expirationTime = new Date().getTime() + (24*60*60 * 1000); // 24 hours in milliseconds
    localStorage.setItem('expirationTime', expirationTime);
    console.log(expirationTime);
}

// Example usage
// Assume you set the token and expiration time when the user logs in

setTokenExpiration();

// Check token expiration periodically (e.g., every hour)
setInterval(checkTokenExpiration, 60*60 * 1000); // Check every hour