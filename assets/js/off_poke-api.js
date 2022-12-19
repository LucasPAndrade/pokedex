
const pokeApi={}

pokeApi.getPokemons = (offset = 0, limit = 10) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

    return fetch(url)
    // .then("function (resposta)"{
    //     return resposta.json() //essa conversão retorna a 'promessa' de conversão do body em json
    // })
        .then((resposta) => resposta.json())
        .then((bodyJson) => bodyJson.results)
        .catch((error) => console.log(error))
        .finally(function(){
            console.log('Requisição concluída.')
        })

}