// Lista de productos del menu
// cat = categoria para poder filtrar
// img = foto guardada en la carpeta imagenes/
// el nombre del archivo dice lo que es
const productos = [
  { nombre: "Café negro", desc: "Colado en greca, como en casa.", precio: 60, cat: "cafe",
    img: "imagenes/cafe-negro.jpg" },
  { nombre: "Café con leche", desc: "Con leche caliente y espumita.", precio: 90, cat: "cafe",
    img: "imagenes/cafe-con-leche.jpg" },
  { nombre: "Frappé de mocha", desc: "Frío, con chocolate y crema.", precio: 175, cat: "cafe",
    img: "imagenes/frappe-de-mocha.jpg" },
  { nombre: "Bizcocho dominicano", desc: "Porción con suspiro.", precio: 120, cat: "dulce",
    img: "imagenes/bizcocho-dominicano.jpg" },
  { nombre: "Flan de coco", desc: "Hecho aquí mismo.", precio: 100, cat: "dulce",
    img: "imagenes/flan-de-coco.jpg" },
  { nombre: "Pastelito de pollo", desc: "Frito y crujiente.", precio: 50, cat: "salado",
    img: "imagenes/pastelito-de-pollo.jpg" },
  { nombre: "Sándwich de jamón y queso", desc: "En pan de agua tostado.", precio: 150, cat: "salado",
    img: "imagenes/sandwich-de-jamon-y-queso.jpg" },
  { nombre: "Empanada de yuca", desc: "Rellena de queso.", precio: 70, cat: "salado",
    img: "imagenes/empanada-de-yuca.jpg" }
];

// aqui se guarda lo que la persona va agregando
let pedido = [];

const lista = document.getElementById("lista");
const itemsPedido = document.getElementById("items-pedido");
const totalSpan = document.getElementById("total");


// ---- pinta las tarjetas en pantalla ----
function mostrarProductos(categoria) {
  lista.innerHTML = ""; // limpio primero

  productos.forEach(function (prod, i) {
    // si no es "todo" y la categoria no coincide, me lo salto
    if (categoria !== "todo" && prod.cat !== categoria) {
      return;
    }

    // si el producto tiene foto la pongo arriba, si no, nada
    let foto = "";
    if (prod.img) {
      foto = `<img src="${prod.img}" alt="${prod.nombre}" class="card-img">`;
    }

    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      ${foto}
      <h3>${prod.nombre}</h3>
      <p>${prod.desc}</p>
      <div class="card-abajo">
        <span class="precio">RD$${prod.precio}</span>
        <button class="btn" onclick="agregar(${i})">Agregar</button>
      </div>
    `;
    lista.appendChild(card);
  });
}


// ---- agregar al pedido ----
function agregar(i) {
  pedido.push(productos[i]);
  actualizarPedido();
}


// ---- vuelve a dibujar la caja del pedido y calcula el total ----
function actualizarPedido() {
  itemsPedido.innerHTML = "";

  if (pedido.length === 0) {
    itemsPedido.innerHTML = '<li class="vacio">Todavía no has agregado nada</li>';
    totalSpan.textContent = "RD$0";
    return;
  }

  let total = 0;
  pedido.forEach(function (prod) {
    const li = document.createElement("li");
    li.innerHTML = `<span>${prod.nombre}</span><span>RD$${prod.precio}</span>`;
    itemsPedido.appendChild(li);
    total = total + prod.precio;
  });

  totalSpan.textContent = "RD$" + total;
}


// ---- botones de filtro ----
const filtros = document.querySelectorAll(".filtro");

filtros.forEach(function (boton) {
  boton.addEventListener("click", function () {
    // quito la clase activo a todos y se la pongo al que toque
    filtros.forEach(function (b) {
      b.classList.remove("activo");
    });
    boton.classList.add("activo");

    mostrarProductos(boton.dataset.cat);
  });
});


// ---- vaciar pedido ----
document.getElementById("btn-vaciar").addEventListener("click", function () {
  pedido = [];
  actualizarPedido();
});


// al cargar la pagina muestro todo
mostrarProductos("todo");
