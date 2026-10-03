const CLAVE_SESION_ADMIN = "kings-sesion";
// -----------------------------------------------------
// OBTENER SESIÓN
// -----------------------------------------------------
function obtenerSesionAdmin() {
    try {
        const sesion = JSON.parse(
            localStorage.getItem(
                CLAVE_SESION_ADMIN
            )
        );
        return sesion;
    } catch {
        return null;
    }
}
// -----------------------------------------------------
// CERRAR SESIÓN
// -----------------------------------------------------
function cerrarSesionAdmin() {
    localStorage.removeItem(
        CLAVE_SESION_ADMIN
    );
    window.location.href =
        "../login.html";
}
// -----------------------------------------------------
// PROTEGER PÁGINAS ADMINISTRATIVAS
// -----------------------------------------------------
function protegerPaginaAdmin() {
    const sesion =
        obtenerSesionAdmin();
    // Si no existe sesión.
    if (!sesion) {
        window.location.href =
            "../login.html";
        return null;
    }
    // Solo Administrador y Vendedor pueden entrar al área administrativa.
    if (
        sesion.tipoUsuario !==
            "Administrador" &&
        sesion.tipoUsuario !==
            "Vendedor"
    ) {
        window.location.href =
            "../index.html";
        return null;
    }

    return sesion;
}
// -----------------------------------------------------
// MOSTRAR INFORMACIÓN DEL USUARIO
// -----------------------------------------------------
function mostrarUsuarioAdmin(
    sesion
) {
    const nombreUsuario =
        document.getElementById(
            "nombre-usuario"
        );

    const rolUsuario =
        document.getElementById(
            "rol-usuario"
        );

    const nombreBienvenida =
        document.getElementById(
            "nombre-bienvenida"
        );

    if (nombreUsuario) {
        nombreUsuario.textContent =
            `${sesion.nombre} ${sesion.apellidos}`;
    }

    if (rolUsuario) {
        rolUsuario.textContent =
            sesion.tipoUsuario;
    }

    if (nombreBienvenida) {
        nombreBienvenida.textContent =
            sesion.nombre;
    }
}


function controlarPermisosAdmin(
    sesion
) {
    const elementosSoloAdministrador =
        document.querySelectorAll(
            ".solo-administrador"
        );

    if (
        sesion.tipoUsuario ===
        "Vendedor"
    ) {
        elementosSoloAdministrador
            .forEach(
                (elemento) => {
                    elemento.style.display =
                        "none";
                }
            );
    }
}
// -----------------------------------------------------
// BOTÓN CERRAR SESIÓN
// -----------------------------------------------------
function prepararCerrarSesion() {
    const botonCerrarSesion =
        document.getElementById(
            "boton-cerrar-sesion"
        );

    if (!botonCerrarSesion) {
        return;
    }

    botonCerrarSesion.addEventListener(
        "click",
        () => {
            cerrarSesionAdmin();
        }
    );
}

const sesionAdmin =
    protegerPaginaAdmin();

if (sesionAdmin) {
    mostrarUsuarioAdmin(
        sesionAdmin
    );

    controlarPermisosAdmin(
        sesionAdmin
    );

    prepararCerrarSesion();

}

const tablaProductosAdmin =
    document.getElementById(
        "tabla-productos-admin"
    );

const cantidadProductos =
    document.getElementById(
        "cantidad-productos"
    );

const mensajeAdminProductos =
    document.getElementById(
        "mensaje-admin-productos"
    );

// Formato de pesos chilenos.
const formatoPrecioAdmin =
    new Intl.NumberFormat(
        "es-CL",
        {
            style: "currency",
            currency: "CLP",
            maximumFractionDigits: 0
        }
    );
