const contenedorDetalle = document.getElementById("detalle-producto");

const parametros = new URLSearchParams(window.location.search);
const codigoProducto = parametros.get("id");

const productoSeleccionado = productos.find(
    (producto) => producto.codigo === codigoProducto
);

const formatoDetallePrecio = new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0
});

function mostrarDetalleProducto() {
    if (!productoSeleccionado) {
        const titulo = document.createElement("h1");
        titulo.textContent = "Producto no encontrado";

        const mensaje = document.createElement("p");
        mensaje.textContent =
            "Vuelve al catálogo para seleccionar un jockey disponible.";

        contenedorDetalle.append(titulo, mensaje);
        return;
    }

    document.title = `Kings | ${productoSeleccionado.nombre}`;

    const articulo = document.createElement("article");
    articulo.className = "detalle-producto";

    const imagen = document.createElement("img");
    imagen.src = productoSeleccionado.imagen;
    imagen.alt = productoSeleccionado.nombre;

    const informacion = document.createElement("div");

    const categoria = document.createElement("p");
    categoria.className = "categoria-producto";
    categoria.textContent = productoSeleccionado.categoria;

    const nombre = document.createElement("h1");
    nombre.textContent = productoSeleccionado.nombre;

    const descripcion = document.createElement("p");
    descripcion.textContent =
        productoSeleccionado.descripcion || "Sin descripción disponible.";

    const precio = document.createElement("p");
    precio.className = "precio-detalle";
    precio.textContent = formatoDetallePrecio.format(
        productoSeleccionado.precio
    );

    const stock = document.createElement("p");
    stock.textContent =
        `Stock disponible: ${productoSeleccionado.stock} unidades.`;

    const boton = document.createElement("button");
    boton.type = "button";
    boton.className = "boton boton-producto";
    boton.disabled = productoSeleccionado.stock <= 0;
    boton.textContent = boton.disabled
        ? "Sin stock"
        : "Añadir al carrito";

    boton.addEventListener("click", () => {
        agregarAlCarrito(productoSeleccionado.codigo);
    });

    informacion.append(
        categoria,
        nombre,
        descripcion,
        precio,
        stock,
        boton
    );

    articulo.append(imagen, informacion);
    contenedorDetalle.append(articulo);
}

mostrarDetalleProducto();