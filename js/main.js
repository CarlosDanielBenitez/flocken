// shopping cart
//TODO 1) Mostrar en el HTML de forma dinamica el stock de productos
//* 2) Agregar al shopping cart
//* 3) Evitar la carga de productos repetidos en el carrito
//TODO 4)  Mostrar el shopping cart en el HTML de forma dinamica
//! 5) Eliminar productos del carrito
//? 6) Calcular el total de la compra
//! 7) Vaciar todo el carrito
//? 8) Guardar shopping cart en el localStorage

//9) Btn de finalizar compras y cambiar las cantidades desde el shopping cart que no esta ahora.

class Producto {
    constructor(id, marca, nombre, precio, img) {
        this.id = id;
        this.marca = marca;
        this.nombre = nombre;
        this.precio = precio;
        this.img = img;
        this.cantidad = 1; //! cuando agrega un producto al carrito
    }
}

const mercedes1 = new Producto(1, "Mercedes-Benz", "mercedes1", 300000, "./img/mercedes-1.jpg");
const mercedes2 = new Producto(2, "Mercedes-Benz", "mercedes2", 400000, "./img/mercedes-2.jpg");
const mercedes3 = new Producto(3, "Mercedes-Benz", "mercedes3", 500000, "./img/mercedes-3.jpg");
const mercedes4 = new Producto(4, "Mercedes-Benz", "mercedes4", 600000, "./img/mercedes-4.jpg");

const lamborghini1 = new Producto(5, "Lamborghini", "lamborghini1", 300000, "./img/lamborghini-1.jpg");
const lamborghini2 = new Producto(6, "Lamborghini", "lamborghini2", 400000, "./img/lamborghini-2.jpg");
const lamborghini3 = new Producto(7, "Lamborghini", "lamborghini3", 500000, "./img/lamborghini-3.jpg");
const lamborghini4 = new Producto(8, "Lamborghini", "lamborghini4", 600000, "./img/lamborghini-4.jpg");

const tesla1 = new Producto(9, "Tesla", "Tesla1", 100000, "./img/tesla-1.jpg");
const tesla2 = new Producto(10, "Tesla", "Tesla1", 100000, "./img/tesla-2.jpg");
const tesla3 = new Producto(11, "Tesla", "Tesla1", 100000, "./img/tesla-3.jpg");
const tesla4 = new Producto(12, "Tesla", "Tesla1", 100000, "./img/tesla-4.jpg");

//Array de stock

const productos = [mercedes1, mercedes2, mercedes3, mercedes4, lamborghini1, lamborghini2, lamborghini3, lamborghini4, tesla1, tesla2, tesla3, tesla4,];
//Array vacio para el carrito siempre let (cuestion de localStorage)
let carrito = [];

//? Cargar carrito desde el localStorage
// logica: si hay algo en el localStorage, lo cargamos en el carrito. Sino es porque esta vacio y despues lo vinculamos al final de agregarAlCarrito
if (localStorage.getItem("carrito")) {
    carrito = JSON.parse(localStorage.getItem("carrito"));
}

// Modificamos el DOM mostrando los productos
const contenedorProductos = document.getElementById("contenedorProductos");

//TODO 1) Mostrar en el HTML de forma dinamica el stock de productos
// Creamos una funcion para mostrar los productos
const mostrarProductos = () => {
    productos.forEach((producto) => {
        const card = document.createElement("div");
        card.classList.add("col-xl-3", "col-md-6", "col-sm-12");
        card.innerHTML = `
     <div class="card">
                <h2>${producto.marca}</h2>
            <img src="${producto.img}" class="card-img-top imgProductos" alt="${producto.nombre}">
           <div>
               <h2>${producto.nombre}</h2>
               <p>${producto.precio}</p>
               <button class="btn colorBoton" id="boton${producto.id}"><img src="./img/add.png">Agregar al carrito</button>
           </div>
    </div>
    `;
        contenedorProductos.appendChild(card);

        //Agregar productos al carrito
        const boton = document.getElementById(`boton${producto.id}`);
        boton.addEventListener("click", () => {
            agregarAlCarrito(producto.id);
        });
    });
};

mostrarProductos();

//* 2) Agregar al shopping cart
//* 3) Evitar la carga de productos repetidos en el carrito
// Creamos la funcion agregar al carrito y evitamos productos repetidos con if/else
const agregarAlCarrito = (id) => {
    const productoEnCarrito = carrito.find((producto) => producto.id === id);
    if (productoEnCarrito) {
        productoEnCarrito.cantidad++;
    } else {
        const producto = productos.find((producto) => producto.id === id);
        carrito.push(producto);
    }
    mostrarCarrito();

    calcularTotal();
    // Trabajamos con el localStorage
    localStorage.setItem("carrito", JSON.stringify(carrito));

    Toastify({
        text: "Added",
        gravity: "bottom",
        duration: 700,
        backgroundColor: "green"
    }).showToast();

};

//TODO 4)  Mostrar el shopping cart en el HTML de forma dinamica
//Mostrar el carrito de compras
const contenedorCarrito = document.getElementById("contenedorCarrito");
const verCarrito = document.getElementById("verCarrito");
verCarrito.addEventListener("click", () => {
    mostrarCarrito();
});

const mostrarCarrito = () => {
    contenedorCarrito.innerHTML = ""; //! evita que se repita el carrito
    carrito.forEach((producto) => {
        const card = document.createElement("div");
        card.classList.add("col-xl-3", "col-md-6", "col-sm-12");
        card.innerHTML = `
                        <div class="card">
                               <h2>${producto.marca}</h2>
                               <img src="${producto.img}" class="card-img-top imgProductos" alt="${producto.nombre}">
                                <div>
                                     <h2>${producto.nombre}</h2>
                                      <p>${producto.precio}</p>
                                     <p>${producto.cantidad}</p>
                                   <button class="btn btn-danger" id="eliminar${producto.id}"><img src="./img/remove.png">Eliminar</button>
                               </div>
                        </div>
                       `;
        contenedorCarrito.appendChild(card);
        //Eliminamos productos desde el carrito
        const boton = document.getElementById(`eliminar${producto.id}`);
        boton.addEventListener("click", () => {
            eliminarDelCarrito(producto.id); //* ever to work with id
        });
    });
    calcularTotal();
};

//! 5) Eliminar productos del carrito
//Funcion que elimina el producto del carrito
const eliminarDelCarrito = (id) => {
    const producto = carrito.find((producto) => producto.id === id);
    const index = carrito.indexOf(producto);
    carrito.splice(index, 1);
    mostrarCarrito();
    localStorage.setItem("carrito", JSON.stringify(carrito));

    Toastify({
        text: "Removed",
        backgroundColor: "red"
    }).showToast();

};

//? 6) Calcular el total de la compra
const total = document.getElementById("total");
const calcularTotal = () => {
    let totalCompra = 0;
    carrito.forEach((producto) => {
        totalCompra += producto.precio * producto.cantidad;
        //+= es totalCompra = totalCompra + producto.precio * producto.cantidad
    });
    total.innerHTML = `Total: $${totalCompra}`;
};

//! 7) Vaciar todo el carrito
const vaciarCarrito = document.getElementById("vaciarCarrito");
vaciarCarrito.addEventListener("click", () => {
    eliminarTodoElCarrito();
});

const eliminarTodoElCarrito = () => {
    carrito = [];
    mostrarCarrito();
    //limpiamos localStorage
    localStorage.clear();
};













