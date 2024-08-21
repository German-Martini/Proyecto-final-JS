class deporte {
    constructor (nombre, imagen) {
        this.nombre = nombre 
        this.imagen = `./imagenes/${nombre}.jpg`
    }
}

let deportes = [
    new deporte ("padel"),
    new deporte ("futbol 5"),
    new deporte ("futbol 7"),
]

let canchas_card = document.querySelector(`#canchas`)


class Reserva {
    constructor(fecha, horario, predio) {
        this.fecha = fecha;
        this.horario = horario;
        this.predio = predio;
    }
}

let misReservas = []





let contenedorReservas = document.querySelector("#contenedorReservas");

let imputBoton = document.querySelector("#boton");

deportes.forEach ((deporte)=> {

    let card = document.querySelector(`#deportesTemplate`).content.cloneNode(true)   

    card.querySelector("img").src = deporte.imagen

    card.querySelector("h5").textContent = deporte.nombre

    card.querySelector(`.btnReservar`).addEventListener(`click`,()=> {
        
        
    let inputFecha = document.querySelector("#fecha").value;
    let inputHorario = document.querySelector("#horario").value;
    let inputPredio = document.querySelector("#predio").value;
    


    misReservas.push(new Reserva(
        inputNombre,    
        inputEmail,
        inputFecha,
        inputHorario,
        inputPredio,
        inputDeporte
    ));

    contenedorReservas.innerHTML = "";
    
    
    
    misReservas.forEach((reserva) => {
        
        let copia = document.querySelector("#reservaTemplate").content.cloneNode(true);
        
        copia.querySelector(".reservaNombre").textContent += reserva.nombre
        copia.querySelector(".reservaEmail").textContent += reserva.email
        copia.querySelector(".reservaFecha").textContent += reserva.fecha
        copia.querySelector(".reservaHorario").textContent += reserva.horario
        copia.querySelector(".reservaPredio").textContent += reserva.predio
        copia.querySelector(".reservaDeporte").textContent += reserva.deporte
        
        
        let btnEliminar = copia.querySelector(".eliminar");
        let btnConfirmar = copia.querySelector(".confirmar");
        let seccion = copia.querySelector("#reserva");
        
            contenedorReservas.append(copia);

            btnConfirmar.addEventListener(`click`, () => {
                localStorage.setItem('reservas', JSON.stringify(misReservas));
                seccion.classList.remove('plantilla');
                seccion.innerHTML = '';
            });
            
            
            btnEliminar.addEventListener('click', () => {
                seccion.classList.remove('plantilla');
                seccion.innerHTML = '';
                localStorage.removeItem('reservas')  
            });
            
            
        })
    })

    canchas_card.append(card)
})

// imputBoton.addEventListener('click', (evento) => {

//     evento.preventDefault();

//     let inputFecha = document.querySelector("#fecha").value;
//     let inputHorario = document.querySelector("#horario").value;
//     let inputPredio = document.querySelector("#predio").value;
    


//     misReservas.push(new Reserva(
//         inputNombre,    
//         inputEmail,
//         inputFecha,
//         inputHorario,
//         inputPredio,
//         inputDeporte
//     ));

//     contenedorReservas.innerHTML = "";
    
    
    
//     misReservas.forEach((reserva) => {
        
//         let copia = document.querySelector("#reservaTemplate").content.cloneNode(true);
        
//         copia.querySelector(".reservaNombre").textContent += reserva.nombre
//         copia.querySelector(".reservaEmail").textContent += reserva.email
//         copia.querySelector(".reservaFecha").textContent += reserva.fecha
//         copia.querySelector(".reservaHorario").textContent += reserva.horario
//         copia.querySelector(".reservaPredio").textContent += reserva.predio
//         copia.querySelector(".reservaDeporte").textContent += reserva.deporte
        
        
//         let btnEliminar = copia.querySelector(".eliminar");
//         let btnConfirmar = copia.querySelector(".confirmar");
//         let seccion = copia.querySelector("#reserva");
        
//             contenedorReservas.append(copia);

//             btnConfirmar.addEventListener(`click`, () => {
//                 localStorage.setItem('reservas', JSON.stringify(misReservas));
//                 seccion.classList.remove('plantilla');
//                 seccion.innerHTML = '';
//             });
            
            
//             btnEliminar.addEventListener('click', () => {
//                 seccion.classList.remove('plantilla');
//                 seccion.innerHTML = '';
//                 localStorage.removeItem('reservas')  
//             });
            
            
//         })
        
//     });