// -----------------------------------------------------
// OBTENER ESTADO DE STOCK
// -----------------------------------------------------
function obtenerEstadoStock(
    producto
) {
    if (producto.stock === 0) {
        return {
            texto: "Sin stock",
            clase: "stock-agotado"
        };
    }

    if (
        producto.stockCritico !== null &&
        producto.stockCritico !== undefined &&
        producto.stock <=
            producto.stockCritico
    ) {

        return {
            texto: "Stock crítico",
            clase: "stock-critico"
        };
    }

    return {
        texto: "Disponible",
        clase: "stock-disponible"
    };
}
// -----------------------------------------------------
// ELIMINAR PRODUCTO
// -----------------------------------------------------
function eliminarProducto(
    codigo
) {
    const sesion =
        obtenerSesionAdmin();
    // Solo un administrador puede eliminar productos.
    if (
        !sesion ||
        sesion.tipoUsuario !==
            "Administrador"
    ) {
        return;
    }
    const producto =
        productos.find(
            (producto) =>
                producto.codigo === codigo
        );
    if (!producto) {
        return;
    }

    const confirmar =
        window.confirm(
            `¿Seguro que deseas eliminar "${producto.nombre}"?`
        );

    if (!confirmar) {
        return;
    }

    const productosActualizados =
        productos.filter(
            (producto) =>
                producto.codigo !== codigo
        );
    guardarProductos(
        productosActualizados
    );
    if (mensajeAdminProductos) {
        mensajeAdminProductos.textContent =
            "Producto eliminado correctamente.";
    }
    mostrarProductosAdmin();
}
// -----------------------------------------------------
// CREAR BOTÓN
// -----------------------------------------------------
function crearBotonAccion(
    texto,
    clase
) {
    const boton =
        document.createElement(
            "button"
        );

    boton.type =
        "button";

    boton.textContent =
        texto;

    boton.className =
        clase;
    return boton;
}
// -----------------------------------------------------
// MOSTRAR PRODUCTOS
// -----------------------------------------------------
function mostrarProductosAdmin() {
    if (!tablaProductosAdmin) {
        return;
    }

    tablaProductosAdmin.replaceChildren();

    const sesion =
        obtenerSesionAdmin();
    if (!sesion) {
        return;
    }

    if (cantidadProductos) {
        cantidadProductos.textContent =
            `${productos.length} ${
                productos.length === 1
                    ? "producto"
                    : "productos"
            }`;
    }

    // Si no hay productos.
    if (productos.length === 0) {
        const fila =
            document.createElement(
                "tr"
            );

        const celda =
            document.createElement(
                "td"
            );

        celda.colSpan = 8;

        celda.textContent =
            "No hay productos registrados.";

        celda.className =
            "tabla-vacia";

        fila.appendChild(
            celda
        );

        tablaProductosAdmin.appendChild(
            fila
        );
        return;
    }

    productos.forEach(
        (producto) => {
            const fila =
                document.createElement(
                    "tr"
                );
            // -----------------------------------------
            // IMAGEN
            // -----------------------------------------
            const celdaImagen =
                document.createElement(
                    "td"
                );

            const imagen =
                document.createElement(
                    "img"
                );

            imagen.className =
                "admin-producto-imagen";

            imagen.src =
                producto.imagen
                    ? `../${producto.imagen}`
                    : "../img/jockey-negro.jpg";

            imagen.alt =
                producto.nombre;

            celdaImagen.appendChild(
                imagen
            );
            // -----------------------------------------
            // CÓDIGO
            // -----------------------------------------
            const celdaCodigo =
                document.createElement(
                    "td"
                );

            celdaCodigo.textContent =
                producto.codigo;
            // -----------------------------------------
            // NOMBRE
            // -----------------------------------------
            const celdaNombre =
                document.createElement(
                    "td"
                );

            celdaNombre.textContent =
                producto.nombre;
            // -----------------------------------------
            // CATEGORÍA
            // -----------------------------------------
            const celdaCategoria =
                document.createElement(
                    "td"
                );

            celdaCategoria.textContent =
                producto.categoria;
            // -----------------------------------------
            // PRECIO
            // -----------------------------------------
            const celdaPrecio =
                document.createElement(
                    "td"
                );

            celdaPrecio.textContent =
                formatoPrecioAdmin.format(
                    producto.precio
                );
            // -----------------------------------------
            // STOCK
            // -----------------------------------------
            const celdaStock =
                document.createElement(
                    "td"
                );
            celdaStock.textContent =
                producto.stock;
            // -----------------------------------------
            // ESTADO
            // -----------------------------------------
            const celdaEstado =
                document.createElement(
                    "td"
                );

            const estado =
                obtenerEstadoStock(
                    producto
                );

            const etiquetaEstado =
                document.createElement(
                    "span"
                );

            etiquetaEstado.textContent =
                estado.texto;

            etiquetaEstado.className =
                `estado-stock ${estado.clase}`;

            celdaEstado.appendChild(
                etiquetaEstado
            );
            // -----------------------------------------
            // ACCIONES
            // -----------------------------------------
            const celdaAcciones =
                document.createElement(
                    "td"
                );

            celdaAcciones.className =
                "admin-acciones";

            // VER
            const enlaceVer =
                document.createElement(
                    "a"
                );

            enlaceVer.href =
                `../producto.html?id=${
                    encodeURIComponent(
                        producto.codigo
                    )
                }`;

            enlaceVer.textContent =
                "Ver";

            enlaceVer.className =
                "boton-admin-secundario";

            enlaceVer.target =
                "_blank";

            celdaAcciones.appendChild(
                enlaceVer
            );
            // -----------------------------------------
            // SOLO ADMINISTRADOR
            // -----------------------------------------
            if (
                sesion.tipoUsuario ===
                "Administrador"
            ) {
                // EDITAR
                const enlaceEditar =
                    document.createElement(
                        "a"
                    );

                enlaceEditar.href =
                    `producto-formulario.html?codigo=${
                        encodeURIComponent(
                            producto.codigo
                        )
                    }`;

                enlaceEditar.textContent =
                    "Editar";

                enlaceEditar.className =
                    "boton-admin-secundario";

                celdaAcciones.appendChild(
                    enlaceEditar
                );
                // ELIMINAR
                const botonEliminar =
                    crearBotonAccion(
                        "Eliminar",
                        "boton-admin-eliminar"
                    );

                botonEliminar.addEventListener(
                    "click",
                    () => {
                        eliminarProducto(
                            producto.codigo
                        );
                    }
                );
                celdaAcciones.appendChild(
                    botonEliminar
                );
            }
            // -----------------------------------------
            // AGREGAR CELDAS
            // -----------------------------------------
            fila.append(
                celdaImagen,
                celdaCodigo,
                celdaNombre,
                celdaCategoria,
                celdaPrecio,
                celdaStock,
                celdaEstado,
                celdaAcciones
            );

            tablaProductosAdmin.appendChild(
                fila
            );
        }
    );
}
// -----------------------------------------------------
// INICIAR LISTADO
// -----------------------------------------------------
if (tablaProductosAdmin) {
    mostrarProductosAdmin();
}
// =====================================================
// FORMULARIO CREAR / EDITAR PRODUCTO
// =====================================================
const formularioProducto =
    document.getElementById(
        "formulario-producto"
    );

