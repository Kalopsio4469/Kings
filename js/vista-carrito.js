const contenidoCarrito =
    document.getElementById(
        "contenido-carrito"
    );

const totalCarrito =
    document.getElementById(
        "total-carrito"
    );

const botonVaciar =
    document.getElementById(
        "vaciar-carrito"
    );

const botonFinalizarCompra =
    document.getElementById(
        "finalizar-compra"
    );

const precioCLP =
    new Intl.NumberFormat(
        "es-CL",
        {
            style: "currency",
            currency: "CLP",
            maximumFractionDigits: 0
        }
    );

function obtenerCarritoVigente() {
    return obtenerCarrito().flatMap(
        (item) => {
            const producto =
                productos.find(
                    (producto) =>
                        producto.codigo ===
                        item.codigo
                );

            if (
                !producto ||
                producto.stock <= 0
            ) {
                return [];
            }

            return [
                {
                    codigo:
                        item.codigo,
                    cantidad:
                        Math.min(
                            item.cantidad,
                            producto.stock
                        )
                }
            ];
        }
    );
}

function actualizarVistaCarrito(
    carrito,
    mensaje
) {
    try {
        guardarCarrito(
            carrito
        );
    } catch {
        mostrarMensajeCarrito(
            "No se pudo guardar el cambio."
        );
        return;
    }
    mostrarCarrito();
    mostrarMensajeCarrito(
        mensaje
    );
}

function cambiarCantidad(
    codigo,
    cambio
) {
    const carrito =
        obtenerCarritoVigente();

    const item =
        carrito.find(
            (item) =>
                item.codigo === codigo
        );

    const producto =
        productos.find(
            (producto) =>
                producto.codigo === codigo
        );
    if (
        !item ||
        !producto
    ) {
        return;
    }

    const nuevaCantidad =
        item.cantidad + cambio;
    if (
        nuevaCantidad < 1 ||
        nuevaCantidad > producto.stock
    ) {
        mostrarMensajeCarrito(
            `La cantidad debe estar entre 1 y ${producto.stock}.`
        );
        return;
    }

    item.cantidad =
        nuevaCantidad;

    actualizarVistaCarrito(
        carrito,
        `Cantidad de ${producto.nombre} actualizada a ${nuevaCantidad}.`
    );
}

function eliminarProductoCarrito(
    codigo
) {
    const carrito =
        obtenerCarritoVigente().filter(
            (item) =>
                item.codigo !== codigo
        );

    actualizarVistaCarrito(
        carrito,
        "Producto eliminado del carrito."
    );
}

function crearBoton(
    texto,
    etiqueta,
    accion,
    deshabilitado = false
) {
    const boton =
        document.createElement(
            "button"
        );

    boton.type =
        "button";

    boton.className =
        "boton-control";

    boton.textContent =
        texto;

    boton.setAttribute(
        "aria-label",
        etiqueta
    );

    boton.disabled =
        deshabilitado;

    boton.addEventListener(
        "click",
        accion
    );

    return boton;
}

function mostrarCarrito() {
    const carrito =
        obtenerCarritoVigente();
    contenidoCarrito.replaceChildren();

    let total = 0;

    if (
        carrito.length === 0
    ) {
        const aviso =
            document.createElement(
                "p"
            );

        aviso.textContent =
            "Tu carrito está vacío.";
        contenidoCarrito.append(
            aviso
        );
    }

    carrito.forEach(
        (item) => {
            const producto =
                productos.find(
                    (producto) =>
                        producto.codigo ===
                        item.codigo
                );

            if (!producto) {
                return;
            }

            const subtotal =
                producto.precio *
                item.cantidad;

            total +=
                subtotal;

            const tarjeta =
                document.createElement(
                    "article"
                );

            tarjeta.className =
                "item-carrito";

            const imagen =
                document.createElement(
                    "img"
                );

            imagen.src =
                producto.imagen;

            imagen.alt =
                producto.nombre;

            const detalle =
                document.createElement(
                    "div"
                );

            const nombre =
                document.createElement(
                    "h2"
                );

            nombre.textContent =
                producto.nombre;

            const precio =
                document.createElement(
                    "p"
                );

            precio.textContent =
                `Precio unitario: ${
                    precioCLP.format(
                        producto.precio
                    )
                }`;

            const controles =
                document.createElement(
                    "div"
                );

            controles.className =
                "controles-cantidad";

            const menos =
                crearBoton(
                    "−",
                    `Quitar una unidad de ${producto.nombre}`,
                    () =>
                        cambiarCantidad(
                            item.codigo,
                            -1
                        ),
                    item.cantidad <= 1

                );

            const cantidad =
                document.createElement(
                    "span"
                );

            cantidad.textContent =
                `Cantidad: ${item.cantidad}`;

            const mas =
                crearBoton(
                    "+",
                    `Añadir una unidad de ${producto.nombre}`,
                    () =>
                        cambiarCantidad(
                            item.codigo,
                            1
                        ),
                    item.cantidad >=
                        producto.stock
                );

            controles.append(
                menos,
                cantidad,
                mas
            );

            const textoSubtotal =
                document.createElement(
                    "p"
                );

            textoSubtotal.className =
                "subtotal-carrito";

            textoSubtotal.textContent =
                `Subtotal: ${
                    precioCLP.format(
                        subtotal
                    )
                }`;

            const eliminar =
                crearBoton(
                    "Eliminar",
                    `Eliminar ${producto.nombre} del carrito`,
                    () =>
                        eliminarProductoCarrito(
                            item.codigo
                        )
                );

            detalle.append(
                nombre,
                precio,
                controles,
                textoSubtotal,
                eliminar
            );

            tarjeta.append(
                imagen,
                detalle
            );

            contenidoCarrito.append(
                tarjeta
            );
        }
    );

    totalCarrito.textContent =
        precioCLP.format(
            total
        );

    if (botonVaciar) {
        botonVaciar.disabled =
            carrito.length === 0;
    }

    if (botonFinalizarCompra) {
        botonFinalizarCompra.disabled =
            carrito.length === 0;
    }
}

