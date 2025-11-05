import React, { useState } from 'react';
import axios from 'axios';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import ErrorBanner from './components/ErrorBanner';
import LoadingSpinner from './components/LoadingSpinner';
import ResultsList from './components/ResultsList';
import EmptyState from './components/EmptyState';
import Footer from './components/Footer';
import './App.css';

// API URL from environment
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

function App() {
  // State management for search functionality
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  const performSearch = async (query) => {
    setSearchQuery(query);
    setIsSearching(true);
    setErrorMsg(null);
    setSearchResults(null);

    try {
      const { data } = await axios.post(`${API_URL}/generate`, {
        query: query
      });
      
      setSearchResults(data);
    } catch (error) {
      if (error.response){
        setErrorMsg(error.response.data.detail || 'An error occurred while searching');
      } else if (error.request) {
        setErrorMsg('Unable to connect to the server. Please ensure the backend is running.');
      } else {
        setErrorMsg('An unexpected error occurred. Please try again.');
      }
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="app-container">
      <div className="content-wrapper">
        <Header />

        <SearchBar onSearch={performSearch} isLoading={isSearching} />

        {errorMsg && <ErrorBanner message={errorMsg} />}

        {isSearching && <LoadingSpinner />}
        
        {searchResults && !isSearching && (
          <ResultsList 
            documents={searchResults.documents} 
            query={searchResults.query} 
            total={searchResults.total_results} 
          />
        )}
        {!isSearching && !errorMsg && !searchResults && <EmptyState />}
      </div>
      <Footer />
    </div>
  );
}

export default App;
