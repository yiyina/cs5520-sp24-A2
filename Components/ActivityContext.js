import React, { createContext, useState } from 'react';

// Create a context for the activity data
export const ActivityContext = createContext();

/**
 * Render the ActivityProvider component.
 *  
 * @param {object} children - child components
 * @returns {JSX.Element} - ActivityProvider component
 */
export const ActivityProvider = ({ children }) => {
    const [activities, setActivities] = useState([]);

    const addActivity = (newActivity) => {
        setActivities([...activities, newActivity]);
    }

    return (
        <ActivityContext.Provider value={{ activities, addActivity }}>
            {children}
        </ActivityContext.Provider>
    );
}