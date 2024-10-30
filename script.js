//       key API      gozT5WEjT27NXpLIzQoXassq8w2nSUU4
//      'https://api.nytimes.com/svc/books/v3/lists/names.json?api-key=${apiKey}'
//       ${apiKey}

const apiKey = "gozT5WEjT27NXpLIzQoXassq8w2nSUU4";

//https://api.nytimes.com/svc/books/v3/lists/full-overview.json?api-key=gozT5WEjT27NXpLIzQoXassq8w2nSUU4
//https://api.nytimes.com/svc/books/v3/lists/names.json?api-key=gozT5WEjT27NXpLIzQoXassq8w2nSUU4

// async function obtainData() {
//     let response = await fetch(`https://api.nytimes.com/svc/books/v3/lists/names.json?api-key=${apiKey}`);
//     let data = await response.json();

//     return data.results;
// }

// Esto es solo para trabajar con la API en local
async function obtainData() {
    return libros;
}
 


obtainData()
// Función para cargar todas las listas en el DOM
async function createCardsDom() {
    let datos = await obtainData();
    let section = document.body.querySelector("#listsContainer")
    let header = document.body.querySelector("#buttonBackContainer")

    datos.forEach(list => {

        section.innerHTML += `
        <article>
        <div class='tarjetalista'>
        <h3>${list.list_name}</h3>
        <p>Oldest: ${list.oldest_published_date}</p>
        <p>Newest: ${list.newest_published_date}</p>
        <p>Updated: ${list.updated.toLowerCase()}</p>
        <button class ='cargarLista' id="${list.list_name}">
        <span> READ MORE </span>
        </div>
        
        </button>
        </article>`
            ;

    })
    document.querySelectorAll(".cargarLista").forEach(button => {
        button.addEventListener("click", async function () {
            let id = this.getAttribute("id");
            let datosLista = await fetch(`https://api.nytimes.com/svc/books/v3/lists/${id}.json?api-key=${apiKey}`)
            let data = await datosLista.json();

            section.innerHTML = ""//para limpiar el dom
            header.innerHTML = `
                <button class ='backButton' onclick="window.location.reload()">Back to lists</button>
                `

            //mismo procedimiento anterior:
            data.results.books.forEach(book => {

                section.innerHTML += `
                
                <div class='tarjetalibro'>
                <h4>#${book.rank} ${book.title}</h4>
                <div class="caratula">
                <img src=${book.book_image}></img>
                </div>
                <p>Weeks on the list: ${book.weeks_on_list}</p>
                <p>Description: ${book.description}</p>
                
                <button class ='comprarAmazon' onclick=window.open("${book.amazon_product_url}")>
                BUY NOW
                
                </button>
                `
            })
        })
    })
}
createCardsDom();

async function generarInfoLista() {
    let datos = await fetch();


}

// async function obtainData() {
//     let response = await fetch(`https://api.nytimes.com/svc/books/v3/lists/names.json?api-key=${apiKey}`);
//     let data = await response.json();
//     let resultados = data.results;
//     let name;
//     let dateOld;
//     let dateLast;
//     let dateUpdate;
//     let link;
//     resultados.forEach((resultado) => {
//         name = resultado.list_name;
//         dateOld = resultado.oldest_published_date;
//         dateLast = resultado.newest_published_date;



//     });




// }

// const spinner = async () => {
//     return new Promise((resolve, reject) => {
//     setTimeout(() => {
//         resolve;
//     });
//   });   
// }

obtainData();

async function createCards() {




}