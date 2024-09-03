//Mostrar las reservas guardadas en el local storage 

let reservasHechas = JSON.parse(localStorage.getItem('reservasConfirmadas')) || []

let reservasContainer = document.querySelector(".misReservas")

reservasHechas.forEach(reserva => {

    let copia = document.querySelector("#reservaTemplate").content.cloneNode(true);

    copia.querySelector(".reservaFecha").textContent += reserva.fecha
    copia.querySelector(".reservaHorario").textContent += reserva.horario
    copia.querySelector(".reservaPredio").textContent += reserva.predio
    copia.querySelector(".reservaDeporte").textContent += reserva.cancha
    copia.querySelector(".reservaPrecio").textContent += reserva.precio



    reservasContainer.append(copia);
})

