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
    constructor(fecha, horario, predio, cancha) {
        this.fecha = fecha;
        this.horario = horario;
        this.predio = predio;
        this.cancha = cancha
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

    let comprobarReserva = misReservas.some(reserva => 
        reserva.fecha === inputFecha && 
        reserva.horario === inputHorario && 
        reserva.predio === inputPredio && 
        reserva.cancha === deporte.nombre
    );

    if (inputFecha == "") {
        Swal.fire("No ingresaste una fecha");
        return;
    } else if (comprobarReserva) {
        Swal.fire("Los datos ingresados son los mismos");
        return;
    }

    misReservas.push(new Reserva(
        inputFecha,
        inputHorario,
        inputPredio,
        deporte.nombre
    ));

    renderReservas();
    
});

canchas_card.append(card)
});


function renderReservas() {

    contenedorReservas.innerHTML = "";
    
    
    
    misReservas.forEach((reserva, borrar) => {
        
        let copia = document.querySelector("#reservaTemplate").content.cloneNode(true);
        
        copia.querySelector(".reservaFecha").textContent += reserva.fecha
        copia.querySelector(".reservaHorario").textContent += reserva.horario
        copia.querySelector(".reservaPredio").textContent += reserva.predio
        copia.querySelector(".reservaDeporte").textContent += reserva.cancha
        
        
        let btnEliminar = copia.querySelector(".eliminar");
        let btnConfirmar = copia.querySelector(".confirmar");
        let seccion = copia.querySelector("#reserva");
        
            contenedorReservas.append(copia);

            btnConfirmar.addEventListener(`click`, () => {
                Swal.fire({
                    title: "Querés confirmar la reservación?",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Si, quiero confirmar!"
                  }).then((result) => {
                    if (result.isConfirmed) {
                      Swal.fire({
                        title: "Listo, ya reservaste",
                        text: "Te aparecera en `Mis reservaciones`",
                        icon: "success"
                      });
                      localStorage.setItem('reservas', JSON.stringify(misReservas));
                      eliminarReserva(borrar);  
                    }
                  });
            });
            
            
            btnEliminar.addEventListener('click', () => {
                eliminarReserva(borrar);
            });
            
            
        })
    }


function eliminarReserva(borrar) {
   
    misReservas.splice(borrar, 1);
    
    renderReservas();
}

let imputFecha = luxon.DateTime;

let fechaActual =  imputFecha.now().toISODate();

document.querySelector(`#fecha`).setAttribute('min', fechaActual);