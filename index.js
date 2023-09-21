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
