import { createContext, useState } from 'react'

// create context
export const ActivityContext = createContext([])

// define context provider
export const ActivityProvider = ({ children }) => {
  const [activities, setActivities] = useState([])

  return (
    <ActivityContext.Provider value={{ activities, setActivities }}>
      {children}
    </ActivityContext.Provider>
  );
}