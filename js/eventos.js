import { creaCard, spinner, modalBody } from './ui.js';

export const urlBase = 'https://rickandmortyapi.com/api/character/';

export const showModal = (e) => {
    e.preventDefault();
    if(e.target.classList.contains('btn')){
        let id = e.target.getAttribute('data-id');
        loadCharacterInfo(urlBase, id);
    }
}

export const navegacion = (e) => {
    e.preventDefault();
    if(e.target.classList.contains('btn')){
        let page = e.target.getAttribute('data-id');
        loadData(urlBase, page);
    }
}

export const loadData = (url, page = 1) => {
    url += `?page=${page}`;
    fetch(url)
    .then(respuesta => respuesta.json())
    .then(respJson => {
        const info = respJson.info;
        const personajes = respJson.results;
        if(!info.prev){
            document.querySelector('#prev').classList.add('disabled')
        } else {
            document.querySelector('#prev').classList.remove('disabled')
            document.querySelector('#prev').setAttribute('data-id', Number(page) - 1)
        }
        if(!info.next){
            document.querySelector('#next').classList.add('disabled')
        } else {
            document.querySelector('#next').classList.remove('disabled')
            document.querySelector('#next').setAttribute('data-id', Number(page) + 1)
        }
        console.log(personajes);
        showCharacters(personajes);
    })
}

export const loadCharacterInfo = (url, id) => {
    let urlCharacter = `${url}${id}`;
    console.log(urlCharacter);
    const modalContent = document.querySelector('.modal-body');
    modalContent.removeChild(modalContent.firstChild);
    modalContent.appendChild(spinner());
    setTimeout(() => {
        fetch(urlCharacter)
        .then(respuesta => respuesta.json())
        .then(personaje => {
            //TODO: Implementar Modal con info del personaje
            modalContent.removeChild(modalContent.firstChild);
            document.querySelector('.modal-title').innerText = personaje.name;
            modalContent.appendChild(modalBody(personaje));
        });
    }, 2000);
}

export const showCharacters = (personajes) => {
    const contenedorRespuesta = document.querySelector('#respuesta');
    while(contenedorRespuesta.firstChild){
        contenedorRespuesta.removeChild(contenedorRespuesta.firstChild);
    }
    personajes.forEach(personaje => {
        contenedorRespuesta.appendChild(creaCard(personaje));
    })
}
