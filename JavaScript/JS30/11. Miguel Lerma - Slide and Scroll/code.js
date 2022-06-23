const imagenes = [...document.querySelectorAll("img")];
const config = {
    root: null,
    threshold: 1,
    rootMargin: "10px 1000px 10px 1000px"
}
const observer = new IntersectionObserver(entries => {
    entries.map(entry=>{
        entry.target.classList.toggle("visible", entry.isIntersecting);
        console.log(entry);
    });
}, config);
imagenes.map((img) => observer.observe(img)) 