if (formularioProducto) {
    // -------------------------------------------------
    // SOLO EL ADMINISTRADOR PUEDE CREAR O EDITAR
    // -------------------------------------------------
    const sesionFormularioProducto =
        obtenerSesionAdmin();
    if (
        !sesionFormularioProducto ||
        sesionFormularioProducto.tipoUsuario !==
            "Administrador"
    ) {
        window.location.href =
            "productos.html";

    }
    // -------------------------------------------------
    // CAMPOS
    // -------------------------------------------------
    const campoCodigoProducto =
        document.getElementById(
            "codigo-producto"
        );
    const campoNombreProducto =
        document.getElementById(
            "nombre-producto"
        );
    const campoDescripcionProducto =
        document.getElementById(
            "descripcion-producto"
        );
    const campoPrecioProducto =
        document.getElementById(
            "precio-producto"
        );
    const campoStockProducto =
        document.getElementById(
            "stock-producto"
        );
    const campoStockCriticoProducto =
        document.getElementById(
            "stock-critico-producto"
        );
    const campoCategoriaProducto =
        document.getElementById(
            "categoria-producto"
        );
    const campoImagenProducto =
        document.getElementById(
            "imagen-producto"
        );
    const resultadoProducto =
        document.getElementById(
            "resultado-producto"
        );
    const tituloFormularioProducto =
        document.getElementById(
            "titulo-formulario-producto"
        );
    const descripcionFormularioProducto =
        document.getElementById(
            "descripcion-formulario-producto"
        );
    const botonGuardarProducto =
        document.getElementById(
            "boton-guardar-producto"
        );
    const previewImagenProducto =
        document.getElementById(
            "preview-imagen-producto"
        );
    // -------------------------------------------------
    // SABER SI ESTAMOS EDITANDO
    // -------------------------------------------------
    const parametrosProducto =
        new URLSearchParams(
            window.location.search
        );
    const codigoProductoEditar =
        parametrosProducto.get(
            "codigo"
        );
    let productoEditando =
        null;
    if (codigoProductoEditar) {
        productoEditando =
            productos.find(
                (producto) =>
                    producto.codigo ===
                    codigoProductoEditar
            );
    }
    // -------------------------------------------------
    // NORMALIZAR CÓDIGO
    // -------------------------------------------------
    function normalizarCodigoProducto(
        codigo
    ) {
        return codigo
            .trim()
            .toUpperCase();
    }
    // -------------------------------------------------
    // VALIDAR CÓDIGO
    // -------------------------------------------------
    function validarCodigoProducto() {
        const codigo =
            normalizarCodigoProducto(
                campoCodigoProducto.value
            );

        let error = "";

        if (!codigo) {
            error =
                "Escribe el código del producto.";
        } else if (codigo.length < 3) {
            error =
                "El código debe tener al menos 3 caracteres.";
        }
        if (!error) {
            const codigoExiste =
                productos.some(
                    (producto) => {
                        if (
                            productoEditando &&
                            producto.codigo ===
                                productoEditando.codigo
                        ) {
                            return false;
                        }

                        return (
                            producto.codigo
                                .toUpperCase() ===
                            codigo
                        );
                    }
                );
            if (codigoExiste) {
                error =
                    "Ya existe un producto con este código.";
            }
        }

        mostrarErrorCampo(
            campoCodigoProducto,
            error
        );
        return error === "";
    }
    // -------------------------------------------------
    // VALIDAR NOMBRE
    // -------------------------------------------------
    function validarNombreProducto() {
        const error =
            validarTexto(
                campoNombreProducto.value,
                "nombre",
                100
            );
        mostrarErrorCampo(
            campoNombreProducto,
            error
        );
        return error === "";
    }
    // -------------------------------------------------
    // VALIDAR DESCRIPCIÓN
    // -------------------------------------------------
    function validarDescripcionProducto() {
        const error =
            validarTexto(
                campoDescripcionProducto.value,
                "descripción",
                500,
                false
            );

        mostrarErrorCampo(
            campoDescripcionProducto,
            error
        );
        return error === "";
    }
    // -------------------------------------------------
    // VALIDAR PRECIO
    // -------------------------------------------------
    function validarPrecioProducto() {
        const error =
            validarNumero(
                campoPrecioProducto.value,
                "precio",
                0,
                true
            );

        mostrarErrorCampo(
            campoPrecioProducto,
            error
        );
        return error === "";
    }
    // -------------------------------------------------
    // VALIDAR STOCK
    // -------------------------------------------------
    function validarStockProducto() {
        const error =
            validarEntero(
                campoStockProducto.value,
                "stock",
                0,
                true
            );

        mostrarErrorCampo(
            campoStockProducto,
            error
        );
        return error === "";
    }
    // -------------------------------------------------
    // VALIDAR STOCK CRÍTICO
    // -------------------------------------------------
    function validarStockCriticoProducto() {
        const error =
            validarEntero(
                campoStockCriticoProducto.value,
                "stock crítico",
                0,
                false
            );
        mostrarErrorCampo(
            campoStockCriticoProducto,
            error
        );
        return error === "";
    }
    // -------------------------------------------------
    // VALIDAR CATEGORÍA
    // -------------------------------------------------
    function validarCategoriaProducto() {
        const error =
            validarSeleccion(
                campoCategoriaProducto.value,
                "una categoría"
            );
        mostrarErrorCampo(
            campoCategoriaProducto,
            error
        );
        return error === "";
    }
    // -------------------------------------------------
    // ACTUALIZAR IMAGEN
    // -------------------------------------------------
    function actualizarPreviewProducto() {
        const ruta =
            campoImagenProducto.value.trim();

        if (!ruta) {
            previewImagenProducto.src =
                "../img/jockey-negro.jpg";
            return;
        }
        
        previewImagenProducto.src =
            `../${ruta}`;
    }

    previewImagenProducto.addEventListener(
        "error",
        () => {
            previewImagenProducto.src =
                "../img/jockey-negro.jpg";
        }
    );

    campoImagenProducto.addEventListener(
        "input",
        actualizarPreviewProducto
    );

    campoCodigoProducto.addEventListener(
        "input",
        validarCodigoProducto
    );

    campoNombreProducto.addEventListener(
        "input",
        validarNombreProducto
    );

    campoDescripcionProducto.addEventListener(
        "input",
        validarDescripcionProducto
    );

    campoPrecioProducto.addEventListener(
        "input",
        validarPrecioProducto
    );

    campoStockProducto.addEventListener(
        "input",
        validarStockProducto
    );

    campoStockCriticoProducto.addEventListener(
        "input",
        validarStockCriticoProducto
    );

    campoCategoriaProducto.addEventListener(
        "change",
        validarCategoriaProducto
    );

    // -------------------------------------------------
    // CARGAR DATOS SI ESTAMOS EDITANDO
    // -------------------------------------------------

    if (productoEditando) {
        tituloFormularioProducto.textContent =
            "Editar producto";

        descripcionFormularioProducto.textContent =
            "Modifica los datos del producto seleccionado.";

        botonGuardarProducto.textContent =
            "Guardar cambios";

        campoCodigoProducto.value =
            productoEditando.codigo;

        campoCodigoProducto.readOnly =
            true;

        campoNombreProducto.value =
            productoEditando.nombre;

        campoDescripcionProducto.value =
            productoEditando.descripcion || "";

        campoPrecioProducto.value =
            productoEditando.precio;

        campoStockProducto.value =
            productoEditando.stock;

        campoStockCriticoProducto.value =
            productoEditando.stockCritico ??
            "";

        campoCategoriaProducto.value =
            productoEditando.categoria;

        campoImagenProducto.value =
            productoEditando.imagen || "";
        actualizarPreviewProducto();
    }
    // -------------------------------------------------
    // SI EL CÓDIGO A EDITAR NO EXISTE
    // -------------------------------------------------
    if (
        codigoProductoEditar &&
        !productoEditando
    ) {
        resultadoProducto.textContent =
            "El producto seleccionado no existe.";

        botonGuardarProducto.disabled =
            true;
    }
    // -------------------------------------------------
    // GUARDAR PRODUCTO
    // -------------------------------------------------
    formularioProducto.addEventListener(
        "submit",
        (evento) => {
            evento.preventDefault();
            resultadoProducto.textContent =
                "";

            const validacionesProducto = [
                validarCodigoProducto(),
                validarNombreProducto(),
                validarDescripcionProducto(),
                validarPrecioProducto(),
                validarStockProducto(),
                validarStockCriticoProducto(),
                validarCategoriaProducto()
            ];

            const formularioValido =
                validacionesProducto.every(
                    (resultado) =>
                        resultado === true
                );
            if (!formularioValido) {
                resultadoProducto.textContent =
                    "Revisa los campos indicados antes de guardar.";
                return;
            }
            // -----------------------------------------
            // PREPARAR PRODUCTO
            // -----------------------------------------
            const rutaImagen =
                campoImagenProducto.value
                    .trim();
            const productoGuardado = {
                codigo:
                    normalizarCodigoProducto(
                        campoCodigoProducto.value
                    ),
                nombre:
                    campoNombreProducto.value
                        .trim(),
                descripcion:
                    campoDescripcionProducto.value
                        .trim(),
                precio:
                    Number(
                        campoPrecioProducto.value
                    ),
                stock:
                    Number(
                        campoStockProducto.value
                    ),
                stockCritico:
                    campoStockCriticoProducto.value === ""
                        ? null
                        : Number(
                            campoStockCriticoProducto.value
                        ),
                categoria:
                    campoCategoriaProducto.value,
                imagen:
                    rutaImagen ||
                    "img/jockey-negro.jpg"
            };
            // -----------------------------------------
            // EDITAR
            // -----------------------------------------
            if (productoEditando) {
                const indiceProducto =
                    productos.findIndex(
                        (producto) =>
                            producto.codigo ===
                            productoEditando.codigo
                    );

                if (indiceProducto !== -1) {
                    productos[indiceProducto] =
                        productoGuardado;
                }

                guardarProductos(
                    productos
                );
                resultadoProducto.textContent =
                    "Producto actualizado correctamente.";
            }
            // -----------------------------------------
            // CREAR
            // -----------------------------------------
            else {
                productos.push(
                    productoGuardado
                );

                guardarProductos(
                    productos
                );

                resultadoProducto.textContent =
                    "Producto creado correctamente.";
            }
            // -----------------------------------------
            // VOLVER AL LISTADO
            // -----------------------------------------
            setTimeout(
                () => {
                    window.location.href =
                        "productos.html";
                },
                700
            );
        }
    );
}
// =====================================================
// ADMINISTRACIÓN DE USUARIOS
// =====================================================
const CLAVE_USUARIOS_ADMIN =
    "kings-usuarios";
