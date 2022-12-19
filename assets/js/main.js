// fetch(url)
//     .then(function (resposta) {
//         resposta.json().then(function(respostaBody){
//             console.log(respostaBody)
//         })
//     })

//     .catch(function(erro){
//         console.error(erro)
//     })

//     .finally(function(){
//         console.log('Requisição concluída.')
//     })



const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
const limit = 5
let offset = 0
const maxRecords = 151

function loadPokemonItems(offset, limit) {
    function convertPokemonToLi(pokemon) {
        return `
            <li class="pokemon ${pokemon.type}">
                <span class="number">#${pokemon.number}</span>
                <span class="name">${pokemon.name}</span>
                
                <div class="detail">
                    <ol class="types">
                        ${pokemon.types.map((type) => `<li class= "type ${type}">${type}</li>`).join('')}
                    </ol>
    
                    <img src="${pokemon.photo}"
                        alt=${pokemon.name}>
                </div>
            </li>
        `
    }

    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        pokemonList.innerHTML += pokemons.map((pokemon) => `
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>
            
            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class= "type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}"
                    alt=${pokemon.name}>
            </div>
        </li>
    `)
            .join('')
    })
}

loadPokemonItems(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNextPage = offset + limit

    if (qtdRecordsWithNextPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItems(offset, newLimit)
        loadMoreButton.parentElement.removeChild(loadMoreButton)

    } else{
        loadPokemonItems(offset, limit)

    }
})

// pokeApi.getPokemons().then((pokemons = []) => { 
//     pokemonList.innerHTML += pokemons.map(convertPokemonToLi).join('')
//     // const listaPokemons_html = pokemons.map((pokemon,i) => convertPokemonToLi(pokemon,i))

//     // const novoHtml = listaPokemons_html.join('')

//     // pokemonList.innerHTML += novoHtml


//     //For abaixo substituído pela função ".map"
//     // const listaPokemons_html = []
//     // for (let i = 0; i < pokemons.length; i++) {
//     //         const pokemon = pokemons[i];
//     //         listaPokemons_html.push(convertPokemonToLi(pokemon,i));
//     //     }

//     //     pokemonList.innerHTML += listaPokemons_html
//     })

console.log('Após requisição (evidência de que a resposta/"promisse" é assíncrona... executou a resposta primeiro, porém ela ainda está sendo processada, enquanto essa última linha de código aqui já foi executada.')