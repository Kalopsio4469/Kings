const CLAVE_PRODUCTOS = "kings-productos";
const PRODUCTOS_INICIALES = [
    {
        codigo: "KIN001",
        nombre: "Kings Classic Negro",
        precio: 14990,
        categoria: "Snapback",
        stock: 10,
        stockCritico: 2,
        imagen: "img/jockey-negro.jpg",
        descripcion:
            "Jockey snapback negro con visera plana y cierre ajustable. " +
            "Un modelo versátil para acompañar tu estilo urbano."
    },

    {
        codigo: "KIN002",
        nombre: "Kings Trucker Blanco",
        precio: 16990,
        categoria: "Trucker",
        stock: 8,
        stockCritico: 2,
        imagen: "img/jockey-blanco.jpg",
        descripcion:
            "Jockey trucker blanco con paneles de malla y cierre ajustable. " +
            "Una opción fresca y cómoda para el día a día."
    },

    {
        codigo: "KIN003",
        nombre: "Kings Dad Hat Beige",
        precio: 12990,
        categoria: "Dad hat",
        stock: 12,
        stockCritico: 3,
        imagen: "img/jockey-beige.jpg",
        descripcion:
            "Jockey beige con visera curva y ajuste posterior. " +
            "Un diseño clásico para combinar con tus outfits favoritos."
    }
];


function obtenerProductos() {
    try {
        const datosGuardados =
            localStorage.getItem(
                CLAVE_PRODUCTOS
            );
        if (!datosGuardados) {
            const productosIniciales =
                PRODUCTOS_INICIALES.map(
                    (producto) => ({
                        ...producto
                    })
                );

            localStorage.setItem(
                CLAVE_PRODUCTOS,
                JSON.stringify(
                    productosIniciales
                )
            );

            return productosIniciales;
        }


        const datos =
            JSON.parse(
                datosGuardados
            );
        if (!Array.isArray(datos)) {
            return [];
        }


        return datos;
    } catch {
        return [];
    }
}

function guardarProductos(
    nuevosProductos
) {
    localStorage.setItem(
        CLAVE_PRODUCTOS,
        JSON.stringify(
            nuevosProductos
        )
    );
    productos =
        nuevosProductos;
}
function buscarProducto(
    codigo
) {
    return productos.find(
        (producto) =>
            producto.codigo === codigo
    );
}
let productos =
    obtenerProductos();