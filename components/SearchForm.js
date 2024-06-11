import { useState, useEffect } from 'react';

const SearchForm = ({ types, onSearch, onTypeChange }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('');

  const handleTypeChange = (e) => {
    const type = e.target.value;
    setSelectedType(type);
    onTypeChange(type); // Invoke onTypeChange function with the selected type
  };

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(selectedType, searchTerm);
  };

  return (
    <form onSubmit={handleSearch} className="p-4 flex flex-col md:flex-row">
      <select
        value={selectedType}
        onChange={handleTypeChange}
        className="p-2 border rounded mb-2 md:mb-0 md:mr-2"
      >
        <option value="">All Types</option>
        {types.map((type) => (
          <option key={type.name} value={type.name}>
            {type.name}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Search Pokémon"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="p-2 border rounded mb-2 md:mb-0 md:mr-2"
      />
      <button type="submit" className="p-2 bg-blue-500 text-white rounded">
        Search
      </button>
    </form>
  );
};

export default SearchForm;
