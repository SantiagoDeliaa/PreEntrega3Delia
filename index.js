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
        actualizarTareasLocalStorage();
    }
}

function filtrarTareasPorPrioridad(prioridad) {
    return tareas.filter(tarea => tarea.prioridad === prioridad);
}

function actualizarListaTareas() {
    taskList.innerHTML = "";
    const tareasFiltradas = filtroPrioridad.value === "todas" ? tareas : filtrarTareasPorPrioridad(filtroPrioridad.value);
    
    tareasFiltradas.forEach(tarea => {
        const li = document.createElement("li");
        li.textContent = tarea.texto;
        taskList.appendChild(li);
    });
}

function filtrarTareasPorPrioridad(prioridad) {
    return tareas.filter(tarea => tarea.prioridad === prioridad);
}

function actualizarListaTareas() {
    listaTareas.innerHTML = "";
    const tareasFiltradas = filtroPrioridad.value === "todas" ? tareas : filtrarTareasPorPrioridad(filtroPrioridad.value);

    tareasFiltradas.forEach((tarea, index) => {
        const li = document.createElement("li");
        const tareaTexto = document.createElement("input");
        tareaTexto.type = "text";
        tareaTexto.value = tarea.texto;
        li.appendChild(tareaTexto);
        listaTareas.appendChild(li);

        tareaTexto.addEventListener("blur", () => {
            tarea.texto = tareaTexto.value;
            actualizarTareasLocalStorage();
        });

        tareaTexto.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
                tareaTexto.blur();
            }
        });

        tareaTexto.addEventListener("click", (event) => {
            event.stopPropagation();
        });

        const botonEliminar = document.createElement("button");
        botonEliminar.textContent = "Eliminar";
        li.appendChild(botonEliminar);

        botonEliminar.addEventListener("click", () => {
            tareas.splice(index, 1);
            actualizarListaTareas();
            actualizarTareasLocalStorage();
        });
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
    const categoria = categoriaGasto.value.trim().toLowerCase(); 

    if (!isNaN(cantidad) && categoria !== "") {
        const gasto = {
            cantidad: cantidad,
            categoria: categoria,
        };
        gastos.push(gasto);
        actualizarListaGastos();
        montoGasto.value = "";
        categoriaGasto.value = "";
        actualizarTotalGastos();
        actualizarGastosLocalStorage();
    }
}

function filtrarGastosPorCategoria(categoria) {
    return gastos.filter(gasto => gasto.categoria.toLowerCase() === categoria.toLowerCase()); 
}

function filtrarGastosPorCategoria(categoria) {
    return gasto.filter(gastos => gastos.categoria === categoria);
}

function actualizarListaGastos() {
    listaGastos.innerHTML = "";
    const gastosFiltrados = filtroCategoria.value === "todas" ? gastos : filtrarGastosPorCategoria(filtroCategoria.value);
    
    gastosFiltrados.forEach(gasto => {
        const li = document.createElement("li");
        li.textContent = `${gasto.categoria}: $${gasto.cantidad.toFixed(2)}`;
        listaGastos.appendChild(li);
        const botonEliminar = document.createElement("button");
        botonEliminar.textContent = "Eliminar";
        li.appendChild(botonEliminar);
        botonEliminar.addEventListener("click", () => {
            gastos = gastos.filter(item => item !== gasto);
            actualizarListaGastos();
            actualizarTotalGastos();
            actualizarGastosLocalStorage();
        });
    });
    actualizarTotalGastos();
}

function actualizarTotalGastos() {
    const total = gastos.reduce((acumulador, gasto) => acumulador + gasto.cantidad, 0);
    totalGastos.textContent = total.toFixed(2);
}

// Definicion de eventos
document.addEventListener("DOMContentLoaded", () => {
    listaTareas.innerHTML = "";
    listaGastos.innerHTML = "";

    const tareas = JSON.parse(localStorage.getItem("tareas")) || [];
    tareas.forEach((tarea) => {
        const li = document.createElement("li");
        const tareaTexto = document.createElement("input");
        tareaTexto.type = "text";
        tareaTexto.value = tarea.texto;
        li.appendChild(tareaTexto);
        listaTareas.appendChild(li);
    
        if (tarea.completada) {
            li.classList.add("completada");
        }

        const botonEliminarTarea = document.createElement("button");
        botonEliminarTarea.textContent = "Eliminar";
        botonEliminarTarea.addEventListener("click", () => {
            li.remove();
            actualizarTareasLocalStorage();
        });

        li.addEventListener("dblclick", () => {
            li.contentEditable = true;
            li.focus();
        });

        li.addEventListener("focusout", () => {
            li.contentEditable = false;
            tarea.texto = li.textContent;
            actualizarTareasLocalStorage();
        });

        li.appendChild(botonEliminarTarea);
        listaTareas.appendChild(li);
    });

    const gastos = JSON.parse(localStorage.getItem("gastos")) || [];
    gastos.forEach((gasto) => {
        const li = document.createElement("li");
        li.textContent = `${gasto.categoria}: $${gasto.cantidad.toFixed(2)}`;

        const botonEliminarGasto = document.createElement("button");
        botonEliminarGasto.textContent = "Eliminar";
        botonEliminarGasto.addEventListener("click", () => {
            li.remove();
            actualizarGastosLocalStorage();
        });

        li.appendChild(botonEliminarGasto);
        listaGastos.appendChild(li);
    });
});

function actualizarTareasLocalStorage() {
    const tareas = Array.from(listaTareas.children).map((tarea) => {
        const tareaTexto = tarea.querySelector('input[type="text"]');
        return {
            texto: tareaTexto.value,
            prioridad: tareaTexto.dataset.prioridad,
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

