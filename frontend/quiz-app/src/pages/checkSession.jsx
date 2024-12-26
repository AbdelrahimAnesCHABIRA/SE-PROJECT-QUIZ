import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';


const SessionTest = () => {
    const [sessionInfo, setSessionInfo] = useState('');
    const navigate = useNavigate();
    const checkSession = async () => {
        
        try {
            const response = await fetch('/api/User/session', {
                method: 'GET',
                credentials: 'same-origin', // Ensure cookies are sent with the request
            });

            if (!response.ok) {
                navigate('/signin')
            }

            const data = await response.json();
            setSessionInfo(`fetched successfully ${data.userId}`);
        } catch (error) {
            setSessionInfo(`Error: ${error.message}`);
        }
    };

    return (
        <div>
            <h1>Test Session</h1>
            <button onClick={checkSession}>Check Session</button>
            <p>{sessionInfo}</p>
        </div>
    );
};

export default SessionTest;
