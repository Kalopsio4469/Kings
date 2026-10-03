const formularioContacto = document.getElementById("formulario-contacto");
const resultadoContacto = document.getElementById("resultado-contacto");
const contadorComentario = document.getElementById("contador-comentario");

const camposContacto = {
    nombre: document.getElementById("nombre"),
    correo: document.getElementById("correo"),
    comentario: document.getElementById("comentario")
};

function obtenerErrorContacto(campo) {
    const valor = campo.value.trim();

    if (campo.id === "nombre") {
        if (!valor) {
            return "Escribe tu nombre.";
        }
        if (campo.value.length > 100) {
            return "El nombre debe tener como máximo 100 caracteres.";
        }
    }

    if (campo.id === "correo" && valor !== "") {
        if (campo.value.length > 100) {
            return "El correo debe tener como máximo 100 caracteres.";
        }
        if (campo.validity.typeMismatch) {
            return "Escribe un correo válido, por ejemplo nombre@gmail.com.";
        }
        const correoPermitido =
            /^[^\s@]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/i;

        if (!correoPermitido.test(valor)) {
            return "Solo se permiten correos de duoc.cl, " +
                "profesor.duoc.cl o gmail.com.";
        }
    }

    if (campo.id === "comentario") {
        if (!valor) {
            return "Escribe tu comentario.";
        }
        if (campo.value.length > 500) {
            return "El comentario debe tener como máximo 500 caracteres.";
        }
    }

    return "";
}

function validarCampoContacto(campo) {
    const error = obtenerErrorContacto(campo);
    const contenedorError = document.getElementById(`error-${campo.id}`);

    contenedorError.textContent = error;
    campo.setAttribute("aria-invalid", error ? "true" : "false");
    campo.setCustomValidity(error);

    return error === "";
}

Object.values(camposContacto).forEach((campo) => {
    campo.addEventListener("input", () => {
        resultadoContacto.textContent = "";
        validarCampoContacto(campo);
    });

    campo.addEventListener("blur", () => {
        validarCampoContacto(campo);
    });
});

camposContacto.comentario.addEventListener("input", () => {
    contadorComentario.textContent =
        `${camposContacto.comentario.value.length} / 500 caracteres`;
});

formularioContacto.addEventListener("submit", (evento) => {
    evento.preventDefault();

    const campos = Object.values(camposContacto);
    let primerCampoInvalido = null;

    campos.forEach((campo) => {
        const valido = validarCampoContacto(campo);

        if (!valido && !primerCampoInvalido) {
            primerCampoInvalido = campo;
        }
    });

    if (primerCampoInvalido) {
        resultadoContacto.textContent =
            "Revisa los campos indicados antes de enviar.";
        primerCampoInvalido.focus();
        return;
    }

    resultadoContacto.textContent =
        "Formulario validado correctamente. " +
        "El envío es una demostración; todavía no se transmite el mensaje.";

    formularioContacto.reset();
    contadorComentario.textContent = "0 / 500 caracteres";

    campos.forEach((campo) => {
        campo.setCustomValidity("");
        campo.removeAttribute("aria-invalid");
        document.getElementById(`error-${campo.id}`).textContent = "";
    });
});