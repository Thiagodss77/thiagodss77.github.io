// index.js - Funciones de VerdeVida

let carrito = [];
let total = 0;

// 🟢 Mostrar saludo de bienvenida
function saludoUsuario() {
  const nombre = prompt("¡Hola! ¿Cómo te llamás?");
  if (nombre) {
    alert(`Bienvenido/a a VerdeVida, ${nombre}! 🌿`);
  }
}

// 🛒 Agregar productos al carrito
function agregarCarrito(nombre, precio) {
  carrito.push({ nombre, precio });
  total += precio;
  actualizarCarrito();
  // Esperar un momento para evitar conflicto visual con el modal
  setTimeout(() => {
    alert(`${nombre} fue agregado al carrito ✅`);
  }, 150);
}

// 🔄 Actualizar visual del carrito
function actualizarCarrito() {
  const lista = document.getElementById("listaCarrito");
  const contador = document.getElementById("contadorCarrito");
  const totalHTML = document.getElementById("totalCarrito");

  if (!lista || !contador || !totalHTML) return;

  lista.innerHTML = "";
  carrito.forEach((item, i) => {
    const li = document.createElement("li");
    li.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-center");
    li.innerHTML = `
      ${item.nombre}
      <span>$${item.precio}</span>
      <button class="btn btn-sm btn-danger" onclick="eliminarProducto(${i})">X</button>
    `;
    lista.appendChild(li);
  });

  contador.textContent = carrito.length;
  totalHTML.textContent = total;
}

// ❌ Eliminar un producto individual
function eliminarProducto(index) {
  total -= carrito[index].precio;
  carrito.splice(index, 1);
  actualizarCarrito();
}

// 🧹 Vaciar todo el carrito
function vaciarCarrito() {
  carrito = [];
  total = 0;
  actualizarCarrito();
  setTimeout(() => {
    alert("Carrito vaciado correctamente 🗑️");
  }, 150);
}

// 🛍️ Finalizar compra
function comprar() {
  if (carrito.length === 0) {
    alert("Tu carrito está vacío 😕");
    return;
  }

  // Cierra el modal antes de mostrar el mensaje para evitar fondo negro
  const modal = bootstrap.Modal.getInstance(document.getElementById("modalCarrito"));
  if (modal) modal.hide();

  setTimeout(() => {
    alert("🎉 ¡Gracias por tu compra en VerdeVida! 🌿");
    carrito = [];
    total = 0;
    actualizarCarrito();
  }, 200);
}

// 💬 Enviar formulario de contacto
function enviarFormulario() {
  // Cerrar cualquier modal abierto antes de la alerta
  const modal = bootstrap.Modal.getInstance(document.getElementById("modalCarrito"));
  if (modal) modal.hide();

  setTimeout(() => {
    alert("Gracias por contactarte con VerdeVida 🌱 Pronto te responderemos.");
  }, 150);

  return false; // Evita recargar la página
}

// 👁️ Mostrar carrito (abre el modal)
function mostrarCarrito() {
  const modal = new bootstrap.Modal(document.getElementById("modalCarrito"));
  modal.show();
  actualizarCarrito();
}
