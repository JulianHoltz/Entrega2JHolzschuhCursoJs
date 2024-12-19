/*
Me tiene que permitir ingresar:

-Obra
-Fecha de inicio
-Descripcion
-Presupuesto general


-Concepto
-Rubro (que tarea corresponde.. ejemplo mamposteri, pisos...)
-fecha (automatico, con posibilidad de editar)
-unidad
-cantidad
-Monto AR$
-conversion AR$/U$D
-monto U$D (automatico)

Esto se debe mostrar en una lista, y dar el total y avisarme si me paso del presupuesto
*/


/*
#################################################################################################################################
INICIO
*/
const idHtmlObra = document.getElementById("constructionList");
const idHtmlGasto = document.getElementById("expensesList");


/*
#################################################################################################################################
CLASES Y CONSTRUCTORES
*/
//Objeto OBRA
class Obra{
    static arrayObras = []; //array para almacenar las obras
    constructor(nombreObra, fechaDeInicio, Descripcion, presupuestoGeneral){
        this.nombreObra = nombreObra;
        this.fechaDeInicio = fechaDeInicio;
        this.Descripcion = Descripcion;
        this.presupuestoGeneral = presupuestoGeneral;

        Obra.arrayObras.push(this);//almacenamiento de obra
    }
}


//Objeto GASTO
class Gasto{
    static arrayGastos = []; //array para almacenar los gastos
    constructor(obra, concepto, rubro, fecha, unidad, cantidad, pUnitArs, conversionArsUsd, montoUsd ){
        this.obra = obra;
        this.concepto = concepto;
        this.rubro = rubro;
        this.fecha = fecha;
        this.unidad = unidad;
        this.cantidad = cantidad;
        this.pUnitArs = pUnitArs;
        this.conversionArsUsd = conversionArsUsd;
        this.montoArs = pUnitArs * cantidad;
        this.montoUsd = montoUsd;
        

        Gasto.arrayGastos.push(this);//almacenamiento de gastos
    }
}


/*
#################################################################################################################################
Funcion para imprimir gastos
*/
function imprimirGastos(obraSelec){
    // Filtrar las instancias donde obra sea "obra seleccionada"
    const filtroObra = Gasto.arrayGastos.filter(gasto => gasto.obra === obraSelec);

    // Mostrar los resultados en la consola
    console.log(filtroObra);
}

/*
#################################################################################################################################
1 - CREAR UNA OBRA NUEVA
*/

const plusButton = document.querySelector("#newConstruction");
plusButton.addEventListener("click", event =>{
    const inputs = document.querySelectorAll(".columnContent");
    if(inputs.length <= 0){
        obraNueva();
    } else{
        return;
    }
})//hay que validar que si hay una creacion en proceso no te deje agregar otra...


function obraNueva(){


    //Crear etiqueta de obra
    const box = document.getElementById("constructionList");
    box.innerHTML = box.innerHTML + `
        <td class=columnContent><input class=input type="text"></td>
        <td class=columnContent><input class=input type="text"></td>
        <td class=columnContent><input class=input type="text"></td>
        <td class=columnContent><input class=input type="text"></td>
        <input class=button-yellow id=submit type="submit">
        `;
        saveObraNueva()
}

/* QUEDO OBSOLETO */
// function saveObraNueva(){
//     const submitButton = document.querySelector("#submit");
//     submitButton.addEventListener("click", event =>{
//         const inputs = document.querySelectorAll(".input");
//         if(inputs.length >= 0){
//             if(inputs[0].value != "" && inputs[1].value != "" && inputs[2].value != "" && inputs[3].value != ""){
//             obras.push(new obra(inputs[0].value, inputs[1].value, inputs[2].value, inputs[3].value),);
//             tableRender(idHtmlObra);
//             localStorage.setItem("obras", JSON.stringify(obras));
//             } else {
//                 return;
//             }
    
//         } else{
//             return;
//         }
//     });
// };

function saveObraNueva() {
    // Selecciona el botón de guardado
    const submitButton = document.querySelector("#submit");

    // Verifica si el botón existe
    if (!submitButton) {
        console.error("El botón con id 'submit' no se encuentra en el DOM.");
        return;
    }

    // Agrega un listener al botón de guardado
    submitButton.addEventListener("click", () => {
        const inputs = document.querySelectorAll(".input");

        // Verifica que los inputs existan
        if (inputs.length !== 4) {
            console.error("No se encontraron 4 inputs con la clase 'input'.");
            return;
        }

        // Verifica que todos los inputs tengan valores "Aca estaria bueno mandar el alert de la libreria"
        const values = Array.from(inputs).map(input => input.value.trim());
        if (values.some(value => value === "")) {
            console.warn("Todos los campos deben estar completos.");
            return;
        }

        // Crea un nuevo objeto y lo agrega al array
        const nuevaObra = new Obra(...values);
        obras.push(nuevaObra);

        // Actualiza la tabla
        tableRender(idHtmlObra);

        // Guarda en el localStorage
        localStorage.setItem("obras", JSON.stringify(obras));

        console.log("Obra guardada:", nuevaObra);
    });
}

