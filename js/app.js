// Variables
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const listaCursos = document.querySelector('#lista-cursos');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');

let articulosCarrito = [];

cargarEventListener();
function cargarEventListener(){
    //
    listaCursos.addEventListener('click', agregarCurso);
}

// Funciones
function agregarCurso(e){
    e.preventDefault();
    if(e.target.classList.contains('agregar-carrito')){
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado);
    }
}

// Leer el contenido del elemento html
function leerDatosCurso(curso){
    //crear un objeto con el contenido del curso actual
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }

    // Agregar elementos al arreglo de carritos
    articulosCarrito = [...articulosCarrito, infoCurso]

    console.log(articulosCarrito);
    carritoHTML();
}

//Muestra el carrito de compras en HTML
function carritoHTML(){

    vaciarCarrito();

    articulosCarrito.forEach(curso => {
        const { imagen, titulo, precio, cantidad, id } = curso;
        const row = document.createElement('tr');
        row.innerHTML = `
        <td>
            <img src='${imagen}' width='100'>
        </td>
        <td>
            ${titulo}
        </td>
        <td>
            ${precio}
        </td>
        <td>
            ${cantidad}
        </td>
        <td>
            <a href="#" class="borrar-curso" data-id="${id}">X</a>
        </td>
        `;
        // Agrega el objeto de carrito en el tbody
        contenedorCarrito.appendChild(row);
    })
}

function vaciarCarrito(){
    // Forma Lenta
    // contenedorCarrito.innerHTML = '';
    
    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }

}