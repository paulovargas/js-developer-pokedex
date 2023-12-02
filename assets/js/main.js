const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecords = 151
const limit = 10
let offset = 0;

const pokeModal = []
const pokemons = []

const pokemonModal = document.getElementById('pokemonModal');

function convertPokemonToLi(pokemon) {
    pokeModal.push(pokemon)
    return  `
        <li class="pokemon ${pokemon.type}" onclick="openModal( ${pokemon.number})">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
        </li>
    `
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})


function closeModal() {
    document.getElementById('pokemonModal').style.display = 'none';
    document.querySelector('.modal-background').style.display = 'none';
}

function openModal( number) {
    
    const data = pokeModal.filter(pokemon => pokemon.number === number)
    pokemon = data[0]

    console.log("Poke :",  data)
    document.getElementById('pokemonModal').style.display = 'block';
    document.querySelector('.modal-background').style.display = 'block';
    return pokemonModal.innerHTML = `
    <div class="pokemon ${pokemon.type} modal">
        <span class="number">#${pokemon.number}</span>
        <span class="name">${pokemon.name}</span>

        <div class="detail">
            <ol class="types">
                ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
            </ol>

            <img class="imgModal" src="${pokemon.photo}"
                 alt="${pokemon.name}">
        </div>
    </div>
`
}