// -----------------------------------------------------
// OBTENER USUARIOS
// -----------------------------------------------------
function obtenerUsuariosAdmin() {
    try {
        const usuarios =
            JSON.parse(
                localStorage.getItem(
                    CLAVE_USUARIOS_ADMIN
                ) || "[]"
            );
        return Array.isArray(usuarios)
            ? usuarios
            : [];
    } catch {
        return [];
    }
}
// -----------------------------------------------------
// GUARDAR USUARIOS
// -----------------------------------------------------
function guardarUsuariosAdmin(
    usuarios
) {
    localStorage.setItem(
        CLAVE_USUARIOS_ADMIN,
        JSON.stringify(
            usuarios
        )
    );
}

// =====================================================
// LISTADO DE USUARIOS
// =====================================================
const tablaUsuariosAdmin =
    document.getElementById(
        "tabla-usuarios-admin"
    );

const cantidadUsuarios =
    document.getElementById(
        "cantidad-usuarios"
    );

const mensajeAdminUsuarios =
    document.getElementById(
        "mensaje-admin-usuarios"
    );

// -----------------------------------------------------
// ELIMINAR USUARIO
// -----------------------------------------------------
function eliminarUsuarioAdmin(
    run
) {
    const sesion =
        obtenerSesionAdmin();

    if (
        !sesion ||
        sesion.tipoUsuario !==
            "Administrador"
    ) {
        return;
    }

    if (sesion.run === run) {
        if (mensajeAdminUsuarios) {
            mensajeAdminUsuarios.textContent =
                "No puedes eliminar la cuenta con la que tienes la sesión iniciada.";
        }
        return;
    }

    const usuarios =
        obtenerUsuariosAdmin();

    const usuario =
        usuarios.find(
            (usuario) =>
                usuario.run === run
        );

    if (!usuario) {
        return;
    }

    const confirmar =
        window.confirm(
            `¿Seguro que deseas eliminar a ${usuario.nombre} ${usuario.apellidos}?`
        );

    if (!confirmar) {
        return;
    }

    const usuariosActualizados =
        usuarios.filter(
            (usuario) =>
                usuario.run !== run
        );

    guardarUsuariosAdmin(
        usuariosActualizados
    );

    if (mensajeAdminUsuarios) {
        mensajeAdminUsuarios.textContent =
            "Usuario eliminado correctamente.";
    }

    mostrarUsuariosAdmin();
}

