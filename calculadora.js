const pantalla = document.getElementById("pantalla");
const botones = document.querySelectorAll(".boton");

let expresion = "";

function ajustarFuente() {
    const maxAncho = pantalla.clientWidth - 28;
    const tamanoBase = window.innerWidth <= 540 ? 36 : 48;
    let tamano = tamanoBase;
    pantalla.style.fontSize = tamano + "px";
    while (pantalla.scrollWidth > maxAncho && tamano > 14) {
        tamano--;
        pantalla.style.fontSize = tamano + "px";
    }
}

botones.forEach(boton => {
    boton.addEventListener("click", () => {
        const valor = boton.querySelector("p").textContent;

        if (valor === "AC") {
            expresion = "";
            pantalla.textContent = "0";
            ajustarFuente();
            return;
        }

        if (valor === "=") {
            try {
                const expresionJS = expresion
                    .replace(/÷/g, "/")
                    .replace(/x/g, "*");
                const resultado = Function('"use strict"; return (' + expresionJS + ')')();
                pantalla.textContent = resultado;
                expresion = String(resultado);
            } catch {
                pantalla.textContent = "Error";
                expresion = "";
            }
            ajustarFuente();
            return;
        }

        expresion += valor;
        pantalla.textContent = expresion;
        ajustarFuente();
    });
});
