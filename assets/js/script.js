// mangData("https://api.mangadex.org/manga?offset=1&limit=12&includes[]=cover_art&contentRating[]=safe")
// let x = Number(document.getElementById("numPagin").value)
// mangData("https://api.mangadex.org/manga?offset=1&limit=" + x + "&includes[]=cover_art")

// function paginNum() {
//     let x = document.getElementById("numPagin").value
//     mangData("https://api.mangadex.org/manga?offset=1&limit=" + x + "&includes[]=cover_art")
// }

// let n = 1
// function next() {
//     let y = Number(document.getElementById("numPagin").value)
//     // console.log(y)
//     n += y
//     console.log(n)
//     mangData("https://api.mangadex.org/manga?offset=" + n + "&limit=" + y + "&includes[]=cover_art")
// }
// function prev() {
//     let y = Number(document.getElementById("numPagin").value)
//     // console.log(y)
//     n -= y
//     if(n < 1){
//         mangData("https://api.mangadex.org/manga?offset=1&limit="+ y +"&includes[]=cover_art")
//         alert("SUDAH MELEWATI BATAS HALAMAN")
//         n = 1
//     }
//     else{
//         mangData("https://api.mangadex.org/manga?offset=" + n + "&limit="+ y +"&includes[]=cover_art")
//     }
//     console.log(n)
// }

// async function mangData(file) {
//     let mangaData
//     let imgManga
//     let wrapDiv = document.getElementById("body-column")
//     let divCard = ''
//     await fetch(file).then((response) => {
//         return response.json()
//     }).then((data) => { mangaData = data.data })
//     console.log(mangaData)
//     for (let i = 0; i < mangaData.length; i++) {
//         for (let j = 0; j < mangaData[i].relationships.length; j++) {
//             if (mangaData[i].relationships[j].type == "cover_art") {
//                 imgManga = "https://uploads.mangadex.org/covers/" + mangaData[i].id + "/" + mangaData[i].relationships[j].attributes.fileName
//             }
//         }
//         divCard += `
//         <div>
//             <div class="header">
//                 <span>${mangaData[i].attributes.title.en}</span>
//             </div>
//             <div class="image">
//                 <img src="${imgManga}" alt="">
//             </div>
//             <div class="desc">
//                 <textarea readonly>${mangaData[i].attributes.description.en}</textarea>
//             </div>
//         </div>`
//         wrapDiv.innerHTML = divCard
//     }
// }

let x = Number(document.getElementById("numPagin").value)
param1(x)

async function Search() {
    let se = document.getElementById("SearchButton").value
    console.log(se)
    if (se == "") {
        alert("FORM SEARCH MUST BE FILL")
        param1(x)
        // Search()
    }
    else {
        paramSearch(se)
        let close = document.querySelector('.close')
        close.style.display = 'flex'
    }
}

function Close() {
    window.location.reload()
}

function paginNum() {
    let y = document.getElementById("numPagin").value
    let se = document.getElementById("SearchButton").value
    if (se != "") {
        paramSearch(se)
        let close = document.querySelector('.close')
        close.style.display = 'flex'
    }
    else {
        param1(y)
    }
}

let n = 1
function next() {
    let y = Number(document.getElementById("numPagin").value)
    let se = document.getElementById("SearchButton").value
    // console.log(y)
    n += y
    if (se != "") {
        paramSearch(se, n)
        let close = document.querySelector('.close')
        close.style.display = 'flex'
    }
    else {
        console.log(n)
        param2(n, y)
    }
}
function prev() {
    let y = Number(document.getElementById("numPagin").value)
    let se = document.getElementById("SearchButton").value
    // console.log(y)
    n -= y
    if (n < 1) {
        alert("SUDAH MELEWATI BATAS HALAMAN")
        n = 1
        param2(n, y)
    }
    else {
        param2(n, y)
    }

    if (se != "") {
        paramSearch(se, n)
        let close = document.querySelector('.close')
        close.style.display = 'flex'
    }
    else {
        console.log(n)
        param2(n, y)
    }
    console.log(n)
}

function param1(file) {
    mangData(`https://api.mangadex.org/manga?offset=1&limit=${file}&includes[]=cover_art`)
}

function param2(x, y) {
    mangData(`https://api.mangadex.org/manga?offset=${x}&limit=${y}&includes[]=cover_art`)
}

async function paramSearch(n, offset = 1) {
    let y = Number(document.getElementById("numPagin").value)
    let url = `https://api.mangadex.org/manga?offset=${offset}&limit=${y}&includes[]=cover_art&title=${n}`
    let titleData
    await fetch(url).then((response) => {
        return response.json()
    }).then((data) => { titleData = data })
    console.log(titleData)
    if (titleData.total <= 0) {
        alert("Pencarian Tidak Ditemukan")
        let close = document.querySelector('.close')
        let main = document.querySelector('.containerr')
        let mainNot = document.getElementById("main")
        let notFound = document.querySelector('.notFound')
        let search = document.querySelector('.search')
        mainNot.style.height = "100vh"
        close.style.display = 'flex'
        main.style.display = "none"
        notFound.style.display = "flex"
        search.addEventListener('click', (e)=>{
            e.preventDefault()
            mainNot.style.height = "auto"
            close.style.display = 'flex'
            main.style.display = "block"
            notFound.style.display = "none"
            mangData(url)

        });
    } else {
        mangData(url)
    }
}

async function mangData(file) {
    let mangaData
    let imgManga
    let wrapDiv = document.getElementById("body-column")
    let divCard = ''
    let title
    let desc
    await fetch(file).then((response) => {
        return response.json()
    }).then((data) => { mangaData = data.data })
    console.log(mangaData)
    for (let i = 0; i < mangaData.length; i++) {
        for (let j = 0; j < mangaData[i].relationships.length; j++) {
            if (mangaData[i].relationships[j].type == "cover_art") {
                imgManga = "https://uploads.mangadex.org/covers/" + mangaData[i].id + "/" + mangaData[i].relationships[j].attributes.fileName
            }
        }
        if (mangaData[i].attributes.title.en == null) {
            title = "NO TITLE"
        }
        else {
            title = mangaData[i].attributes.title.en
        }

        if (mangaData[i].attributes.description.en == null) {
            desc = "NO DESCRIPTION"
        }
        else {
            desc = mangaData[i].attributes.description.en
        }
        divCard += `
        <div>
            <div class="header">
                <span>${title}</span>
            </div>
            <div class="image">
                <img src="${imgManga}" alt="">
            </div>
            <div class="desc">
                <textarea readonly>${desc}</textarea>
            </div>
        </div>`
        wrapDiv.innerHTML = divCard
    }
}