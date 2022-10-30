import {removeChildNodes, loadingScreen, printAlert } from './functions.js';

const pokemonContainer = document.querySelector('#Pokemon-Container');
const searchBtn = document.querySelector('#searchButton');
const previousButton = document.querySelector('#previous');
const nextButton = document.querySelector('#next');

export const pokemonView = document.querySelector('#pokemonView');
export const loadingSpinner = document.querySelector('#loading-div');




let limit = 8;
let offset = 1;

    
previousButton.disabled = true;

fetchPokemon();

/* Adding event listeners to the previous and next buttons. */
previousButton.addEventListener('click', () => {

        if(offset > 1){
            removeChildNodes(pokemonContainer);
            offset -= 9;
            fetchPokemon(offset, limit);
        }

        if(offset === 1) {
            previousButton.disabled = true;
        }
        
});

nextButton.addEventListener('click', () => {
        removeChildNodes(pokemonContainer);
        offset +=9;
        

        if(offset <= 900) {
            nextButton.disabled = true;
            loadingScreen();
            fetchPokemon(offset,limit);
        }
        

        if (offset >= 1){
            previousButton.disabled = false;
        }


});




/**
 * It fetches the pokemon data from the API, then it maps the data to a new object, then it passes the
 * new object to the MostrarPokemon function.
 */
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


/**
 * It takes the data from the API and creates a card for each pokemon.
 * @param pokemon - the array of pokemon objects
 */
function MostrarPokemon(pokemon) {
    
    if(loadingSpinner) {
        nextButton.disabled = false;
        removeChildNodes(loadingSpinner);
        loadingSpinner.remove();
    }

    pokemon.forEach(monster => {
       
        const div = document.createElement('div');
        div.classList.add('col-4');

        const card = document.createElement('div');
        card.classList.add('card');
        

        const img = document.createElement('img');
        img.classList.add('card-img-top');
        img.src = monster.image;

        const cardBody = document.createElement('div');
        cardBody.classList.add('card-body');

        const cardTitle = document.createElement('h5');
        cardTitle.textContent = `${monster.id}. ${monster.name.toUpperCase()}`;

        const cardText = document.createElement('p');
        cardText.classList.add('card-text');
       

        div.appendChild(card);
        card.appendChild(img);
        card.appendChild(cardBody);
        cardBody.appendChild(cardTitle);
        cardBody.appendChild(cardText);
        pokemonContainer.appendChild(div);
        PokemonColorType(monster.types, card, cardText);

        
    });
    

}

/**
 * It takes a string, splits it into two parts, and then uses the first part to create a url to a
 * background image, and the second part to create a badge.
 * @param type - The type of the pokemon
 * @param card - the card that you want to change the background of
 * @param textStyle - The element that will contain the type text.
 */
function PokemonColorType (type, card, textStyle) {

    const typeColor = type.split(',')[0];
    const secondtypeColor = type.split(',')[1];

    const url = `"./src/images/blobs/blob${typeColor}.svg"`;

    card.style.backgroundImage = "url("+url+")";

    if(secondtypeColor) {
        textStyle.innerHTML = `<span class="Type">Type: <span class="badge ${typeColor}">${typeColor}</span><span class="badge ${secondtypeColor}">${secondtypeColor}</span></span>`;
    }

    else {
        textStyle.innerHTML = `<span class="Type">Type: <span class="badge ${typeColor}">${typeColor}</span></span>`;
    }
    
}

// Search Bar

/**
 * It takes the value of the search bar and filters the pokemon array to display the matching pokemons.
 * </code>
 * 
 * 
 * A:
 * 
 * You can use <code>Array.prototype.filter</code> to filter the array of pokemon.
 * <code>const pokemonFiltered = pokemon.filter(monster =&gt; (monster.name.indexOf(id) &gt; -1 ||
 * monster.id === Number(id)));
 * </code>
 * @param e - the event object
 */
const searchBar =  async (e) =>  {
    nextButton.disabled = true;
    searchBtn.disabled = true;
    e.preventDefault();
    loadingScreen();
    removeChildNodes(pokemonContainer);
    const id = document.querySelector('#searchBar').value.toLowerCase();

    

    try{
        const promises = [];

        for (let i = 1; i <= 900; i++) {
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
          
            const pokemonFiltered = pokemon.filter(monster => (monster.name.indexOf(id) > -1 || monster.id === Number(id)));

            const PokemonReduced = pokemonFiltered.slice(0,9);

            if(PokemonReduced.length && id != '') {
                showPokemonFiltered(PokemonReduced);
                printAlert('Displaying matching pokemons', 'sucess');
            }

            else {
                printAlert('Error, Make sure the pokemon exist', 'error');
                fetchPokemon(offset, limit);
            }
            
            

        });        
            
    }
    catch(error) {
        console.log(error);
    }

    searchBtn.disabled = false;
    
}


/**
 * The function takes an array of pokemon objects, removes the loading spinner, and then creates a div
 * for each pokemon object in the array, and appends it to the DOM.
 * @param pokemon - the array of pokemon objects
 */
function showPokemonFiltered(pokemon) {

    if(loadingSpinner) {
        removeChildNodes(loadingSpinner);
        loadingSpinner.remove();
        nextButton.disabled = false;
    }

    pokemon.forEach(monster => {
        const div = document.createElement('div');
        div.classList.add('col-4');
        
        const card = document.createElement('div');
        card.classList.add('card');
                        
        
        const img = document.createElement('img');
        img.classList.add('card-img-top');
        img.src = monster.image;
        
        const cardBody = document.createElement('div');
        cardBody.classList.add('card-body');
        
        const cardTitle = document.createElement('h5');
        cardTitle.textContent = `${monster.id}. ${monster.name.toUpperCase()}`;
        
        const cardText = document.createElement('p');
        cardText.classList.add('card-text');
                    
        
        div.appendChild(card);
        card.appendChild(img);
        card.appendChild(cardBody);
        cardBody.appendChild(cardTitle);
        cardBody.appendChild(cardText);
        pokemonContainer.appendChild(div);
        PokemonColorType(monster.types, card, cardText);

    })
    
    
}

searchBtn.addEventListener('click', searchBar);