function obtenerSesionCliente() {
    try {
        return JSON.parse(
            localStorage.getItem(
                "kings-sesion"
            )
        );
    } catch {
        return null;
    }
}

function finalizarCompra() {
    const carrito =
        obtenerCarritoVigente();

    if (
        carrito.length === 0
    ) {
        mostrarMensajeCarrito(
            "Tu carrito está vacío."
        );
        return;
    }

    const sesion =
        obtenerSesionCliente();

    if (!sesion) {
        const irLogin =
            window.confirm(
                "Debes iniciar sesión para finalizar la compra. " +
                "¿Quieres iniciar sesión?"
            );

        if (irLogin) {
            window.location.href =
                "login.html";
        }
        return;
    }

    const productosOrden = [];

    let totalOrden = 0;

    for (
        const item of carrito
    ) {

        const producto =
            productos.find(
                (producto) =>
                    producto.codigo ===
                    item.codigo
            );

        if (!producto) {
            continue;
        }

        if (
            producto.stock <
            item.cantidad
        ) {
            mostrarMensajeCarrito(
                `No hay stock suficiente de ${producto.nombre}.`
            );
            return;
        }

        const subtotal =
            producto.precio *
            item.cantidad;

        totalOrden +=
            subtotal;

        productosOrden.push({
            codigo:
                producto.codigo,
            nombre:
                producto.nombre,
            precio:
                producto.precio,
            cantidad:
                item.cantidad,
            subtotal:
                subtotal,
            imagen:
                producto.imagen
        });
    }

    if (
        productosOrden.length === 0
    ) {

        mostrarMensajeCarrito(
            "No fue posible generar la orden."
        );
        return;
    }

    const nuevaOrden = {

        id:
            generarIdOrden(),
        fecha:
            new Date()
                .toISOString(),
        estado:
            "Pendiente",
        cliente: {
            run:
                sesion.run || "",
            nombre:
                sesion.nombre || "",
            apellidos:
                sesion.apellidos || "",
            correo:
                sesion.correo || ""
        },
        productos:
            productosOrden,

        total:
            totalOrden
    };

    productosOrden.forEach(
        (itemOrden) => {

            const producto =
                productos.find(
                    (producto) =>
                        producto.codigo ===
                        itemOrden.codigo
                );

            if (producto) {

                producto.stock -=
                    itemOrden.cantidad;

            }
        }
    );

    try {

        const ordenes =
            obtenerOrdenes();

        ordenes.push(
            nuevaOrden
        );

        guardarOrdenes(
            ordenes
        );

        guardarProductos(
            productos
        );

        guardarCarrito(
            []
        );
        
        mostrarCarrito();

        mostrarMensajeCarrito(
            `Compra realizada correctamente. Orden ${nuevaOrden.id}.`
        );

        console.log(
            "Orden creada:",
            nuevaOrden
        );

    } catch (error) {
        console.error(
            "Error al generar orden:",
            error
        );

        mostrarMensajeCarrito(
            "No fue posible completar la compra."
        );
    }
}

if (botonVaciar) {
    botonVaciar.addEventListener(
        "click",
        () => {

            actualizarVistaCarrito(
                [],
                "Carrito vaciado."
            );
        }
    );
}

if (botonFinalizarCompra) {
    botonFinalizarCompra.addEventListener(
        "click",
        finalizarCompra
    );

}

try {
    guardarCarrito(
        obtenerCarritoVigente()
    );
} catch {
    mostrarMensajeCarrito(
        "No se pudo actualizar el almacenamiento del carrito."
    );
}

mostrarCarrito();