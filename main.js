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
const idHtmlGasto = document.getElementById("ExpensesList");


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
        <input id=submit type="submit">
        `;
        saveObraNueva()
}

function saveObraNueva(){
    const submitButton = document.querySelector("#submit");
    submitButton.addEventListener("click", event =>{
        const inputs = document.querySelectorAll(".input");
        if(inputs.length >= 0){
            if(inputs[0].value != "" && inputs[1].value != "" && inputs[2].value != "" && inputs[3].value != ""){
            obras.push(new obra(inputs[0].value, inputs[1].value, inputs[2].value, inputs[3].value),);
            tableRender(idHtmlObra);
            localStorage.setItem("obras", JSON.stringify(obras));
            } else {
                return;
            }
    
        } else{
            return;
        }
    });
};
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
        </tr>
        `;
        HTML = idHtmlObra;

        for(const obra of obras) {
            const tr = document.createElement("tr");
                tr.innerHTML = `
                <td>${obra.nombreObra}</td>
                <td>${obra.fechaDeInicio}</td>
                <td>${obra.Descripcion}</td>
                <td>AR$ ${obra.presupuestoGeneral}</td>
                `;
                HTML.append(tr);
         }
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

        for(const gasto of gastos) {
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
                `;
                HTML.append(tr);
        }
    }else {
        return;
    }
}


/*
#################################################################################################################################
2 - CREAR GASTO
*/

function gastoNuevo(){
    const nombre = prompt("Ingrese el nombre de la obra a la que pertenece el gasto"); //esto deberia ser un desplegable con op.
    const concepto = prompt("Ingrese el concepto del gasto");
    const rubro = prompt("Ingrese el rubro al cual pertence el gasto");
    let fecha = prompt("Ingrese la fecha del gasto formato: dd/mm/aaaa, si no ingresa nada se tomara la fecha actual.");
    const unidad = prompt("Ingrese la undidad en la cual se computa el gasto, ej: m, un, gl");
    const cantidad = parseInt(prompt("Ingrese la cantidad de unidades, si es global [gl] ingrese 1"));
    const pUnitArs = parseFloat(prompt("Ingrese el precio unitario del gasto, en caso de ser global [gl] ingrese el total"));
    const presupuesto = parseFloat(prompt("Ingrese el monto en AR$ destinado para la obra"));
    const conversion = parseFloat(prompt("Ingrese la cotizacion de dolar que se utilizo para la compra"));

    if(fecha == ""){
        fecha = obtenerFechaActual()
    }

    const monto = (cantidad * pUnitArs) / conversion
    
    const gastoN = new Gasto(nombre, concepto, rubro, fecha, unidad, cantidad, pUnitArs, presupuesto, conversion, monto);
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
const obras = [];
if(localStorage.getItem("obras") != null){
    const localSavedObras = JSON.parse(localStorage.getItem("obras"));
    for (const savedObra of localSavedObras){
        obras.push(new Obra(savedObra.nombreObra, savedObra.fechaDeInicio, savedObra.Descripcion, savedObra.presupuestoGeneral));
    };

} else {
    loadTestDataObras()
    loadTestDataGastos()
} //falta pedirle que carge los Gastos almacenados en storage


/*
#################################################################################################################################
OBTENER DATOS PARA TEST "PRECARGA" JSON
*/
const gastos = [];

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




