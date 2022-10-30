import { loadingSpinner, pokemonView } from "./main.js";


export function printAlert(message,type) {
    Toastify({
        text: message,
        duration: 3000,
        destination: "https://github.com/apvarun/toastify-js",
        newWindow: true,
        close: true,
        gravity: "bottom", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: type === 'sucess' ? "#78C850" : "red",
        },
        onClick: function(){} // Callback after click
      }).showToast();

}

export function removeChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }

}


export function loadingScreen () {
   
  /* Creating a loading spinner. */
  const spinner = document.createElement('div');
  spinner.classList.add('spinner-border');
  spinner.innerHTML = `<span class="visually-hidden">Loading...</span>`;
  loadingSpinner.appendChild(spinner);

  pokemonView.appendChild(loadingSpinner);
  
}