function mostrarUsuariosAdmin() {
    if (!tablaUsuariosAdmin) {
        return;
    }

    const sesion =
        obtenerSesionAdmin();
    // Solo Administrador.
    if (
        !sesion ||
        sesion.tipoUsuario !==
            "Administrador"
    ) {
        window.location.href =
            "productos.html";

        return;
    }

    const usuarios =
        obtenerUsuariosAdmin();
    tablaUsuariosAdmin.replaceChildren();

    if (cantidadUsuarios) {
        cantidadUsuarios.textContent =
            `${usuarios.length} ${
                usuarios.length === 1
                    ? "usuario"
                    : "usuarios"
            }`;

    }

    if (usuarios.length === 0) {
        const fila =
            document.createElement(
                "tr"
            );

        const celda =
            document.createElement(
                "td"
            );

        celda.colSpan = 7;
        celda.className =
            "tabla-vacia";
        celda.textContent =
            "No hay usuarios registrados.";

        fila.appendChild(
            celda
        );

        tablaUsuariosAdmin.appendChild(
            fila
        );
        return;
    }

    usuarios.forEach(
        (usuario) => {
            const fila =
                document.createElement(
                    "tr"
                );

            // RUN
            const celdaRun =
                document.createElement(
                    "td"
                );

            celdaRun.textContent =
                usuario.run;

            // NOMBRE
            const celdaNombre =
                document.createElement(
                    "td"
                );

            celdaNombre.textContent =
                `${usuario.nombre} ${usuario.apellidos}`;

            // CORREO
            const celdaCorreo =
                document.createElement(
                    "td"
                );

            celdaCorreo.textContent =
                usuario.correo;

            // ROL
            const celdaRol =
                document.createElement(
                    "td"
                );

            const etiquetaRol =
                document.createElement(
                    "span"
                );

            etiquetaRol.className =
                "etiqueta-rol"

            etiquetaRol.textContent =
                usuario.tipoUsuario;

            celdaRol.appendChild(
                etiquetaRol
            );

            // REGIÓN
            const celdaRegion =
                document.createElement(
                    "td"
                );

            celdaRegion.textContent =
                usuario.region || "-";

            // COMUNA
            const celdaComuna =
                document.createElement(
                    "td"
                );
            celdaComuna.textContent =
                usuario.comuna || "-";

            // ACCIONES
            const celdaAcciones =
                document.createElement(
                    "td"
                );

            celdaAcciones.className =
                "admin-acciones";

            // EDITAR
            const enlaceEditar =
                document.createElement(
                    "a"
                );

            enlaceEditar.href =
                `usuario-formulario.html?run=${
                    encodeURIComponent(
                        usuario.run
                    )
                }`;

            enlaceEditar.textContent =
                "Editar";
            enlaceEditar.className =
                "boton-admin-secundario";
            celdaAcciones.appendChild(
                enlaceEditar
            );
            // ELIMINAR
            const botonEliminar =
                document.createElement(
                    "button"
                );
            botonEliminar.type =
                "button";
            botonEliminar.textContent =
                "Eliminar";
            botonEliminar.className =
                "boton-admin-eliminar";
            botonEliminar.addEventListener(
                "click",
                () => {
                    eliminarUsuarioAdmin(
                        usuario.run
                    );
                }
            );

            celdaAcciones.appendChild(
                botonEliminar
            );

            fila.append(
                celdaRun,
                celdaNombre,
                celdaCorreo,
                celdaRol,
                celdaRegion,
                celdaComuna,
                celdaAcciones
            );

            tablaUsuariosAdmin.appendChild(
                fila
            );
        }
    );
}

if (tablaUsuariosAdmin) {
    mostrarUsuariosAdmin();
}
// =====================================================
// FORMULARIO CREAR / EDITAR USUARIO
// =====================================================
const formularioUsuarioAdmin =
    document.getElementById(
        "formulario-usuario-admin"
    );

