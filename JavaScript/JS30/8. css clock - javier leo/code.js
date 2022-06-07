
let cuentaRegresiva;
const pantallaTiempoRestante = document.querySelector('.pantallaTiempoRestante');
const pantallaTiempoFinal = document.querySelector('.pantallaTiempoFinal');
const botones = document.querySelectorAll('[data-tiempo]');
const formularioPersonalizado = document.querySelector('#formularioPersonalizado');

const temporizador = (segundos)=>{
    clearInterval(cuentaRegresiva);

    const ahora = Date.now();
    const tiempoDespues = ahora + segundos * 1000;
    mostrarTiempoRestante(segundos);
    mostrarTiempoFinalización(tiempoDespues);

    cuentaRegresiva = setInterval(()=>{
        const segundosRestantes = Math.round((tiempoDespues - Date.now())/ 1000);

        if(segundosRestantes < 0){
            clearInterval(cuentaRegresiva);
            return;
        }

        mostrarTiempoRestante(segundosRestantes);


    }, 1000);

}

const mostrarTiempoRestante = (segundos)=>{
    const minutos = Math.floor(segundos/60);
    const segundosRestantes = segundos % 60;
    const pantalla = `${minutos}: ${segundosRestantes < 10 ? '0': ''}${segundosRestantes}`;
    pantallaTiempoRestante.textContent= pantalla;
    document.title= pantalla;

}

const mostrarTiempoFinalización = (marcaTiempo)=>{
    const final = new Date(marcaTiempo);
    const hora = final.getHours();
    const horaAjustada = hora > 12 ? hora -12: hora;
    const minutos = final.getMinutes();
    pantallaTiempoFinal.textContent = `Vuelve a las ${horaAjustada}:${minutos < 10 ? '0' : ''}${minutos}`;
}

function iniciarTemporizador(){
    const segundos = parseInt(this.dataset.tiempo);
    temporizador(segundos);
}






botones.forEach(boton => boton.addEventListener('click', iniciarTemporizador));

formularioPersonalizado.addEventListener('submit', function(e){
    e.preventDefault();
    const mins = parseInt(this.minutos.value);
    console.log(mins);
    temporizador(mins*60);
    this.reset();
});