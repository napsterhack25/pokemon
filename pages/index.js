import { useState, useEffect } from 'react';
import PokemonList from '../components/PokemonList';
import SearchForm from '../components/SearchForm';
import 'tailwindcss/tailwind.css';

export default function Home() {
  const [pokemons, setPokemons] = useState([]);
  const [filteredPokemons, setFilteredPokemons] = useState([]);
  const [types, setTypes] = useState([]);
  const [showAlert, setShowAlert] = useState(false); // Added state for showing alert

  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
      .then((response) => response.json())
      .then((data) => setPokemons(data.results));
    
    fetch('https://pokeapi.co/api/v2/type')
      .then((response) => response.json())
      .then((data) => setTypes(data.results));
  }, []);

  const handleSearch = (selectedType, searchTerm) => {
    let filtered = pokemons;

    if (selectedType) {
      filtered = filtered.filter((pokemon) => {
        if (pokemon.types) {
          return pokemon.types.some((type) => type.type?.name === selectedType);
        } else {
          setShowAlert(true);
          return false; // For example, you could return false or handle it differently
        }
      });
    }
    

    if (searchTerm) {
      filtered = filtered.filter((pokemon) => {
        if (pokemon.name) {
          setShowAlert(false);
          return pokemon.name.toLowerCase().includes(searchTerm.toLowerCase());
        } else {
          setShowAlert(true);
          return false; // For example, you could return false or handle it differently
        }
      });
    }


    if (searchTerm) {
      filtered = filtered.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setShowAlert(false);
    }

    setFilteredPokemons(filtered);
  };

  const handleTypeChange = (selectedType) => {
    // You can perform any additional actions here if needed
    // For now, we'll just log the selected type
    console.log('Selected Type:', selectedType);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl text-center mb-4 text-blue-600">Pokémon Search</h1>
      
      <SearchForm types={types} onSearch={handleSearch} onTypeChange={handleTypeChange} />
      <>
        {showAlert && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <strong className="font-bold">No Pokémon found!</strong>
            <span className="block sm:inline">Please refine your search criteria.</span>
          </div>
        )}
        {!showAlert && (
          <PokemonList pokemons={filteredPokemons.length > 0 ? filteredPokemons : pokemons} />
        )}
      </>
    </div>
  );
}
