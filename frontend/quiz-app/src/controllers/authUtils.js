import axios from 'axios';

axios.defaults.withCredentials = true;

export const checkUserSession = async (navigate) => {
    try {
        const response = await axios.get('http://localhost:5000/api/User/session');


        
        // Check if the response status indicates success
        if (response.status !== 200) {
            navigate('/signin'); // Redirect to login page if not authorized
            return null;
        }

        // Return the userId from the response data
        return response.data.userId;
    } catch (error) {
        console.error('Error checking user session:', error.message);
        navigate('/signin'); // Redirect to login page in case of an error
        return null; // Return null in case of an error
    }
};
