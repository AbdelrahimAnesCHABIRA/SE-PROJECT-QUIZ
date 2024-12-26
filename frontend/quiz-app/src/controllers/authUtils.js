
export const checkUserSession = async (navigate) => {
    try {
        const response = await fetch('/api/User/session', {
            method: 'GET',
            credentials: 'same-origin', // Ensure cookies are sent with the request
        });

        if (!response.ok) {
            // If response is not ok, redirect to the login page
            navigate('/signin');
            return null; // Return null since there's no valid userId
        }

        const data = await response.json(); 
        return data.userId; 
    } catch (error) {
        navigate('/signin'); // Redirect to login in case of error
        return null; // Return null in case of error
    }
};
