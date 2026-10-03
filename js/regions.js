const REGIONES_COMUNAS = [
    {
        region: "Arica y Parinacota",
        comunas: [
            "Arica",
            "Camarones",
            "General Lagos",
            "Putre"
        ]
    },
    {
        region: "Tarapacá",
        comunas: [
            "Alto Hospicio",
            "Camiña",
            "Colchane",
            "Huara",
            "Iquique",
            "Pica",
            "Pozo Almonte"
        ]
    },
    {
        region: "Antofagasta",
        comunas: [
            "Antofagasta",
            "Calama",
            "María Elena",
            "Mejillones",
            "Ollagüe",
            "San Pedro de Atacama",
            "Sierra Gorda",
            "Taltal",
            "Tocopilla"
        ]
    },
    {
        region: "Atacama",
        comunas: [
            "Alto del Carmen",
            "Caldera",
            "Chañaral",
            "Copiapó",
            "Diego de Almagro",
            "Freirina",
            "Huasco",
            "Tierra Amarilla",
            "Vallenar"
        ]
    },
    {
        region: "Coquimbo",
        comunas: [
            "Andacollo",
            "Canela",
            "Combarbalá",
            "Coquimbo",
            "Illapel",
            "La Higuera",
            "La Serena",
            "Los Vilos",
            "Monte Patria",
            "Ovalle",
            "Paihuano",
            "Punitaqui",
            "Río Hurtado",
            "Salamanca",
            "Vicuña"
        ]
    },
    {
        region: "Valparaíso",
        comunas: [
            "Algarrobo",
            "Cabildo",
            "Calera",
            "Calle Larga",
            "Cartagena",
            "Casablanca",
            "Catemu",
            "Concón",
            "El Quisco",
            "El Tabo",
            "Hijuelas",
            "La Cruz",
            "La Ligua",
            "Limache",
            "Llaillay",
            "Los Andes",
            "Nogales",
            "Olmué",
            "Panquehue",
            "Papudo",
            "Petorca",
            "Puchuncaví",
            "Putaendo",
            "Quillota",
            "Quilpué",
            "Quintero",
            "Rinconada",
            "San Antonio",
            "San Esteban",
            "San Felipe",
            "Santa María",
            "Santo Domingo",
            "Valparaíso",
            "Villa Alemana",
            "Viña del Mar",
            "Zapallar"
        ]
    },
    {
        region: "Metropolitana de Santiago",
        comunas: [
            "Alhué",
            "Buin",
            "Calera de Tango",
            "Cerrillos",
            "Cerro Navia",
            "Colina",
            "Conchalí",
            "Curacaví",
            "El Bosque",
            "El Monte",
            "Estación Central",
            "Huechuraba",
            "Independencia",
            "Isla de Maipo",
            "La Cisterna",
            "La Florida",
            "La Granja",
            "La Pintana",
            "La Reina",
            "Lampa",
            "Las Condes",
            "Lo Barnechea",
            "Lo Espejo",
            "Lo Prado",
            "Macul",
            "Maipú",
            "María Pinto",
            "Melipilla",
            "Ñuñoa",
            "Padre Hurtado",
            "Paine",
            "Pedro Aguirre Cerda",
            "Peñaflor",
            "Peñalolén",
            "Pirque",
            "Providencia",
            "Pudahuel",
            "Puente Alto",
            "Quilicura",
            "Quinta Normal",
            "Recoleta",
            "Renca",
            "San Bernardo",
            "San Joaquín",
            "San José de Maipo",
            "San Miguel",
            "San Pedro",
            "San Ramón",
            "Santiago",
            "Talagante",
            "Tiltil",
            "Vitacura"
        ]
    },
    {
        region: "O'Higgins",
        comunas: [
            "Chimbarongo",
            "Codegua",
            "Coinco",
            "Coltauco",
            "Doñihue",
            "Graneros",
            "Las Cabras",
            "Machalí",
            "Malloa",
            "Mostazal",
            "Nancagua",
            "Navidad",
            "Olivar",
            "Palmilla",
            "Pichidegua",
            "Pichilemu",
            "Placilla",
            "Rancagua",
            "Rengo",
            "Requínoa",
            "San Fernando",
            "San Vicente"
        ]
    },
    {
        region: "Maule",
        comunas: [
            "Cauquenes",
            "Constitución",
            "Curicó",
            "Linares",
            "Longaví",
            "Maule",
            "Molina",
            "Parral",
            "Pelarco",
            "Pelluhue",
            "Rauco",
            "Retiro",
            "Río Claro",
            "Romeral",
            "San Clemente",
            "San Javier",
            "Talca",
            "Teno",
            "Villa Alegre",
            "Yerbas Buenas"
        ]
    },
    {
        region: "Ñuble",
        comunas: [
            "Bulnes",
            "Chillán",
            "Chillán Viejo",
            "Coelemu",
            "Coihueco",
            "El Carmen",
            "Pemuco",
            "Pinto",
            "Quillón",
            "Quirihue",
            "San Carlos",
            "San Ignacio",
            "Yungay"
        ]
    },
    {
        region: "Biobío",
        comunas: [
            "Arauco",
            "Cabrero",
            "Cañete",
            "Chiguayante",
            "Concepción",
            "Coronel",
            "Curanilahue",
            "Hualpén",
            "Hualqui",
            "Lebu",
            "Lota",
            "Los Ángeles",
            "Mulchén",
            "Nacimiento",
            "Penco",
            "San Pedro de la Paz",
            "Santa Bárbara",
            "Talcahuano",
            "Tomé",
            "Yumbel"
        ]
    },
    {
        region: "La Araucanía",
        comunas: [
            "Angol",
            "Carahue",
            "Collipulli",
            "Cunco",
            "Curacautín",
            "Freire",
            "Gorbea",
            "Lautaro",
            "Loncoche",
            "Nueva Imperial",
            "Padre Las Casas",
            "Pitrufquén",
            "Pucón",
            "Temuco",
            "Traiguén",
            "Victoria",
            "Vilcún",
            "Villarrica"
        ]
    },
    {
        region: "Los Ríos",
        comunas: [
            "Corral",
            "Futrono",
            "La Unión",
            "Lago Ranco",
            "Lanco",
            "Los Lagos",
            "Máfil",
            "Mariquina",
            "Paillaco",
            "Panguipulli",
            "Río Bueno",
            "Valdivia"
        ]
    },
    {
        region: "Los Lagos",
        comunas: [
            "Ancud",
            "Calbuco",
            "Castro",
            "Chaitén",
            "Chonchi",
            "Cochamó",
            "Dalcahue",
            "Frutillar",
            "Futaleufú",
            "Llanquihue",
            "Los Muermos",
            "Osorno",
            "Puerto Montt",
            "Puerto Octay",
            "Puerto Varas",
            "Purranque",
            "Puyehue",
            "Quellón",
            "Quinchao",
            "Río Negro"
        ]
    },
    {
        region: "Aysén",
        comunas: [
            "Aysén",
            "Chile Chico",
            "Cisnes",
            "Cochrane",
            "Coyhaique",
            "Guaitecas",
            "Lago Verde",
            "O'Higgins",
            "Río Ibáñez",
            "Tortel"
        ]
    },
    {
        region: "Magallanes y de la Antártica Chilena",
        comunas: [
            "Cabo de Hornos",
            "Laguna Blanca",
            "Natales",
            "Porvenir",
            "Primavera",
            "Punta Arenas",
            "Río Verde",
            "San Gregorio",
            "Timaukel",
            "Torres del Paine"
        ]
    }
];

