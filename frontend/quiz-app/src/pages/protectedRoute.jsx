import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom'; // Assuming you're using React Router

const ProtectedRoute = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(null);

    useEffect(() => {
        const checkSession = async () => {
            try {
                const response = await fetch('/api/User/session', {
                    method: 'GET',
                    credentials: 'same-origin', // Ensure cookies are sent with the request
                });

                if (response.ok) {
                    setIsAuthenticated(true); // Session is valid
                } else {
                    setIsAuthenticated(false); // Session is invalid
                }
            } catch (error) {
                console.error('Error checking session:', error);
                setIsAuthenticated(false); // Assume unauthenticated if error occurs
            }
        };

        checkSession();
    }, []);

    // Wait for the session check to complete
    if (isAuthenticated === null) {
        return <div>Loading...</div>; // Show a loading state while checking session
    }

    // If not authenticated, redirect to the login page
    if (!isAuthenticated) {
        return <Navigate to="/signin" replace />;
    }

    // If authenticated, render the children
    return <>{children}</>;
};

export default ProtectedRoute;
