const DOMINIOS_PERMITIDOS = [
    "duoc.cl",
    "profesor.duoc.cl",
    "gmail.com"
];

function normalizarCorreo(correo) {
    return correo
        .trim()
        .toLowerCase();
}


function normalizarRun(run) {
    return run
        .trim()
        .toUpperCase();
}

function validarCorreo(correo, obligatorio = true) {

    const valor = normalizarCorreo(correo);

    if (!valor) {
        return obligatorio
            ? "Escribe tu correo electrónico."
            : "";
    }

    if (valor.length > 100) {
        return "El correo debe tener como máximo 100 caracteres.";
    }

    const estructuraCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!estructuraCorreo.test(valor)) {
        return "Escribe un correo válido, por ejemplo nombre@gmail.com.";
    }

    const partesCorreo = valor.split("@");

    if (partesCorreo.length !== 2) {
        return "El correo ingresado no es válido.";
    }

    const dominio = partesCorreo[1];

    if (!DOMINIOS_PERMITIDOS.includes(dominio)) {
        return (
            "Solo se permiten correos @duoc.cl, " +
            "@profesor.duoc.cl y @gmail.com."
        );
    }

    return "";
}

function validarRun(run) {

    const valor = normalizarRun(run);

    if (!valor) {
        return "Escribe tu RUN.";
    }

    if (valor.includes(".") || valor.includes("-")) {
        return "Ingresa el RUN sin puntos ni guion.";
    }

    if (valor.length < 7 || valor.length > 9) {
        return "El RUN debe tener entre 7 y 9 caracteres.";
    }


    if (!/^\d{6,8}[\dK]$/.test(valor)) {
        return (
            "El RUN solo puede contener números y " +
            "el dígito verificador K cuando corresponda."
        );
    }

    const cuerpo = valor.slice(0, -1);
    const digitoIngresado = valor.slice(-1);

    if (/^0+$/.test(cuerpo)) {
        return "El RUN ingresado no es válido.";
    }

    let suma = 0;
    let multiplicador = 2;

    for (
        let posicion = cuerpo.length - 1;
        posicion >= 0;
        posicion--
    ) {

        suma += Number(cuerpo[posicion]) * multiplicador;

        multiplicador++;

        if (multiplicador > 7) {
            multiplicador = 2;
        }
    }

    const resto = suma % 11;
    const resultado = 11 - resto;

    let digitoEsperado;

    if (resultado === 11) {

        digitoEsperado = "0";

    } else if (resultado === 10) {

        digitoEsperado = "K";

    } else {

        digitoEsperado = String(resultado);
    }

    if (digitoIngresado !== digitoEsperado) {
        return "El dígito verificador del RUN es incorrecto.";
    }

    return "";
}

function validarTexto(
    valor,
    nombreCampo,
    maximo,
    obligatorio = true
) {

    const texto = valor.trim();

    if (obligatorio && !texto) {
        return `Completa el campo ${nombreCampo}.`;
    }

    if (!obligatorio && !texto) {
        return "";
    }

    if (texto.length > maximo) {
        return (
            `${nombreCampo} admite como máximo ` +
            `${maximo} caracteres.`
        );
    }

    return "";
}

function validarContrasena(valor) {

    if (!valor) {
        return "Escribe tu contraseña.";
    }

    if (valor.length < 4) {
        return "La contraseña debe tener al menos 4 caracteres.";
    }

    if (valor.length > 10) {
        return "La contraseña debe tener como máximo 10 caracteres.";
    }
    
    if (valor.trim() === "") {
        return "La contraseña no puede contener solamente espacios.";
    }
    return "";
}


function validarConfirmacionContrasena(
    contrasena,
    confirmacion
) {

    if (!confirmacion) {
        return "Confirma tu contraseña.";
    }

    if (contrasena !== confirmacion) {
        return "Las contraseñas no coinciden.";
    }

    return "";
}


function validarFechaNacimiento(fecha, obligatorio = false) {

    if (!fecha) {
        return obligatorio
            ? "Selecciona tu fecha de nacimiento."
            : "";
    }

    const fechaIngresada = new Date(
        `${fecha}T00:00:00`
    );

    if (Number.isNaN(fechaIngresada.getTime())) {
        return "Selecciona una fecha válida.";
    }

    const hoy = new Date();

    hoy.setHours(0, 0, 0, 0);

    if (fechaIngresada > hoy) {
        return "La fecha de nacimiento no puede ser futura.";
    }

    return "";
}


function validarSeleccion(
    valor,
    nombreCampo,
    obligatorio = true
) {

    if (obligatorio && !valor) {
        return `Selecciona ${nombreCampo}.`;
    }

    return "";
}


function validarDireccion(direccion) {

    const valor = direccion.trim();

    if (!valor) {
        return "Escribe tu dirección.";
    }

    if (valor.length > 300) {
        return "La dirección debe tener como máximo 300 caracteres.";
    }

    return "";
}


function mostrarErrorCampo(campo, mensaje) {

    if (!campo) {
        return;
    }

    const contenedorError = document.getElementById(
        `error-${campo.id}`
    );

    if (contenedorError) {
        contenedorError.textContent = mensaje;
    }

    campo.setCustomValidity(mensaje);

    if (mensaje) {

        campo.setAttribute(
            "aria-invalid",
            "true"
        );

        campo.classList.add(
            "campo-invalido"
        );

        campo.classList.remove(
            "campo-valido"
        );

    } else {

        campo.setAttribute(
            "aria-invalid",
            "false"
        );

        campo.classList.remove(
            "campo-invalido"
        );

        if (campo.value.trim()) {
            campo.classList.add(
                "campo-valido"
            );
        } else {
            campo.classList.remove(
                "campo-valido"
            );
        }
    }
}


function limpiarErrorCampo(campo) {

    if (!campo) {
        return;
    }

    const contenedorError = document.getElementById(
        `error-${campo.id}`
    );

    if (contenedorError) {
        contenedorError.textContent = "";
    }

    campo.setCustomValidity("");

    campo.removeAttribute(
        "aria-invalid"
    );

    campo.classList.remove(
        "campo-invalido"
    );

    campo.classList.remove(
        "campo-valido"
    );
}



function limpiarErroresFormulario(formulario) {

    if (!formulario) {
        return;
    }

    const campos = formulario.querySelectorAll(
        "input, select, textarea"
    );

    campos.forEach((campo) => {
        limpiarErrorCampo(campo);
    });
}


function estaVacio(valor) {

    if (valor === null || valor === undefined) {
        return true;
    }

    return String(valor).trim() === "";
}

function validarNumero(
    valor,
    nombreCampo,
    minimo = 0,
    obligatorio = true
) {

    if (estaVacio(valor)) {

        return obligatorio
            ? `Completa el campo ${nombreCampo}.`
            : "";
    }

    const numero = Number(valor);

    if (Number.isNaN(numero)) {
        return `${nombreCampo} debe ser un número válido.`;
    }

    if (numero < minimo) {
        return (
            `${nombreCampo} no puede ser menor ` +
            `que ${minimo}.`
        );
    }

    return "";
}
function validarEntero(
    valor,
    nombreCampo,
    minimo = 0,
    obligatorio = true
) {

    const errorNumero = validarNumero(
        valor,
        nombreCampo,
        minimo,
        obligatorio
    );

    if (errorNumero) {
        return errorNumero;
    }

    if (
        !obligatorio &&
        estaVacio(valor)
    ) {
        return "";
    }

    const numero = Number(valor);

    if (!Number.isInteger(numero)) {
        return `${nombreCampo} debe ser un número entero.`;
    }

    return "";
}