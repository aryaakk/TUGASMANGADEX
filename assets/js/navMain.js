const menuTog = document.querySelector(".hamburg input")
const navSearch = document.querySelector("nav .wrapper")

menuTog.addEventListener('click', function(){
    navSearch.classList.toggle('slide')
})