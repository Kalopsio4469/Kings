const CLAVE_ORDENES = "kings-ordenes";
function obtenerOrdenes() {
    try {
        const ordenes = JSON.parse(
            localStorage.getItem(
                CLAVE_ORDENES
            ) || "[]"
        );

        return Array.isArray(ordenes)
            ? ordenes
            : [];
    } catch {
        return [];
    }
}

function guardarOrdenes(
    ordenes
) {
    localStorage.setItem(
        CLAVE_ORDENES,
        JSON.stringify(
            ordenes
        )
    );
}

function generarIdOrden() {
    const ordenes =
        obtenerOrdenes();
    let numeroMayor = 0;

    ordenes.forEach(
        (orden) => {
            const numero =
                Number(
                    String(orden.id)
                        .replace("ORD-", "")
                );
            if (
                !Number.isNaN(numero) &&
                numero > numeroMayor
            ) {
                numeroMayor =
                    numero;
            }
        }
    );

    const siguienteNumero =
        numeroMayor + 1;
    return (
        "ORD-" +
        String(siguienteNumero)
            .padStart(4, "0")
    );
}

function buscarOrdenPorId(
    id
) {
    return obtenerOrdenes().find(
        (orden) =>
            orden.id === id
    );
}