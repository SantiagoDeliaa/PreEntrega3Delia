//--------Tareas-----------
const tareaInput = document.getElementById("tareaInput");
const taskList = document.getElementById("tareaList");
const filtroPrioridad = document.getElementById("filtroPrioridad");
let tareas = [];

function añadirTarea() {
    const tareaText = tareaInput.value.trim();
    if (tareaText !== "") {
        const tarea = {
            texto: tareaText,
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
    taskList.innerHTML = "";
    const tareasFiltradas = filtroPrioridad.value === "todas" ? tareas : filtrarTareasPorPrioridad(filtroPrioridad.value);
    
    tareasFiltradas.forEach(tarea => {
        const li = document.createElement("li");
        li.textContent = tarea.texto;
        taskList.appendChild(li);
    });
}

//---------Gastos----------
const gastoInput = document.getElementById("gastoInput");
const categoriaInput = document.getElementById("categoriaInput");
const gastoList = document.getElementById("gastoList");
const gastoTotal = document.getElementById("gastoTotal");
const filtroCategoria = document.getElementById("filtroCategoria");
let gasto = [];

function añadirGasto() {
    const cantidad = parseFloat(gastoInput.value);
    const categoria = categoriaInput.value.trim();
    
    if (!isNaN(cantidad) && categoria !== "") {
        const gastos = {
            cantidad: cantidad,
            categoria: categoria,
        };
        
        gasto.push(gastos);
        actualizarGastoList();
        actualizarTotalGastos();
        gastoInput.value = "";
        categoriaInput.value = "";
    }
}

function filtrarGastosPorCategoria(categoria) {
    return gasto.filter(gastos => gastos.categoria === categoria);
}

function actualizarGastoList() {
    gastoList.innerHTML = "";
    const gastosFiltrados = filtroCategoria.value === "todas" ? gastos : filtrarGastosPorCategoria(filtroCategoria.value);
    
    gastosFiltrados.forEach(gasto => {
        const li = document.createElement("li");
        li.textContent = `${gasto.categoria}: $${gasto.cantidad.toFixed(2)}`;
        gastoList.appendChild(li);
    });
}

function actualizarTotalGastos() {
    const total = gasto.reduce((acc, gasto) => acc + gasto.cantidad, 0);
    gastoTotal.textContent = total.toFixed(2);
}
