import { useRouter } from 'next/router';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const PokemonDetails = () => {
  const router = useRouter();
  const { name } = router.query;
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    if (name) {
      fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
        .then((response) => response.json())
        .then((data) => setPokemon(data));
    }
  }, [name]);

  if (!pokemon) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="breadcrumb">
        <Link href="/">
          <a>Home</a>
        </Link>{' '}
        &gt; {pokemon.name}
      </div>
      <div className="flex flex-col items-center">
        <img
          src={pokemon.sprites.front_default}
          alt={pokemon.name}
          className="w-32 h-32"
        />
        <h1 className="text-3xl mt-4">{pokemon.name}</h1>
        <div className="mt-4">
          <h2 className="text-xl">Details</h2>
          <p>Height: {pokemon.height}</p>
          <p>Weight: {pokemon.weight}</p>
          <p>Base Experience: {pokemon.base_experience}</p>
        </div>
      </div>
    </div>
  );
};

export default PokemonDetails;