/*
#################################################################################################################################
2 - CREAR UN GASTO NUEVO
*/
const plusButtonG = document.querySelector("#newExpense");
plusButtonG.addEventListener("click", event =>{
    const inputs = document.querySelectorAll(".columnContentG");
    if(inputs.length <= 0){
        gastoNuevo();
    } else{
        return;
    }
})//hay que validar que si hay una creacion en proceso no te deje agregar otra...


function gastoNuevo(){

    //Crear etiqueta de gasto
    const box = document.getElementById("expensesList");
    box.innerHTML = box.innerHTML + `
        <td class=columnContentG><input class=inputG type="text"></td>
        <td class=columnContentG><input class=inputG type="text"></td>
        <td class=columnContentG><input class=inputG type="text"></td>
        <td class=columnContentG><input class=inputG type="text"></td>
        <td class=columnContentG><input class=inputG type="text"></td>
        <td class=columnContentG><input class=inputG type="text"></td>
        <td class=columnContentG><input class=inputG type="text"></td>
        <td class=columnContentG><input class=inputG type="text"></td>
        <td class=columnContentG><input class=inputG type="text"></td>
        <td class=columnContentG><input class=inputG type="text"></td>
        <input class=button-yellow id=submitG type="submit">
        `;
        saveGastoNuevo()
}


function saveGastoNuevo() {
    // Selecciona el botón de guardado
    const submitButtonG = document.querySelector("#submitG");

    // Verifica si el botón existe
    if (!submitButtonG) {
        console.error("El botón con id 'submitG' no se encuentra en el DOM.");
        return;
    }

    // Agrega un listener al botón de guardado
    submitButtonG.addEventListener("click", () => {
        const inputs = document.querySelectorAll(".inputG");

        // Verifica que los inputs existan
        if (inputs.length !== 10) {
            console.error("No se encontraron 4 inputs con la clase 'inputG'.");
            return;
        }

        // Verifica que todos los inputs tengan valores "Aca estaria bueno mandar el alert de la libreria"
        const values = Array.from(inputs).map(input => input.value.trim());
        if (values.some(value => value === "")) {
            console.warn("Todos los campos deben estar completos.");
            return;
        }

        // Crea un nuevo objeto y lo agrega al array
        const nuevoGasto = new Gasto(...values);
        gastos.push(nuevoGasto);

        // Actualiza la tabla
        tableRender(idHtmlGasto);

        // Guarda en el localStorage
        localStorage.setItem("gastos", JSON.stringify(gastos));

        console.log("Gasto guardado:", nuevoGasto);
    });
}

/*
#################################################################################################################################
RENDERIZAR TABLA DE OBRAS
*/

function tableRender(htmlId){
    let  HTML = "";
    if (htmlId == idHtmlObra){
        idHtmlObra.innerHTML = `
        <tr>
        <th class=columnTitle><a>Nombre</a></th>
        <th class=columnTitle><a>Fecha</a></th>
        <th class=columnTitle><a>Descripcion</a></th>
        <th class=columnTitle><a>Presupuesto</a></th>
        <th class=columnTitle></th>
        </tr>
        `;
        HTML = idHtmlObra;

        obras.forEach((obra, index) => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td>${obra.nombreObra}</td>
                <td>${obra.fechaDeInicio}</td>
                <td>${obra.Descripcion}</td>
                <td>AR$ ${obra.presupuestoGeneral}</td>
                <td class="noBorder"><button id=delete class="delete-btn" data-index="${index}">Eliminar Obra</button></td>
            `;
            HTML.append(tr);
        });

        // Agregar eventos de click a los botones de eliminar
        const deleteButtons = HTML.querySelectorAll(".delete-btn");
        deleteButtons.forEach(button => {
            button.addEventListener("click", function () {
                const index = this.getAttribute("data-index"); // Obtener el índice desde el atributo data-index
                obras.splice(index, 1); // Eliminar del array
                tableRender(htmlId); // Volver a renderizar la tabla
                localStorage.setItem("obras", JSON.stringify(obras));
            });
        });


    }else if(htmlId == idHtmlGasto){
        idHtmlGasto.innerHTML = `
        <tr>
        <th class=columnTitle><a>Obra</a></th>
        <th class=columnTitle><a>Concepto</a></th>
        <th class=columnTitle><a>Rubro</a></th>
        <th class=columnTitle><a>Fecha</a></th>
        <th class=columnTitle><a>Unidad</a></th>
        <th class=columnTitle><a>Cantidad</a></th>
        <th class=columnTitle><a>Precio Unitario</a></th>
        <th class=columnTitle><a>Conversion</a></th>
        <th class=columnTitle><a>Monto</a></th>
        <th class=columnTitle><a>Monto U$D</a></th>
        </tr>
        `;
        HTML = idHtmlGasto;

        gastos.forEach((gasto, index) => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td>${gasto.obra}</td>
                <td>${gasto.concepto}</td>
                <td>${gasto.rubro}</td>
                <td>${gasto.fecha}</td>
                <td>${gasto.unidad}</td>
                <td>${gasto.cantidad}</td>
                <td>AR$ ${gasto.pUnitArs}</td>
                <td>${gasto.conversionArsUsd}</td>
                <td>AR$ ${gasto.montoArs}</td>
                <td>U$D ${gasto.montoUsd}</td>
                <td class="noBorder"><button id=delete class="delete-btn-gasto" data-index="${index}">Eliminar Gasto</button></td>
            `;
            HTML.append(tr);
        });

        // Agregar eventos de click a los botones de eliminar
        const deleteButtons = HTML.querySelectorAll(".delete-btn-gasto");
        deleteButtons.forEach(button => {
            button.addEventListener("click", function () {
                const index = this.getAttribute("data-index"); // Obtener el índice desde el atributo data-index
                gastos.splice(index, 1); // Eliminar del array
                tableRender(idHtmlGasto);//renderizar
                localStorage.setItem("gastos", JSON.stringify(gastos));// Actualizar en el localStorage
            });
        });

        // for(const gasto of gastos) {
        //     const tr = document.createElement("tr");
        //         tr.innerHTML = `
        //         <td>${gasto.obra}</td>
        //         <td>${gasto.concepto}</td>
        //         <td>${gasto.rubro}</td>
        //         <td>${gasto.fecha}</td>
        //         <td>${gasto.unidad}</td>
        //         <td>${gasto.cantidad}</td>
        //         <td>AR$ ${gasto.pUnitArs}</td>
        //         <td>${gasto.conversionArsUsd}</td>
        //         <td>AR$ ${gasto.montoArs}</td>
        //         <td>U$D ${gasto.montoUsd}</td>
        //         `;
        //         HTML.append(tr);
        // }
    }else {
        return;
    }
}


