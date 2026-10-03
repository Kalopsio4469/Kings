const listaProductos = document.getElementById("lista-productos");

// Da formato a los precios: por ejemplo, $14.990.
const formatoPrecio = new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0
});

function mostrarProductos() {
    listaProductos.replaceChildren();

    productos.forEach((producto) => {
        const tarjeta = document.createElement("article");
        tarjeta.className = "tarjeta-producto";

        const imagen = document.createElement("img");
        imagen.src = producto.imagen;
        imagen.alt = producto.nombre;
        imagen.loading = "lazy";
        imagen.className = "imagen-producto";

        const contenido = document.createElement("div");
        contenido.className = "contenido-producto";

        const categoria = document.createElement("p");
        categoria.className = "categoria-producto";
        categoria.textContent = producto.categoria;

        const nombre = document.createElement("h3");

        const enlace = document.createElement("a");
        enlace.href = `producto.html?id=${encodeURIComponent(producto.codigo)}`;
        enlace.textContent = producto.nombre;

        nombre.append(enlace);

        const precio = document.createElement("p");
        precio.className = "precio-producto";
        precio.textContent = formatoPrecio.format(producto.precio);

        const boton = document.createElement("button");
        boton.type = "button";
        boton.className = "boton boton-producto";
        boton.textContent = "Añadir al carrito";

        // Conectaremos este botón al carrito en el siguiente paso.
        boton.addEventListener("click", () => {
            agregarAlCarrito(producto.codigo);
        });

        contenido.append(categoria, nombre, precio, boton);
        tarjeta.append(imagen, contenido);
        listaProductos.append(tarjeta);
    });
}

if (listaProductos) {
    mostrarProductos();
}