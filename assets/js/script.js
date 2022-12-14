let x = Number(document.getElementById("numPagin").value);
param1(x);

async function Search() {
  let se = document.getElementById("SearchButton").value;
  console.log(se);
  if (se == "") {
    alert("FORM SEARCH MUST BE FILL");
    param1(x);
    // Search()
  } else {
    paramSearch(se);
    let close = document.querySelector(".close");
    close.style.display = "flex";
  }
}

function Close() {
  window.location.reload();
}

function paginNum() {
  let y = document.getElementById("numPagin").value;
  let se = document.getElementById("SearchButton").value;
  if (se != "") {
    paramSearch(se);
    let close = document.querySelector(".close");
    close.style.display = "flex";
  } else {
    param1(y);
  }
}

let n = 1;
let i = 1;
function next() {
  let y = Number(document.getElementById("numPagin").value);
  let se = document.getElementById("SearchButton").value;
  // console.log(y)
  n += y;
  i += 1;
  if (se != "") {
    paramSearch(se, n);
    let close = document.querySelector(".close");
    close.style.display = "flex";
    document.getElementById("page").innerHTML = i;
    console.log(i);
  } else {
    console.log(n);
    param2(n, y);
    document.getElementById("page").innerHTML = i;
  }
}
function prev() {
  let y = Number(document.getElementById("numPagin").value);
  let se = document.getElementById("SearchButton").value;
  // console.log(y)
  n -= y;
  i -= 1;
  if (n < 1 && i < 1) {
    alert("SUDAH MELEWATI BATAS HALAMAN");
    n = 1;
    i = 1;
    param2(n, y);
  } else {
    document.getElementById("page").innerHTML = i;
    param2(n, y);
  }

  if (se != "") {
    paramSearch(se, n);
    let close = document.querySelector(".close");
    close.style.display = "flex";
  } else {
    console.log(n);
    param2(n, y);
  }
  console.log(n);
}

function param1(file) {
  mangData(
    `https://api.mangadex.org/manga?offset=1&limit=${file}&includes[]=cover_art`
  );
}

function param2(x, y) {
  mangData(
    `https://api.mangadex.org/manga?offset=${x}&limit=${y}&includes[]=cover_art`
  );
}

async function paramSearch(n, offset = 1) {
  let y = Number(document.getElementById("numPagin").value);
  let url = `https://api.mangadex.org/manga?offset=${offset}&limit=${y}&includes[]=cover_art&title=${n}`;
  let titleData;
  await fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      titleData = data;
    });
  console.log(titleData);
  if (titleData.total <= 1) {
    alert("Pencarian Tidak Ditemukan");
    let close = document.querySelector(".close");
    let main = document.querySelector(".containerr");
    let mainNot = document.getElementById("main");
    let notFound = document.querySelector(".notFound");
    let search = document.querySelector(".search");
    let page = document.querySelector(".header-page");
    page.style.display = "none";
    mainNot.style.height = "100vh";
    close.style.display = "flex";
    main.style.display = "none";
    notFound.style.display = "flex";
    search.addEventListener("click", (e) => {
      e.preventDefault();
      mainNot.style.height = "auto";
      close.style.display = "flex";
      main.style.display = "block";
      notFound.style.display = "none";
      mangData(url);
    });
  } else {
    mangData(url);
  }
  if (titleData.data.length == 0) {
    alert("DATA PENCARIAN SUDAH TIDAK ADA!!");
    i = i;
    document.getElementById("page").innerHTML = i;
  }
}

async function mangData(file) {
  let mangaData;
  let imgManga;
  let wrapDiv = document.getElementById("body-column");
  let divCard = "";
  let title;
  let desc;
  await fetch(file)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      mangaData = data.data;
    });
  console.log(mangaData);
  for (let i = 0; i < mangaData.length; i++) {
    for (let j = 0; j < mangaData[i].relationships.length; j++) {
      if (mangaData[i].relationships[j].type == "cover_art") {
        imgManga =
          "https://uploads.mangadex.org/covers/" +
          mangaData[i].id +
          "/" +
          mangaData[i].relationships[j].attributes.fileName;
      }
    }
    if (mangaData[i].attributes.title.en == null) {
      title = "NO TITLE";
    } else {
      title = mangaData[i].attributes.title.en;
    }

    if (
      mangaData[i].attributes.description.en == null ||
      mangaData[i].attributes.description.en == ""
    ) {
      desc = "NO DESCRIPTION";
    } else {
      desc = mangaData[i].attributes.description.en;
    }
    divCard += `
        <div>
            <div class="header">
                <h3>${title}</h3>
            </div>
            <div class="image">
                <img src="${imgManga}" alt="">
            </div>
            <div class="desc">
                <textarea readonly>${desc}</textarea>
            </div>
        </div>`;
    wrapDiv.innerHTML = divCard;
  }
}
