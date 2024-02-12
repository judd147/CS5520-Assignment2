import { createContext, useState } from 'react'

// create context
export const ActivityContext = createContext([])

// define context provider
export const ActivityProvider = ({ children }) => {
  const [activities, setActivities] = useState([
    {
      'title': 'Walking',
      'duration': '45 min',
      'date': 'Tue Feb 13 2024',
      'special': false
    },
    {
      'title': 'Running',
      'duration': '60 min',
      'date': 'Tue Feb 6 2024',
      'special': true
    },
  ])

  return (
    <ActivityContext.Provider value={{ activities, setActivities }}>
      {children}
    </ActivityContext.Provider>
  );
}