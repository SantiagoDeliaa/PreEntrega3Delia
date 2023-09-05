//--------Tareas-----------
const tareaInput = document.getElementById("tareaInput");
const taskList = document.getElementById("tareaList");

function añadirTarea() {
    const tareaText = tareaInput.value.trim();
    if (tareaText !== "") {
        const li = document.createElement("li");
        li.textContent = tareaText;
        tareaList.appendChild(li);
        tareaInput.value = "";
    }
}

//---------Gastos----------
const gastoInput = document.getElementById("gastoInput");
const categoriaInput = document.getElementById("categoriaInput");
const gastoList = document.getElementById("gastoList");
const gastoTotal = document.getElementById("gastoTotal");
let gasto = [];

function añadirGasto() {
    const cantidad = parseFloat(gastoInput.value);
    const categoria = categoriaInput.value.trim();
    
    if (!isNaN(cantidad) && categoria !== "") {
        gasto.push({ cantidad, categoria });
        actualizarGastoList();
        actualizarTotalGastos();
        gastoInput.value = "";
        categoriaInput.value = "";
    }
}

function actualizarGastoList() {
    gastoList.innerHTML = "";
    gasto.forEach(gasto => {
        const li = document.createElement("li");
        li.textContent = `${gasto.categoria}: $${gasto.cantidad}`;
        gastoList.appendChild(li);
    });
}

function actualizarTotalGastos() {
    const total = gasto.reduce((acc, gasto) => acc + gasto.cantidad, 0);
    gastoTotal.textContent = total.toFixed(2);
}