if (formularioUsuarioAdmin) {
    const sesionUsuarioAdmin =
        obtenerSesionAdmin();

    if (
        !sesionUsuarioAdmin ||
        sesionUsuarioAdmin.tipoUsuario !==
            "Administrador"
    ) {
        window.location.href =
            "productos.html";
    }
    // -------------------------------------------------
    // CAMPOS
    // -------------------------------------------------
    const campoRunUsuario =
        document.getElementById(
            "run"
        );
    const campoNombreUsuario =
        document.getElementById(
            "nombre"
        );
    const campoApellidosUsuario =
        document.getElementById(
            "apellidos"
        );
    const campoCorreoUsuario =
        document.getElementById(
            "correo"
        );
    const campoFechaUsuario =
        document.getElementById(
            "fecha-nacimiento"
        );
    const campoContrasenaUsuario =
        document.getElementById(
            "contrasena"
        );
    const campoConfirmacionUsuario =
        document.getElementById(
            "confirmar-contrasena"
        );
    const campoTipoUsuario =
        document.getElementById(
            "tipo-usuario"
        );
    const campoRegionUsuario =
        document.getElementById(
            "region"
        );
    const campoComunaUsuario =
        document.getElementById(
            "comuna"
        );
    const campoDireccionUsuario =
        document.getElementById(
            "direccion"
        );
    const resultadoUsuarioAdmin =
        document.getElementById(
            "resultado-usuario-admin"
        );
    const tituloFormularioUsuario =
        document.getElementById(
            "titulo-formulario-usuario"
        );
    const descripcionFormularioUsuario =
        document.getElementById(
            "descripcion-formulario-usuario"
        );
    const botonGuardarUsuario =
        document.getElementById(
            "boton-guardar-usuario"
        );
    const marcaPassword =
        document.getElementById(
            "marca-password"
        );
    const marcaConfirmacion =
        document.getElementById(
            "marca-confirmacion"
        );
    // -------------------------------------------------
    // DETECTAR EDICIÓN
    // -------------------------------------------------
    const parametrosUsuario =
        new URLSearchParams(
            window.location.search
        );
    const runUsuarioEditar =
        parametrosUsuario.get(
            "run"
        );
    let usuarioEditando =
        null;
    if (runUsuarioEditar) {
        usuarioEditando =
            obtenerUsuariosAdmin().find(
                (usuario) =>
                    usuario.run ===
                    runUsuarioEditar
            );
    }
    // -------------------------------------------------
    // RUN
    // -------------------------------------------------
    function validarRunUsuarioAdmin() {
        let error =
            validarRun(
                campoRunUsuario.value
            );
        if (!error) {
            const runNormalizado =
                normalizarRun(
                    campoRunUsuario.value
                );
            const existe =
                obtenerUsuariosAdmin().some(
                    (usuario) => {
                        if (
                            usuarioEditando &&
                            usuario.run ===
                                usuarioEditando.run
                        ) {
                            return false;
                        }
                        return (
                            usuario.run ===
                            runNormalizado
                        );

                    }
                );
            if (existe) {
                error =
                    "Ya existe un usuario con este RUN.";
            }
        }
        mostrarErrorCampo(
            campoRunUsuario,
            error
        );
        return error === "";
    }
    // -------------------------------------------------
    // NOMBRE
    // -------------------------------------------------
    function validarNombreUsuarioAdmin() {
        const error =
            validarTexto(
                campoNombreUsuario.value,
                "nombre",
                50
            );
        mostrarErrorCampo(
            campoNombreUsuario,
            error
        );
        return error === "";
    }1
    // -------------------------------------------------
    // APELLIDOS
    // -------------------------------------------------
    function validarApellidosUsuarioAdmin() {
        const error =
            validarTexto(
                campoApellidosUsuario.value,
                "apellidos",
                100
            );
        mostrarErrorCampo(
            campoApellidosUsuario,
            error
        );
        return error === "";
    }
    // -------------------------------------------------
    // CORREO
    // -------------------------------------------------
    function validarCorreoUsuarioAdmin() {
        let error =
            validarCorreo(
                campoCorreoUsuario.value);
        if (!error) {
            const correo =
                normalizarCorreo(
                    campoCorreoUsuario.value
                );

            const existe =
                obtenerUsuariosAdmin().some(
                    (usuario) => {
                        if (
                            usuarioEditando &&
                            usuario.run ===
                                usuarioEditando.run
                        ) {

                            return false;

                        }

                        return (
                            usuario.correo ===
                            correo
                        );
                    }
                );

            if (existe) {
                error =
                    "Ya existe un usuario con este correo.";
            }
        }
        mostrarErrorCampo(
            campoCorreoUsuario,
            error
        );
        return error === "";
    }
    // -------------------------------------------------
    // ROL
    // -------------------------------------------------
    function validarTipoUsuarioAdmin() {
        const error =
            validarSeleccion(
                campoTipoUsuario.value,
                "un tipo de usuario"
            );
        mostrarErrorCampo(
            campoTipoUsuario,
            error
        );
        return error === "";
    }
    // -------------------------------------------------
    // FECHA
    // -------------------------------------------------
    function validarFechaUsuarioAdmin() {
        const error =
            validarFechaNacimiento(
                campoFechaUsuario.value,
                false
            );
        mostrarErrorCampo(
            campoFechaUsuario,
            error
        );
        return error === "";
    }
    // -------------------------------------------------
    // PASSWORD
    // -------------------------------------------------
    function validarPasswordUsuarioAdmin() {
        let error = "";
        if (!usuarioEditando) {
            error =
                validarContrasena(
                    campoContrasenaUsuario.value
                );
        } else if (
            campoContrasenaUsuario.value
        ) {
            error =
                validarContrasena(
                    campoContrasenaUsuario.value
                );
        }
        mostrarErrorCampo(
            campoContrasenaUsuario,
            error
        );
        return error === "";
    }

    function validarConfirmacionUsuarioAdmin() {
        let error = "";
        if (!usuarioEditando) {
            error =
                validarConfirmacionContrasena(
                    campoContrasenaUsuario.value,
                    campoConfirmacionUsuario.value
                );
        } else if (
            campoContrasenaUsuario.value ||
            campoConfirmacionUsuario.value
        ) {
            error =
                validarConfirmacionContrasena(
                    campoContrasenaUsuario.value,
                    campoConfirmacionUsuario.value
                );
        }
        mostrarErrorCampo(
            campoConfirmacionUsuario,
            error
        );
        return error === "";
    }
    // -------------------------------------------------
    // REGIÓN
    // -------------------------------------------------
    function validarRegionUsuarioAdmin() {
        const error =
            validarSeleccion(
                campoRegionUsuario.value,
                "una región"
            );
        mostrarErrorCampo(
            campoRegionUsuario,
            error
        );
        return error === "";
    }
    // -------------------------------------------------
    // COMUNA
    // -------------------------------------------------
    function validarComunaUsuarioAdmin() {
        const error =
            validarSeleccion(
                campoComunaUsuario.value,
                "una comuna"
            );

        mostrarErrorCampo(
            campoComunaUsuario,
            error
        );
        return error === "";
    }
    // -------------------------------------------------
    // DIRECCIÓN
    // -------------------------------------------------
    function validarDireccionUsuarioAdmin() {
        const error =
            validarDireccion(
                campoDireccionUsuario.value
            );
        mostrarErrorCampo(
            campoDireccionUsuario,
            error
        );
        return error === "";
    }
    // -------------------------------------------------
    // EVENTOS
    // -------------------------------------------------
    campoRunUsuario.addEventListener(
        "input",
        validarRunUsuarioAdmin
    );

    campoNombreUsuario.addEventListener(
        "input",
        validarNombreUsuarioAdmin
    );

    campoApellidosUsuario.addEventListener(
        "input",
        validarApellidosUsuarioAdmin
    );

    campoCorreoUsuario.addEventListener(
        "input",
        validarCorreoUsuarioAdmin
    );

    campoFechaUsuario.addEventListener(
        "change",
        validarFechaUsuarioAdmin
    );

    campoContrasenaUsuario.addEventListener(
        "input",
        () => {
            validarPasswordUsuarioAdmin();
            validarConfirmacionUsuarioAdmin();
        }
    );

    campoConfirmacionUsuario.addEventListener(
        "input",
        validarConfirmacionUsuarioAdmin
    );

    campoTipoUsuario.addEventListener(
        "change",
        validarTipoUsuarioAdmin
    );

    campoRegionUsuario.addEventListener(
        "change",
        validarRegionUsuarioAdmin
    );

    campoComunaUsuario.addEventListener(
        "change",
        validarComunaUsuarioAdmin
    );

    campoDireccionUsuario.addEventListener(
        "input",
        validarDireccionUsuarioAdmin
    );
    // -------------------------------------------------
    // MODO EDITAR
    // -------------------------------------------------
    if (usuarioEditando) {
        tituloFormularioUsuario.textContent =
            "Editar usuario";

        descripcionFormularioUsuario.textContent =
            "Modifica los datos del usuario seleccionado.";

        botonGuardarUsuario.textContent =
            "Guardar cambios";

        campoRunUsuario.value =
            usuarioEditando.run;

        campoRunUsuario.readOnly =
            true;

        campoNombreUsuario.value =
            usuarioEditando.nombre;

        campoApellidosUsuario.value =
            usuarioEditando.apellidos;

        campoCorreoUsuario.value =
            usuarioEditando.correo;

        campoFechaUsuario.value =
            usuarioEditando.fechaNacimiento || "";

        campoTipoUsuario.value =
            usuarioEditando.tipoUsuario;

        campoDireccionUsuario.value =
            usuarioEditando.direccion || "";

        if (marcaPassword) {
            marcaPassword.textContent =
                "(opcional)";
        }

        if (marcaConfirmacion) {
            marcaConfirmacion.textContent =
                "(opcional)";
        }

        const ayudaPassword =
            document.getElementById(
                "ayuda-contrasena"
            );

        if (ayudaPassword) {
            ayudaPassword.textContent =
                "Déjala vacía para mantener la contraseña actual.";
        }
        // Cargar región y comuna.
        campoRegionUsuario.value =
            usuarioEditando.region || "";

        if (
            usuarioEditando.region &&
            typeof cargarComunas ===
                "function"
        ) {
            cargarComunas(
                usuarioEditando.region
            );

            campoComunaUsuario.value =
                usuarioEditando.comuna || "";
        }
    }
    // Si el RUN de la URL no existe.
    if (
        runUsuarioEditar &&
        !usuarioEditando
    ) {
        resultadoUsuarioAdmin.textContent =
            "El usuario seleccionado no existe.";

        botonGuardarUsuario.disabled =
            true;
    }
    // -------------------------------------------------
    // GUARDAR
    // -------------------------------------------------
    formularioUsuarioAdmin.addEventListener(
        "submit",
        (evento) => {
            evento.preventDefault();
            resultadoUsuarioAdmin.textContent =
                "";
            const resultados = [
                validarRunUsuarioAdmin(),
                validarNombreUsuarioAdmin(),
                validarApellidosUsuarioAdmin(),
                validarCorreoUsuarioAdmin(),
                validarFechaUsuarioAdmin(),
                validarPasswordUsuarioAdmin(),
                validarConfirmacionUsuarioAdmin(),
                validarTipoUsuarioAdmin(),
                validarRegionUsuarioAdmin(),
                validarComunaUsuarioAdmin(),
                validarDireccionUsuarioAdmin()
            ];

            const formularioValido =
                resultados.every(
                    (resultado) =>
                        resultado === true
                );

            if (!formularioValido) {
                resultadoUsuarioAdmin.textContent =
                    "Revisa los campos indicados antes de guardar.";
                return;
            }

            const usuarios =
                obtenerUsuariosAdmin();
            // Contraseña nueva o actual.
            let contrasenaFinal =
                campoContrasenaUsuario.value;
            if (
                usuarioEditando &&
                !campoContrasenaUsuario.value
            ) {
                contrasenaFinal =
                    usuarioEditando.contrasena;

            }
            const usuarioGuardado = {
                run:
                    normalizarRun(
                        campoRunUsuario.value
                    ),
                nombre:
                    campoNombreUsuario.value
                        .trim(),
                apellidos:
                    campoApellidosUsuario.value
                        .trim(),
                correo:
                    normalizarCorreo(
                        campoCorreoUsuario.value
                    ),
                fechaNacimiento:
                    campoFechaUsuario.value,
                contrasena:
                    contrasenaFinal,
                tipoUsuario:
                    campoTipoUsuario.value,
                region:
                    campoRegionUsuario.value,
                comuna:
                    campoComunaUsuario.value,
                direccion:
                    campoDireccionUsuario.value
                        .trim()
            };
            // -----------------------------------------
            // EDITAR
            // -----------------------------------------
            if (usuarioEditando) {
                const indice =
                    usuarios.findIndex(
                        (usuario) =>
                            usuario.run ===
                            usuarioEditando.run
                    );

                if (indice !== -1) {
                    usuarios[indice] =
                        usuarioGuardado;

                }
                guardarUsuariosAdmin(
                    usuarios
                );
                const sesion =
                    obtenerSesionAdmin();
                if (
                    sesion &&
                    sesion.run ===
                        usuarioGuardado.run
                ) {
                    const nuevaSesion = {
                        run:
                            usuarioGuardado.run,
                        nombre:
                            usuarioGuardado.nombre,
                        apellidos:
                            usuarioGuardado.apellidos,
                        correo:
                            usuarioGuardado.correo,
                        tipoUsuario:
                            usuarioGuardado.tipoUsuario
                    };

                    localStorage.setItem(
                        CLAVE_SESION_ADMIN,
                        JSON.stringify(
                            nuevaSesion
                        )
                    );
                }

                resultadoUsuarioAdmin.textContent =
                    "Usuario actualizado correctamente.";

            }
            // -----------------------------------------
            // CREAR
            // -----------------------------------------
            else {
                usuarios.push(
                    usuarioGuardado
                );

                guardarUsuariosAdmin(
                    usuarios
                );

                resultadoUsuarioAdmin.textContent =
                    "Usuario creado correctamente.";

            }
            // VOLVER
            setTimeout(
                () => {

                    window.location.href =
                        "usuarios.html";

                },
                700
            );
        }
    );
}
// =====================================================
// LISTADO DE ÓRDENES
// =====================================================
const tablaOrdenesAdmin =
    document.getElementById(
        "tabla-ordenes-admin"
    );

