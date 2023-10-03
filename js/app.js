const listaCursos = document.querySelector('#lista-cursos');
const tabla = document.querySelector('#lista-carrito tbody');

let carrito = [];

function getCurso(e){
    e.preventDefault();
    if(e.target.classList.contains('agregar-carrito')){
       const item = {}
       item.id = e.target.getAttribute('data-id');
       const padre = e.target.parentElement;
       item.name = padre.querySelector('h4').innerText;
       item.price = padre.querySelector('p span').innerText;
       item.image = padre.parentElement.querySelector('img').src;
       item.cantity = 1;
       addItem(item);
    //    Llenar la tabla 
    showTable();
    }
}

function addItem(item){
    // Verificar si el objeto existe en carrito
    if(carrito.some(itemCarrito => item.id === itemCarrito.id  )){
        carrito.forEach(itemCarrito => {
            if (itemCarrito.id === item.id) {
                    itemCarrito.cantity ++;
            }
        });
    } else{
        carrito.push(item); 
    }
}

function showTable() {
    // Limpiar tabla 
    tabla.innerHTML = '';
    // Iterar carrito para insertar
    carrito.forEach(item => {
        tabla.appendChild(createRow(item));
    });
    // Asignar eventos a los botones de "+" y "-"
    const addButtons = document.querySelectorAll('.btn-add');
    const removeButtons = document.querySelectorAll('.btn-remove');
    addButtons.forEach(button => {
        button.addEventListener('click', btnAddItem);
    });
    removeButtons.forEach(button => {
        button.addEventListener('click', btnRemoveItem);
    });
}

function createRow(item) {
    const row = document.createElement('tr');
    let rowHtml = ``;
    rowHtml += `<td><img src="${item.image}" width="100px"></td>`;
    rowHtml += `<td>${item.name}</td>`;
    rowHtml += `<td>${item.price}</td>`;
    rowHtml += `<td>${item.cantity}</td>`;

    const addButton = document.createElement('button');
    addButton.setAttribute('data-id', item.id);
    addButton.classList.add('btn', 'btn-add');
    addButton.innerHTML = '+';
    const addTd = document.createElement('td');
    addTd.appendChild(addButton);

    const removeButton = document.createElement('button');
    removeButton.setAttribute('data-id', item.id);
    removeButton.classList.add('btn', 'btn-remove');
    removeButton.innerHTML = '-';
    const removeTd = document.createElement('td');
    removeTd.appendChild(removeButton);

    row.innerHTML = rowHtml;
    row.appendChild(addTd);
    row.appendChild(removeTd);
    return row;
}

function btnAddItem(e) {
    if (e.target.classList.contains('btn-add')) {
        const id = e.target.getAttribute('data-id');
        // Agregar una unidad más del producto al carrito
        carrito.forEach(itemCarrito => {
            if (itemCarrito.id === id) {
                itemCarrito.cantity++;
            }
        });
        showTable();
    }
}

function btnRemoveItem(e) {
    if (e.target.classList.contains('btn-remove')) {
        const id = e.target.getAttribute('data-id');
        // Quitar una unidad del producto del carrito
        carrito.forEach(itemCarrito => {
            if (itemCarrito.id === id) {
                if (itemCarrito.cantity > 1) {
                    itemCarrito.cantity--;
                } else {
                    carrito = carrito.filter(item => item.id !== id);
                }
            }
        });
        showTable();
    }
}

listaCursos.addEventListener('click', getCurso);
showTable();