import React from 'react';

function SearchResults({ results, onSelect }) {
  return (
    <div>
      <h3>Search Results</h3>
      <ul>
        {results.map((result, index) => (
          <li key={index} onClick={() => onSelect(result)}>
            {result.name} - {result.artist}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SearchResults;