const cantidadOrdenes =
    document.getElementById(
        "cantidad-ordenes"
    );

const formatoPrecioOrden =
    new Intl.NumberFormat(
        "es-CL",
        {
            style: "currency",
            currency: "CLP",
            maximumFractionDigits: 0
        }
    );

// -----------------------------------------------------
// FORMATO FECHA
// -----------------------------------------------------
function formatearFechaOrden(
    fecha
) {
    const fechaOrden =
        new Date(fecha);

    if (
        Number.isNaN(
            fechaOrden.getTime()
        )
    ) {
        return "-";
    }

    return fechaOrden.toLocaleString(
        "es-CL",
        {
            dateStyle: "short",
            timeStyle: "short"
        }
    );
}

// -----------------------------------------------------
// LISTAR ÓRDENES
// -----------------------------------------------------
function mostrarOrdenesAdmin() {
    if (!tablaOrdenesAdmin) {
        return;
    }

    const ordenes =
        obtenerOrdenes();

    ordenes.sort(
        (a, b) =>
            new Date(b.fecha) -
            new Date(a.fecha)
    );

    tablaOrdenesAdmin.replaceChildren();

    if (cantidadOrdenes) {
        cantidadOrdenes.textContent =
            `${ordenes.length} ${
                ordenes.length === 1
                    ? "orden"
                    : "órdenes"
            }`;
    }

    if (ordenes.length === 0) {
        const fila =
            document.createElement(
                "tr"
            );

        const celda =
            document.createElement(
                "td"
            );

        celda.colSpan = 7;
        celda.className =
            "tabla-vacia";
        celda.textContent =
            "Todavía no existen órdenes.";

        fila.appendChild(
            celda
        );

        tablaOrdenesAdmin.appendChild(
            fila
        );
        return;
    }

    ordenes.forEach(
        (orden) => {

            const fila =
                document.createElement(
                    "tr"
                );

            // ORDEN
            const celdaId =
                document.createElement(
                    "td"
                );

            celdaId.textContent =
                orden.id;

            // FECHA
            const celdaFecha =
                document.createElement(
                    "td"
                );

            celdaFecha.textContent =
                formatearFechaOrden(
                    orden.fecha
                );

            // CLIENTE
            const celdaCliente =
                document.createElement(
                    "td"
                );

            celdaCliente.textContent =
                `${orden.cliente.nombre} ${orden.cliente.apellidos}`
                    .trim();

            // PRODUCTOS
            const celdaCantidad =
                document.createElement(
                    "td"
                );

            const cantidadTotal =
                orden.productos.reduce(
                    (total, producto) =>
                        total +
                        producto.cantidad,
                    0
                );

            celdaCantidad.textContent =
                cantidadTotal;
            // TOTAL
            const celdaTotal =
                document.createElement(
                    "td"
                );
            celdaTotal.textContent =
                formatoPrecioOrden.format(
                    orden.total
                );
            // ESTADO
            const celdaEstado =
                document.createElement(
                    "td"
                );
            const estado =
                document.createElement(
                    "span"
                );
            estado.className =
                "estado-orden";
            estado.textContent =
                orden.estado;
            celdaEstado.appendChild(
                estado
            );
            // DETALLE
            const celdaAccion =
                document.createElement(
                    "td"
                );
            const enlaceDetalle =
                document.createElement(
                    "a"
                );
            enlaceDetalle.href =
                `orden-detalle.html?id=${
                    encodeURIComponent(
                        orden.id
                    )
                }`;
            enlaceDetalle.className =
                "boton-admin-secundario";
            enlaceDetalle.textContent =
                "Ver detalle";
            celdaAccion.appendChild(
                enlaceDetalle
            );
            fila.append(
                celdaId,
                celdaFecha,
                celdaCliente,
                celdaCantidad,
                celdaTotal,
                celdaEstado,
                celdaAccion
            );
            tablaOrdenesAdmin.appendChild(
                fila
            );
        }
    );
}

