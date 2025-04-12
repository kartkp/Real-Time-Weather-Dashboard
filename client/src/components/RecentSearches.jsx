import React, { useEffect, useState } from 'react';
import axios from 'axios';

const RecentSearches = ({ searchTrigger }) => {
  const [recentSearches, setRecentSearches] = useState([]);

  useEffect(() => {
    const fetchRecentSearches = async () => {
      try {
        console.log('Fetching recent searches...');
        const response = await axios.get('/api/searches/recent');
        console.log('Received data:', response.data);
        setRecentSearches(response.data);
      } catch (error) {
        console.error('Error fetching recent searches:', error.response?.data || error.message);
      }
    };
    fetchRecentSearches();
  }, [searchTrigger]);

  return (
    <div className="recent-searches">
      <h3>Recent Searches</h3>
      {recentSearches.length > 0 ? (
        <div className="search-cards">
          {recentSearches.map((search, index) => (
            <div key={index} className="search-card">
              <p>{search.city}</p>
              <small>{search.country}</small>
              <small>{new Date(search.timestamp).toLocaleString()}</small>
            </div>
          ))}
        </div>
      ) : (
        <p>No recent searches yet</p>
      )}
      <button onClick={() => setSearchTrigger(prev => prev + 1)}>
  Force Refresh
</button>
    </div>
  );
};

export default RecentSearches;