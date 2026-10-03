const articulos = [
    {
        id: "tipos",
        titulo: "¿Qué tipo de jockey va contigo?",
        imagen: "img/jockey-negro.jpg",
        alt: "Jockey Kings Classic Negro",
        introduccion:
            "La forma de la visera, los materiales y el ajuste " +
            "pueden cambiar la apariencia de un jockey. " +
            "Estas son las características de los modelos " +
            "que encontrarás en nuestro catálogo.",
        secciones: [
            {
                titulo: "Snapback: estilo y ajuste",
                texto:
                    "Nuestro Kings Classic Negro combina una visera " +
                    "plana con un cierre ajustable. Puedes acompañarlo " +
                    "con una polera sencilla y zapatillas para crear " +
                    "un conjunto urbano."
            },
            {
                titulo: "Trucker: paneles de malla",
                texto:
                    "El Kings Trucker Blanco incorpora paneles de " +
                    "malla en su diseño. Su combinación de materiales " +
                    "aporta una apariencia deportiva y casual."
            },
            {
                titulo: "Dad hat: un diseño clásico",
                texto:
                    "El Kings Dad Hat Beige tiene una visera curva " +
                    "y ajuste posterior. Su color permite combinarlo " +
                    "con prendas claras, mezclilla o tonos tierra."
            },
            {
                titulo: "Elige según tu comodidad",
                texto:
                    "Además del diseño, revisa cómo se ajusta a tu " +
                    "cabeza. Busca un modelo cómodo y elige el color " +
                    "que mejor acompañe las prendas que ya utilizas."
            }
        ]
    },
    {
        id: "cuidados",
        titulo: "Cómo cuidar tu jockey",
        imagen: "img/jockey-beige.jpg",
        alt: "Jockey Kings Dad Hat Beige",
        introduccion:
            "Cuidar tu jockey comienza por revisar las instrucciones " +
            "de su fabricante. El método de limpieza depende de los " +
            "materiales y de la estructura de cada modelo.",
        secciones: [
            {
                titulo: "Revisa la etiqueta",
                texto:
                    "Antes de limpiarlo, comprueba las indicaciones " +
                    "de lavado. No todos los jockeys toleran los " +
                    "mismos productos, temperaturas o procedimientos."
            },
            {
                titulo: "Limpieza de manchas",
                texto:
                    "Si la etiqueta lo permite, utiliza un paño " +
                    "suave ligeramente húmedo y un producto adecuado " +
                    "para el material. Prueba primero en una zona " +
                    "poco visible y evita frotar con fuerza."
            },
            {
                titulo: "Secado y forma",
                texto:
                    "Sigue las instrucciones de secado del fabricante. " +
                    "Evita aplicar calor directo si no está permitido " +
                    "y procura mantener la forma de la copa y la visera."
            },
            {
                titulo: "Cómo guardarlo",
                texto:
                    "Guarda el jockey limpio y seco, en un lugar donde " +
                    "no quede aplastado por otros objetos. Evita " +
                    "doblar la visera o comprimir la copa."
            }
        ]
    }
];

const contenedorArticulo = document.getElementById("articulo-blog");
const idArticulo = new URLSearchParams(window.location.search).get("id");
const articuloSeleccionado = articulos.find(
    (articulo) => articulo.id === idArticulo
);

if (!articuloSeleccionado) {
    const titulo = document.createElement("h1");
    titulo.textContent = "Artículo no encontrado";

    const mensaje = document.createElement("p");
    mensaje.textContent = "Vuelve al blog para elegir un artículo.";

    contenedorArticulo.append(titulo, mensaje);
} else {
    document.title = `Kings | ${articuloSeleccionado.titulo}`;

    const titulo = document.createElement("h1");
    titulo.textContent = articuloSeleccionado.titulo;

    const imagen = document.createElement("img");
    imagen.src = articuloSeleccionado.imagen;
    imagen.alt = articuloSeleccionado.alt;
    imagen.className = "imagen-blog";

    const introduccion = document.createElement("p");
    introduccion.textContent = articuloSeleccionado.introduccion;

    contenedorArticulo.append(titulo, imagen, introduccion);

    articuloSeleccionado.secciones.forEach((contenido) => {
        const seccion = document.createElement("section");

        const subtitulo = document.createElement("h2");
        subtitulo.textContent = contenido.titulo;

        const parrafo = document.createElement("p");
        parrafo.textContent = contenido.texto;

        seccion.append(subtitulo, parrafo);
        contenedorArticulo.append(seccion);
    });

    const enlace = document.createElement("a");
    enlace.href = "productos.html";
    enlace.className = "boton";
    enlace.textContent = "Explorar jockeys";

    contenedorArticulo.append(enlace);
}