if (tablaOrdenesAdmin) {

    mostrarOrdenesAdmin();

}
// =====================================================
// DETALLE DE ORDEN
// =====================================================
const contenidoDetalleOrden =
    document.getElementById(
        "contenido-detalle-orden"
    );

if (contenidoDetalleOrden) {
    const parametrosOrden =
        new URLSearchParams(
            window.location.search
        );

    const idOrden =
        parametrosOrden.get(
            "id"
        );

    const orden =
        buscarOrdenPorId(
            idOrden
        );

    const mensajeDetalle =
        document.getElementById(
            "mensaje-detalle-orden"
        );
    // -------------------------------------------------
    // ORDEN NO ENCONTRADA
    // -------------------------------------------------
    if (!orden) {

        contenidoDetalleOrden.style.display =
            "none";


        mensajeDetalle.textContent =
            "La orden seleccionada no existe.";

    }
    // -------------------------------------------------
    // MOSTRAR DETALLE
    // -------------------------------------------------

    else {
        document.getElementById(
            "numero-orden"
        ).textContent =
            orden.id;

        document.getElementById(
            "orden-cliente"
        ).textContent =
            `${orden.cliente.nombre} ${orden.cliente.apellidos}`
                .trim();

        document.getElementById(
            "orden-run"
        ).textContent =
            orden.cliente.run || "-";

        document.getElementById(
            "orden-correo"
        ).textContent =
            orden.cliente.correo || "-";

        document.getElementById(
            "orden-fecha"
        ).textContent =
            formatearFechaOrden(
                orden.fecha
            );

        document.getElementById(
            "orden-estado"
        ).textContent =
            orden.estado;

        document.getElementById(
            "total-detalle-orden"
        ).textContent =
            formatoPrecioOrden.format(
                orden.total
            );

        const tablaProductosOrden =
            document.getElementById(
                "productos-detalle-orden"
            );

        orden.productos.forEach(
            (producto) => {
                const fila =
                    document.createElement(
                        "tr"
                    );

                const nombre =
                    document.createElement(
                        "td"
                    );

                nombre.textContent =
                    producto.nombre;

                const precio =
                    document.createElement(
                        "td"
                    );

                precio.textContent =
                    formatoPrecioOrden.format(
                        producto.precio
                    );

                const cantidad =
                    document.createElement(
                        "td"
                    );

                cantidad.textContent =
                    producto.cantidad;

                const subtotal =
                    document.createElement(
                        "td"
                    );

                subtotal.textContent =
                    formatoPrecioOrden.format(
                        producto.subtotal
                    );

                fila.append(
                    nombre,
                    precio,
                    cantidad,
                    subtotal
                );

                tablaProductosOrden.appendChild(
                    fila
                );
            }
        );

    }

}