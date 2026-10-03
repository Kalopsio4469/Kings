const CLAVE_USUARIOS = "kings-usuarios";
const CLAVE_SESION = "kings-sesion";
function obtenerUsuarios() {
    try {
        const usuariosGuardados = JSON.parse(
            localStorage.getItem(CLAVE_USUARIOS) || "[]"
        );
        return Array.isArray(usuariosGuardados)
            ? usuariosGuardados
            : [];
    } catch {
        return [];
    }
}


function guardarUsuarios(usuarios) {
    localStorage.setItem(
        CLAVE_USUARIOS,
        JSON.stringify(usuarios)
    );
}

function obtenerSesion() {
    try {
        return JSON.parse(
            localStorage.getItem(CLAVE_SESION)
        );
    } catch {
        return null;
    }
}


function guardarSesion(usuario) {
    const sesion = {
        run: usuario.run,
        nombre: usuario.nombre,
        apellidos: usuario.apellidos,
        correo: usuario.correo,
        tipoUsuario: usuario.tipoUsuario
    };

    localStorage.setItem(
        CLAVE_SESION,
        JSON.stringify(sesion)
    );
}


function cerrarSesion() {
    localStorage.removeItem(
        CLAVE_SESION
    );
    window.location.href = "login.html";
}

const formularioRegistro = document.getElementById(
    "formulario-registro"
);

if (formularioRegistro) {
    const resultadoRegistro = document.getElementById(
        "resultado-registro"
    );

    const camposRegistro = {
        run: document.getElementById("run"),
        nombre: document.getElementById("nombre"),
        apellidos: document.getElementById("apellidos"),
        correo: document.getElementById("correo"),
        fechaNacimiento: document.getElementById(
            "fecha-nacimiento"
        ),
        contrasena: document.getElementById(
            "contrasena"
        ),
        confirmarContrasena: document.getElementById(
            "confirmar-contrasena"
        ),
        region: document.getElementById("region"),
        comuna: document.getElementById("comuna"),
        direccion: document.getElementById(
            "direccion"
        )
    };

    function obtenerErrorRegistro(campo) {
        if (campo.id === "run") {
            const errorRun = validarRun(
                campo.value
            );
            if (errorRun) {
                return errorRun;
            }

            const runNormalizado = normalizarRun(
                campo.value
            );

            const usuarioExistente =
                obtenerUsuarios().some(
                    (usuario) =>
                        usuario.run === runNormalizado
                );

            if (usuarioExistente) {
                return (
                    "Ya existe un usuario registrado " +
                    "con este RUN."
                );
            }
        }

        if (campo.id === "nombre") {
            return validarTexto(
                campo.value,
                "nombre",
                50
            );
        }


        if (campo.id === "apellidos") {
            return validarTexto(
                campo.value,
                "apellidos",
                100
            );
        }

        if (campo.id === "correo") {
            const errorCorreo = validarCorreo(
                campo.value
            );

            if (errorCorreo) {
                return errorCorreo;
            }

            const correoNormalizado =
                normalizarCorreo(
                    campo.value
                );

            const correoExistente =
                obtenerUsuarios().some(
                    (usuario) =>
                        usuario.correo ===
                        correoNormalizado
                );

            if (correoExistente) {
                return "Este correo ya está registrado.";
            }
        }

        if (campo.id === "contrasena") {
            return validarContrasena(
                campo.value
            );
        }


        if (campo.id === "confirmar-contrasena") {
            return validarConfirmacionContrasena(
                camposRegistro.contrasena.value,
                campo.value
            );
        }

        if (campo.id === "region") {
            return validarSeleccion(
                campo.value,
                "una región"
            );
        }

        if (campo.id === "comuna") {
            return validarSeleccion(
                campo.value,
                "una comuna"
            );
        }


        if (campo.id === "direccion") {
            return validarDireccion(
                campo.value
            );
        }
        return "";
    }

    function validarCampoRegistro(campo) {
        const error = obtenerErrorRegistro(
            campo
        );
        mostrarErrorCampo(
            campo,
            error
        );
        return error === "";
    }

    const camposAValidar = [
        camposRegistro.run,
        camposRegistro.nombre,
        camposRegistro.apellidos,
        camposRegistro.correo,
        camposRegistro.contrasena,
        camposRegistro.confirmarContrasena,
        camposRegistro.region,
        camposRegistro.comuna,
        camposRegistro.direccion
    ];

    camposAValidar.forEach(
        (campo) => {
            const evento =
                campo.tagName === "SELECT"
                    ? "change"
                    : "input";
            campo.addEventListener(
                evento,
                () => {
                    resultadoRegistro.textContent = "";
                    validarCampoRegistro(
                        campo
                    );

                    if (
                        campo.id === "contrasena" &&
                        camposRegistro
                            .confirmarContrasena
                            .value
                    ) {
                        validarCampoRegistro(
                            camposRegistro
                                .confirmarContrasena
                        );
                    }
                }
            );


            campo.addEventListener(
                "blur",
                () => {
                    validarCampoRegistro(
                        campo
                    );
                }
            );
        }
    );

    formularioRegistro.addEventListener(
        "submit",
        (evento) => {
            evento.preventDefault();
            resultadoRegistro.textContent = "";
            let primerCampoInvalido = null;
            camposAValidar.forEach(
                (campo) => {
                    const valido =
                        validarCampoRegistro(
                            campo
                        );

                    if (
                        !valido &&
                        !primerCampoInvalido
                    ) {
                        primerCampoInvalido =
                            campo;
                    }
                }
            );


            const errorFecha =
                validarFechaNacimiento(
                    camposRegistro
                        .fechaNacimiento
                        .value
                );

            if (errorFecha) {
                mostrarErrorCampo(
                    camposRegistro
                        .fechaNacimiento,
                    errorFecha
                );

                if (!primerCampoInvalido) {
                    primerCampoInvalido =
                        camposRegistro
                            .fechaNacimiento;
                }
            }

            if (primerCampoInvalido) {
                resultadoRegistro.textContent =
                    "Revisa los campos indicados antes de registrarte.";
                primerCampoInvalido.focus();
                return;
            }

            const nuevoUsuario = {
                run: normalizarRun(
                    camposRegistro.run.value
                ),
                nombre:
                    camposRegistro.nombre
                        .value
                        .trim(),
                apellidos:
                    camposRegistro.apellidos
                        .value
                        .trim(),
                correo: normalizarCorreo(
                    camposRegistro.correo.value
                ),
                fechaNacimiento:
                    camposRegistro
                        .fechaNacimiento
                        .value,
                contrasena:
                    camposRegistro
                        .contrasena
                        .value,
                tipoUsuario: "Cliente",
                region:
                    camposRegistro.region.value,
                comuna:
                    camposRegistro.comuna.value,
                direccion:
                    camposRegistro
                        .direccion
                        .value
                        .trim()
            };

            const usuarios =
                obtenerUsuarios();
            usuarios.push(
                nuevoUsuario
            );
            try {
                guardarUsuarios(
                    usuarios
                );
                resultadoRegistro.textContent =
                    "Cuenta creada correctamente. " +
                    "Ahora puedes iniciar sesión.";
                formularioRegistro.reset();
                if (
                    typeof reiniciarComunas ===
                    "function"
                ) {

                    reiniciarComunas();
                }
                limpiarErroresFormulario(
                    formularioRegistro
                );
            } catch {
                resultadoRegistro.textContent =
                    "No se pudo guardar el usuario.";
            }
        }
    );
}

