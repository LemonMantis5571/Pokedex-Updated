const previousButton = document.querySelector('#previous');
const nextButton = document.querySelector('#next');

const pokemonContainer = document.querySelector('#Pokemon-Container');

let limit = 8;
let offset = 1;


previousButton.addEventListener('click', () => {
    if(offset > 1){
        removeChildNodes(pokemonContainer);
        offset -= 9;
        fetchPokemon(offset, limit);
    }
    

});

nextButton.addEventListener('click', () => {
    removeChildNodes(pokemonContainer);
    offset +=9;
    fetchPokemon(offset,limit);
})

async function fetchPokemon() {
    

    
    try{
        const promises = [];

        for (let i = offset; i <= offset + limit; i++) {
            const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}/`);
            
            const data = await res.json();
            promises.push(data);
        }

        Promise.all(promises).then((results) => {
            const pokemon = results.map((result) =>  ({
                name: result.name,
                id: result.id,
                image: result.sprites['front_default'],
                types: result.types.map(type => type.type.name).join(', ')
    
            }));
            MostrarPokemon(pokemon);

        });        
            
    }
    catch(error) {
        console.log(error);
    }
 
};


fetchPokemon();



function MostrarPokemon(pokemon) {

    pokemon.forEach(monster => {
        console.log(monster);
       
        const div = document.createElement('div');
        div.classList.add('col-4');

        const card = document.createElement('div');
        card.classList.add('card');
        PokemonColorType(monster.types, card);

        const img = document.createElement('img');
        img.classList.add('card-img-top');
        img.src = monster.image;

        const cardBody = document.createElement('div');
        cardBody.classList.add('card-body');

        const cardTitle = document.createElement('h5');
        cardTitle.textContent = `${monster.id}. ${monster.name.toUpperCase()}`;

        const cardText = document.createElement('p');
        cardText.classList.add('card-text');
        cardText.textContent = `Type: ${monster.types}`;
        
       

        div.appendChild(card);
        card.appendChild(img);
        card.appendChild(cardBody);
        cardBody.appendChild(cardTitle);
        cardBody.appendChild(cardText);
        pokemonContainer.appendChild(div);

        
    });
    

}

function removeChildNodes(parent) {
    while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
    }

}

// function createMovementButtons(){
//     const previousButton = document.createElement('button');
//     const nextButton = document.createElement('button');

//     previousButton.classList.add('btn', 'btn-primary', 'previous', 'position-absolute', 'top-50', 'start-0', 'translate-middle');
//     previousButton.textContent = '&#10094;'

//     nextButton.classList.add('btn' ,'btn-primary', 'next', 'position-absolute', 'top-50', 'start-100', 'translate-middle');
//     nextButton.textContent = '&#10095;'
// }


function PokemonColorType (type, card) {

    const typeColor = type.split(',')[0];

    const url = `"./src/images/blobs/blob${typeColor}.svg"`;

    card.style.backgroundImage = "url("+url+")";

}