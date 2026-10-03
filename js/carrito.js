const CLAVE_CARRITO = "kings-carrito";

function obtenerCarrito() {
    try {
        const datos = JSON.parse(
            localStorage.getItem(CLAVE_CARRITO) || "[]"
        );

        if (!Array.isArray(datos)) {
            return [];
        }

        return datos.filter((item) =>
            item &&
            typeof item.codigo === "string" &&
            Number.isInteger(item.cantidad) &&
            item.cantidad > 0
        );
    } catch {
        return [];
    }
}

function guardarCarrito(carrito) {
    localStorage.setItem(CLAVE_CARRITO, JSON.stringify(carrito));
    actualizarContadorCarrito();
}

function actualizarContadorCarrito() {
    const contador = document.getElementById("contador-carrito");

    if (contador) {
        const cantidad = obtenerCarrito().reduce(
            (total, item) => total + item.cantidad,
            0
        );

        contador.textContent = cantidad;
    }
}

function mostrarMensajeCarrito(texto) {
    const mensaje = document.getElementById("mensaje-carrito");

    if (mensaje) {
        mensaje.textContent = texto;
    }
}

function agregarAlCarrito(codigo) {
    const producto = productos.find(
        (producto) => producto.codigo === codigo
    );

    if (!producto) {
        return;
    }

    const carrito = obtenerCarrito();
    const item = carrito.find((item) => item.codigo === codigo);
    const cantidadActual = item ? item.cantidad : 0;

    // Impide agregar más unidades que las disponibles.
    if (cantidadActual >= producto.stock) {
        mostrarMensajeCarrito(
            `No puedes añadir más unidades de ${producto.nombre}. ` +
            `Stock disponible: ${producto.stock}.`
        );
        return;
    }

    if (item) {
        item.cantidad += 1;
    } else {
        carrito.push({
            codigo: producto.codigo,
            cantidad: 1
        });
    }

    try {
        guardarCarrito(carrito);
        mostrarMensajeCarrito(
            `${producto.nombre} añadido al carrito.`
        );
    } catch {
        mostrarMensajeCarrito(
            "No se pudo guardar el carrito. Revisa si tu navegador " +
            "permite el almacenamiento de este sitio."
        );
    }
}

actualizarContadorCarrito();