const selectorRegion = document.getElementById("region");
const selectorComuna = document.getElementById("comuna");

function cargarRegiones() {
    if (!selectorRegion) {
        return;
    }

    REGIONES_COMUNAS.forEach((item) => {
        const opcion = document.createElement("option");

        opcion.value = item.region;
        opcion.textContent = item.region;

        selectorRegion.appendChild(opcion);
    });
}

function reiniciarComunas() {
    if (!selectorComuna) {
        return;
    }

    selectorComuna.innerHTML = `
        <option value="">
            Primero selecciona una región
        </option>
    `;

    selectorComuna.disabled = true;
}

function cargarComunas(nombreRegion) {
    if (!selectorComuna) {
        return;
    }

    selectorComuna.innerHTML = "";

    const opcionInicial = document.createElement("option");

    opcionInicial.value = "";
    opcionInicial.textContent = "Selecciona una comuna";

    selectorComuna.appendChild(opcionInicial);

    const regionSeleccionada = REGIONES_COMUNAS.find(
        (item) => item.region === nombreRegion
    );

    if (!regionSeleccionada) {
        reiniciarComunas();
        return;
    }

    regionSeleccionada.comunas.forEach((comuna) => {
        const opcion = document.createElement("option");

        opcion.value = comuna;
        opcion.textContent = comuna;

        selectorComuna.appendChild(opcion);
    });

    selectorComuna.disabled = false;
}

if (selectorRegion && selectorComuna) {
    cargarRegiones();

    selectorRegion.addEventListener("change", () => {
        cargarComunas(selectorRegion.value);
    });
}