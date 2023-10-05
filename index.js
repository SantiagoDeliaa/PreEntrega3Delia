// Gestor de Tareas
const tareaInput = document.getElementById("tareaInput");
const listaTareas = document.getElementById("listaTareas");
const filtroPrioridad = document.getElementById("filtroPrioridad");
let tareas = [];

function agregarTarea() {
    const textoTarea = tareaInput.value.trim();
    if (textoTarea !== "") {
        const tarea = {
            texto: textoTarea,
            prioridad: "media",
        };
        tareas.push(tarea);
        actualizarListaTareas();
        tareaInput.value = "";
    }
}

function filtrarTareasPorPrioridad(prioridad) {
    return tareas.filter(tarea => tarea.prioridad === prioridad);
}

function actualizarListaTareas() {
    listaTareas.innerHTML = "";
    const tareasFiltradas = filtroPrioridad.value === "todas" ? tareas : filtrarTareasPorPrioridad(filtroPrioridad.value);
    
    tareasFiltradas.forEach(tarea => {
        const li = document.createElement("li");
        li.textContent = tarea.texto;
        listaTareas.appendChild(li);
    });
}

// Rastreador de Gastos
const montoGasto = document.getElementById("montoGasto");
const categoriaGasto = document.getElementById("categoriaGasto");
const listaGastos = document.getElementById("listaGastos");
const totalGastos = document.getElementById("totalGastos");
const filtroCategoria = document.getElementById("filtroCategoria");
let gastos = [];

function agregarGasto() {
    const cantidad = parseFloat(montoGasto.value);
    const categoria = categoriaGasto.value.trim();
    
    if (!isNaN(cantidad) && categoria !== "") {
        const gasto = {
            cantidad: cantidad,
            categoria: categoria,
        };
        gastos.push(gasto);
        actualizarListaGastos();
        actualizarTotalGastos();
        montoGasto.value = "";
        categoriaGasto.value = "";
    }
}

function filtrarGastosPorCategoria(categoria) {
    return gastos.filter(gasto => gasto.categoria === categoria);
}

function actualizarListaGastos() {
    listaGastos.innerHTML = "";
    const gastosFiltrados = filtroCategoria.value === "todas" ? gastos : filtrarGastosPorCategoria(filtroCategoria.value);
    
    gastosFiltrados.forEach(gasto => {
        const li = document.createElement("li");
        li.textContent = `${gasto.categoria}: $${gasto.cantidad.toFixed(2)}`;
        listaGastos.appendChild(li);
    });
}

function actualizarTotalGastos() {
    const total = gastos.reduce((acumulador, gasto) => acumulador + gasto.cantidad, 0);
    totalGastos.textContent = total.toFixed(2);
}

// Definir eventos y sus funciones de respuesta
listaTareas.addEventListener("click", (event) => {
    if (event.target.tagName === "LI") {
        event.target.classList.toggle("completada");
        actualizarTareasLocalStorage();
    }
});

listaTareas.addEventListener("dblclick", (event) => {
    if (event.target.tagName === "LI") {
        const tareaTexto = event.target.textContent;
        const nuevoTexto = prompt("Editar tarea:", tareaTexto);
        if (nuevoTexto !== null && nuevoTexto.trim() !== "") {
            event.target.textContent = nuevoTexto;
            actualizarTareasLocalStorage();
        }
    }
});

listaTareas.addEventListener("click", (event) => {
    if (event.target.tagName === "BUTTON") {
        event.target.parentElement.remove();
        actualizarTareasLocalStorage();
    }
});

listaGastos.addEventListener("click", (event) => {
    if (event.target.tagName === "BUTTON") {
        event.target.parentElement.remove();
        actualizarGastosLocalStorage();
    }
});

// Modificar el DOM para reflejar las acciones de los usuarios
function actualizarTareasLocalStorage() {
    const tareas = Array.from(listaTareas.children).map((tarea) => {
        return {
            texto: tarea.textContent,
            completada: tarea.classList.contains("completada"),
        };
    });
    localStorage.setItem("tareas", JSON.stringify(tareas));
}

function actualizarGastosLocalStorage() {
    const gastos = Array.from(listaGastos.children).map((gasto) => {
        const partes = gasto.textContent.split(": $");
        return {
            categoria: partes[0],
            cantidad: parseFloat(partes[1]),
        };
    });
    localStorage.setItem("gastos", JSON.stringify(gastos));
}

// Almacenar datos en localStorage y recuperarlos
document.addEventListener("DOMContentLoaded", () => {
    const tareas = JSON.parse(localStorage.getItem("tareas")) || [];
    tareas.forEach((tarea) => {
        const li = document.createElement("li");
        li.textContent = tarea.texto;
        if (tarea.completada) {
            li.classList.add("completada");
        }
        const botonEliminar = document.createElement("button");
        botonEliminar.textContent = "Eliminar";
        li.appendChild(botonEliminar);
        listaTareas.appendChild(li);
    });

    const gastos = JSON.parse(localStorage.getItem("gastos")) || [];
    gastos.forEach((gasto) => {
        const li = document.createElement("li");
        li.textContent = `${gasto.categoria}: $${gasto.cantidad.toFixed(2)}`;
        const botonEliminar = document.createElement("button");
        botonEliminar.textContent = "Eliminar";
        li.appendChild(botonEliminar);
        listaGastos.appendChild(li);
    });
});
