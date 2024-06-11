import Link from 'next/link';

const PokemonList = ({ pokemons }) => {
  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-wrap -mx-4">
        {pokemons.map((pokemon, index) => (
          <div key={index} className="w-full sm:w-1/2 md:w-1/3 px-4 mb-4">
            <div className="p-4 border rounded hover:bg-gray-100 flex flex-col items-center">
              <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`}
                alt={pokemon.name}
                className="w-24 h-24"
              />
              <h2 className="text-xl mt-2">{pokemon.name}</h2>
              <Link href={`/pokemon/${pokemon.name}`}>
                <a className="mt-2 text-blue-500 hover:underline">See Details</a>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PokemonList;
