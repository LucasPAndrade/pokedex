
const pokeApi={}

function convertPokeApiDetailToPokemon(pokeDetail){
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id
    pokemon.name=pokeDetail.name

    const types = pokeDetail.types.map((typesSlot) => typesSlot.type.name)
    const [type1] = types //destructuring, seria equivalente a "types.get(0)"
    
    pokemon.types = types
    pokemon.type = type1

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

    return pokemon
}

pokeApi.getPokemonsDetails = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon)

}

pokeApi.getPokemons = (offset = 0, limit = 6) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

    return fetch(url)
    // .then("function (resposta)"{
    //     return resposta.json() //essa conversão retorna a 'promessa' de conversão do body em json
    // })
        .then((resposta) => resposta.json()) //converte resposta para json
        .then((bodyJson) => bodyJson.results) //pega apenas os resultados do json e não os detalhes
        .then((pokemons) => pokemons.map(pokeApi.getPokemonsDetails)) // mapeia essa lista de pokemons em uma lista de requisições do detalhe dos pokemons
        .then((detailRequests) => Promise.all(detailRequests)) //com lista de requisições em mãos, espera resolução de todas essas requisições
        .then((pokemonsDetails) => pokemonsDetails)

        .catch((error) => console.log(error))
        .finally(function(){
            console.log('Requisição concluída.')
        })

}