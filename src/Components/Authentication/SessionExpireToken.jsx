// Function to check token expiration
export function checkTokenExpiration(onTokenExpire) {
    const token = localStorage.getItem('userinfo');
    const expirationTime = localStorage.getItem('expirationTime');

    if (token && expirationTime) {
        const currentTime = new Date().getTime();
        const remainingTime = parseInt(expirationTime) - currentTime;

        if (remainingTime <= 0) {
            // Token expired, remove from local storage
            localStorage.removeItem('userinfo');
            localStorage.removeItem('expirationTime');
            alert('Your session has expired. Please log in again.');
            // Redirect to login page or perform necessary action
            onTokenExpire();
        } else {
            console.log(`Time remaining until token expiration: ${remainingTime} milliseconds`);
        }
    } else {
        // If either token or expirationTime is missing, prompt the user to log in
        if (!token) {
            console.warn('No token found in local storage.');
        }
        if (!expirationTime) {
            console.warn('No expiration time found in local storage.');
        }
        
        onTokenExpire(); 
    }
}

// Set token expiration time (24 hours from now)
export function setTokenExpiration() {
    const expirationTime = new Date().getTime() + (24 * 60 * 60 * 1000); // 24 hours in milliseconds
    localStorage.setItem('expirationTime', expirationTime.toString()); // Store as string
    console.log(`Token expiration time set to: ${new Date(expirationTime).toString()}`);
}

// Example usage
// Assume you set the token and expiration time when the user logs in

// Uncomment the next line and call this function after successful login


// // Check token expiration periodically (e.g., every minute for more responsive handling)
// setInterval(checkTokenExpiration, 60 * 1000); // Check every minute
