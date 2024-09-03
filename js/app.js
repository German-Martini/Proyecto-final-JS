//  Class Deportes para mostrar las cards con las imagenes 

class Deporte {
    constructor(nombre, precio, imagen) {
        this.nombre = nombre
        this.precio = precio
        this.imagen = `./imagenes/${nombre}.jpg`
    }
}



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

// Elementos del DOM

let canchas_card = document.querySelector(` #canchas`)
let contenedorReservas = document.querySelector("#contenedorReservas");
let imputBoton = document.querySelector("#boton");


// Fetch para traer el array de deportes 

fetch(`./js/deportes.json`)
    .then((res) => res.json())
    .then((datos) => renderizarDeportes(datos))
    .catch((error) => console.log(error))


// Funcion para mostrar datos en el fech y hacer push de los datos al reservar  

function renderizarDeportes(deportes) {
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
}

// Crear card con el template y guardar en el local storage 

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

// Eliminar las reservas de html 

function eliminarReserva(borrar) {

    misReservas.splice(borrar, 1);

    renderReservas();
}

// Bloquea fechas pasadas en el imput de fecha 

let imputFecha = luxon.DateTime;

let fechaActual = imputFecha.now().toISODate();

document.querySelector(`#fecha`).setAttribute('min', fechaActual);