const formularioLogin = document.getElementById(
    "formulario-login"
);


if (formularioLogin) {
    const campoCorreoLogin =
        document.getElementById(
            "correo"
        );

    const campoContrasenaLogin =
        document.getElementById(
            "contrasena"
        );

    const resultadoLogin =
        document.getElementById(
            "resultado-login"
        );

    function validarCorreoLogin() {
        const error =
            validarCorreo(
                campoCorreoLogin.value
            );

        mostrarErrorCampo(
            campoCorreoLogin,
            error
        );
        return error === "";
    }

    function validarContrasenaLogin() {
        const error =
            validarContrasena(
                campoContrasenaLogin.value
            );

        mostrarErrorCampo(
            campoContrasenaLogin,
            error
        );

        return error === "";
    }

    campoCorreoLogin.addEventListener(
        "input",
        () => {
            resultadoLogin.textContent = "";
            validarCorreoLogin();
        }
    );

    campoContrasenaLogin.addEventListener(
        "input",
        () => {
            resultadoLogin.textContent = "";
            validarContrasenaLogin();
        }
    );

    campoCorreoLogin.addEventListener(
        "blur",
        validarCorreoLogin
    );

    campoContrasenaLogin.addEventListener(
        "blur",
        validarContrasenaLogin
    );

    formularioLogin.addEventListener(
        "submit",
        (evento) => {
            evento.preventDefault();
            resultadoLogin.textContent = "";
            const correoValido =
                validarCorreoLogin();

            const contrasenaValida =
                validarContrasenaLogin();

            if (
                !correoValido ||
                !contrasenaValida
            ) {
                resultadoLogin.textContent =
                    "Revisa los datos ingresados.";
                return;
            }

            const correo =
                normalizarCorreo(
                    campoCorreoLogin.value
                );

            const contrasena =
                campoContrasenaLogin.value;

            const usuarios =
                obtenerUsuarios();

            const usuario =
                usuarios.find(
                    (usuario) =>
                        usuario.correo === correo &&
                        usuario.contrasena ===
                        contrasena
                );

            if (!usuario) {
                resultadoLogin.textContent =
                    "Correo o contraseña incorrectos.";
                return;
            }

            guardarSesion(
                usuario
            );

            resultadoLogin.textContent =
                `Bienvenido, ${usuario.nombre}.`;

            setTimeout(
                () => {
                    if (
                        usuario.tipoUsuario ===
                        "Administrador"
                    ) {
                        window.location.href =
                            "admin/index.html";
                        return;
                    }

                    if (
                        usuario.tipoUsuario ===
                        "Vendedor"
                    ) {
                        window.location.href =
                            "admin/productos.html";
                        return;
                    }

                    window.location.href =
                        "index.html";
                },
                700
            );
        }
    );

function crearAdministradorInicial() {
    const usuarios =
        obtenerUsuarios();
    const existeAdministrador =
        usuarios.some(
            (usuario) =>
                usuario.correo ===
                "admin@duoc.cl"
        );

    if (existeAdministrador) {
        return;
    }

    const administrador = {
        run: "123456785",
        nombre: "Administrador",
        apellidos: "Kings",
        correo: "admin@duoc.cl",
        fechaNacimiento: "",
        contrasena: "admin123",
        tipoUsuario:
            "Administrador",
        region:
            "Metropolitana de Santiago",
        comuna:
            "Santiago",
        direccion:
            "Administración Kings"
    };

    usuarios.push(
        administrador
    );

    guardarUsuarios(
        usuarios
    );
}

crearAdministradorInicial();
}