/*
#################################################################################################################################
OBTENER FECHA EN FORMATO NORMAL
*/

const obtenerFechaActual = () => {
    const fecha = new Date();
    const dia = String(fecha.getDate()).padStart(2, '0'); // Asegura dos dígitos
    const mes = String(fecha.getMonth() + 1).padStart(2, '0'); // Los meses van de 0 a 11
    const anio = fecha.getFullYear();

    return `${dia}/${mes}/${anio}`;
};


/*
#################################################################################################################################
CARGA DE DATOS ALMACENADOS
*/
const obras = []; //inicializacion array almacenamiento de obras
const gastos = []; //inicializacion array almacenamiento de gastos

if(localStorage.getItem("obras") != null){
    const localSavedObras = JSON.parse(localStorage.getItem("obras"));
    for (const savedObra of localSavedObras){
        obras.push(new Obra(savedObra.nombreObra, savedObra.fechaDeInicio, savedObra.Descripcion, savedObra.presupuestoGeneral));
};
} else {
    loadTestDataObras() //si no hay datos locales, toma los del json
}

if(localStorage.getItem("gastos") != null){
    const localSavedGastos = JSON.parse(localStorage.getItem("gastos"));
    for (const savedGasto of localSavedGastos){
        gastos.push(new Gasto(savedGasto.obra, savedGasto.concepto, savedGasto.rubro, savedGasto.fecha, savedGasto.unidad, savedGasto.cantidad, savedGasto.pUnitArs, savedGasto.conversionArsUsd, savedGasto.montoArs, savedGasto.montoUsd));
    };
} else {
    loadTestDataGastos() //si no hay datos locales, toma los del json
};


//renderizar
tableRender(idHtmlObra);
tableRender(idHtmlGasto);

/*
#################################################################################################################################
OBTENER DATOS PARA TEST "PRECARGA" JSON
*/
function loadTestDataObras(){
    fetch("/obras.json")
    .then((response) => response.json()) // esto convierte la respuesta JSON, no hace falta parsear!
    .then((data) => {
        const obraAjax = data.map(item => new Obra(item.nombreObra, item.fechaDeInicio, item.Descripcion, item.presupuestoGeneral));
        obras.push(...obraAjax); 
        tableRender(idHtmlObra);
    })
    .catch((error) => console.error("Error al cargar el archivo JSON:", error));
};

function loadTestDataGastos(){
    fetch("/gastos.json")
    .then((response) => response.json()) // esto convierte la respuesta JSON, no hace falta parsear!
    .then((data) => {
        const gastoAjax = data.map(item => new Gasto(item.obra, item.concepto, item.rubro, item.fecha, item.unidad, item.cantidad, item.pUnitArs, item.conversionArsUsd, item.montoArs, item.montoUsd));
        gastos.push(...gastoAjax);
        tableRender(idHtmlGasto);
    })
    .catch((error) => console.error("Error al cargar el archivo JSON:", error));
};
    

    





//imprimirGastos("Las Golondrinas C144");




