class deporte {
    constructor(nombre, precio, imagen) {
        this.nombre = nombre
        this.precio = precio
        this.imagen = `./imagenes/${nombre}.jpg`
    }
}

let deportes = [
    new deporte("padel", 15000),
    new deporte("futbol 5", 20000),
    new deporte("futbol 7", 28000),
]

let canchas_card = document.querySelector(`#canchas`)


class Reserva {
    constructor(fecha, horario, predio, cancha, precio) {
        this.fecha = fecha;
        this.horario = horario;
        this.predio = predio;
        this.cancha = cancha,
        this.precio = precio 
    }
}

let misReservas = []

let contenedorReservas = document.querySelector("#contenedorReservas");


let imputBoton = document.querySelector("#boton");




deportes.forEach((deporte) => {

    let card = document.querySelector(`#deportesTemplate`).content.cloneNode(true)

    card.querySelector("img").src = deporte.imagen

    card.querySelector("h5").textContent = deporte.nombre

    card.querySelector("h6").textContent = `$${deporte.precio} x hora`

    card.querySelector(`.btnReservar`).addEventListener(`click`, () => {


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
            deporte.nombre,
            deporte.precio
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
        copia.querySelector(".reservaPrecio").textContent += reserva.precio 
        


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

                    let reservasGuardadas = JSON.parse(localStorage.getItem('reservasConfirmadas')) || [];

                    reservasGuardadas.push(reserva);

                    localStorage.setItem('reservasConfirmadas', JSON.stringify(reservasGuardadas));
                    

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

let fechaActual = imputFecha.now().toISODate();

document.querySelector(`#fecha`).setAttribute('min', fechaActual);