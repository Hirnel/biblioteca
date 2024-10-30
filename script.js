//       key API      gozT5WEjT27NXpLIzQoXassq8w2nSUU4
//      'https://api.nytimes.com/svc/books/v3/lists/names.json?api-key=gozT5WEjT27NXpLIzQoXassq8w2nSUU4'



// Función para obtener los datos de la API
async function getLibros(url) {
    try {
        // Llamada a la API usando fetch
        console.log("Iniciando la llamada a la API");
        let response = await fetch(url); // Realiza la solicitud a la API
        
        // Verifica si la respuesta es exitosa
        if (!response.ok) throw new Error("Error al obtener los datos");
        
        // Convierte la respuesta a formato JSON
        let datos = await response.json();
        console.log("Datos obtenidos:", datos); // Muestra los datos en la consola para verificar
        return datos; // Devuelve los datos para que otra función los procese
    } catch (error) {
        // Manejo de errores en caso de que la solicitud falle
        console.error("Error:", error);
    }
}

// Función para pintar los datos obtenidos en el DOM
function pintarLibros(datos) {
    // Selecciona el contenedor donde se van a mostrar los datos
    let datosLibros = document.getElementById("datosLibros");
    
    // Limpia el contenido previo antes de pintar nuevos datos
    datosLibros.innerHTML = ""; 

    console.log("Iniciando la función pintarLibros"); // Verifica que la función se llama
    if (datos && datos.results) { // Comprueba que existen datos válidos
        // Itera sobre cada elemento de la lista en los resultados de la API
        datos.results.forEach(item => {
            let listName = item.list_name;  // Título de la lista de libros
            let displayName = item.display_name;  // Nombre que se muestra
            let list_name_encoded = item.list_name_encoded;
            let imageUrl = item.book_image; // URL de la imagen del libro (asegúrate de que esta propiedad exista en la API)
            let amazonLink = item.amazon_product_url; 

            //let imgSRC = (book_image) ? book_image : `../assets/img/imgDefault.jpg`

            let libroDiv = document.createElement("div");

            libroDiv.innerHTML = `
                <strong>Nombre de la lista:</strong> ${listName}<br>
                <strong>Nombre para mostrar:</strong> ${displayName}<br>
                <a href="#" onclick="mostrarLibros('${list_name_encoded}')">${listName}</a>
            `;

        
            // Agrega el div al contenedor principal
            datosLibros.appendChild(libroDiv);
        });
    } else {
        // Mensaje en caso de que no se encuentren datos
        datosLibros.innerHTML = "No se encontraron datos de libros.";
    }
}
//  `https://api.nytimes.com/svc/books/v3/lists/current/${valor}.json?api-key=${api_key}`

async function mostrarLibros(url) {
    try {
        // Llamada a la API usando fetch
        let response = await fetch(url); // Realiza la solicitud a la API
        
        // Verifica si la respuesta es exitosa
        if (!response.ok) throw new Error("Error al obtener los datos");
        
        // Convierte la respuesta a formato JSON
        let datos = await response.json();
        console.log("Datos obtenidos:", datos); // Muestra los datos en la consola para verificar
        return datos; // Devuelve los datos para que otra función los procese
    } catch (error) {
        // Manejo de errores en caso de que la solicitud falle
        console.error("Error:", error);
    }
}

// Evento que se activa al hacer clic en el botón "Cargar Libros"
document.getElementById("fetchData").addEventListener("click", () => {
    console.log("Botón 'Cargar Libros' fue clickeado"); // Mensaje de confirmación en la consola
    
    // Llama a la función getLibros con la URL de la API y clave incluida
    getLibros('https://api.nytimes.com/svc/books/v3/lists/names.json?api-key=gozT5WEjT27NXpLIzQoXassq8w2nSUU4')
        .then(datos => {
            // Si hay datos válidos, llama a pintarLibros para mostrarlos en el DOM
            if (datos) {
                pintarLibros(datos);
            } else {
                console.log("No se obtuvieron datos para pintar.");
            }
        });
});


/*
Tengo que crear list_name_encoded
<img src="${imageUrl}" alt="Carátula del libro ${displayName}" width="100" height="150">

*/