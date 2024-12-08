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
class obra{
    static arrayObras = []; //array para almacenar las obras
    constructor(nombreObra, fechaDeInicio, Descripcion, presupuestoGeneral){
        this.nombreObra = nombreObra;
        this.fechaDeInicio = fechaDeInicio;
        this.Descripcion = Descripcion;
        this.presupuestoGeneral = presupuestoGeneral;

        obra.arrayObras.push(this);//almacenamiento de obra
    }
}


//Objeto GASTO
class gasto{
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
        

        gasto.arrayGastos.push(this);//almacenamiento de gastos
    }
}


/*
#################################################################################################################################
Funcion para imprimir gastos
*/
function imprimirGastos(obraSelec){
    // Filtrar las instancias donde obra sea "obra seleccionada"
    const filtroObra = gasto.arrayGastos.filter(gasto => gasto.obra === obraSelec);

    // Mostrar los resultados en la consola
    console.log(filtroObra);
}


/*
#################################################################################################################################
1 - CREAR UNA OBRA NUEVA
*/

const plusButton = document.querySelector("#newConstruction");
plusButton.addEventListener("click", event =>{
    obraNueva();
})//hay que validar que si hay una creacion en proceso no te deje agregar otra...


function obraNueva(){


    //Crear etiqueta de obra
    const box = document.getElementById("constructionList");
    box.innerHTML = box.innerHTML + `<div class=columnContent><input type="text"></div><div class=columnContent><input type="text"></div><div class=columnContent><input type="text"></div><div class=columnContent><input type="text"></div>`;
}

/*
#################################################################################################################################
RENDERIZAR TABLA DE OBRAS
*/

function tableRender(htmlId){
    let  HTML = "";
    if (htmlId == idHtmlObra){
        idHtmlObra.innerHTML = "";
        HTML = idHtmlObra;

        for(const obrai of obra) {
            const tr = document.createElement("tr");
                tr.innerHTML = `
                <td>${obra.nombreObra}</td>
                <td>$${obra.fechaDeInicio}</td>
                <td>${obra.Descripcion}</td>
                <td>${obra.presupuestoGeneral}</td>
                `;
                HTML.append(tr);
         }
    }else if(htmlId == idHtmlGasto){
        idHtmlGasto.innerHTML = "";
        HTML = idHtmlGasto;

        for(const gasto of gastos) {
            const tr = document.createElement("tr");
                tr.innerHTML = `
                <td>${gasto.obra}</td>
                <td>$${gasto.concepto}</td>
                <td>${gasto.rubro}</td>
                <td>${gasto.fecha}</td>
                <td>${gasto.unidad}</td>
                <td>${gasto.cantidad}</td>
                <td>${gasto.pUnitArs}</td>
                <td>${gasto.conversionArsUsd}</td>
                <td>${gasto.montoArs}</td>
                <td>${gasto.montoUsd}</td>
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
    
    const gastoN = new gasto(nombre, concepto, rubro, fecha, unidad, cantidad, pUnitArs, presupuesto, conversion, monto);
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
DATOS PARA TEST
*/

const obra1 = new obra("Las Golondrinas C144", "date().now", "Vivienda en country Las Golondrinas, Bs. As.", 350000000);
const gastos = [
    new gasto("Las Golondrinas C144", "cemento loma negra", "Estructura", "date().now", "un", 40, 10500, 1120,"" ),
    new gasto("Las Golondrinas C144", "cemento loma negra", "Estructura", "date().now", "un", 40, 10500, 1120,"" ),
    new gasto("Las Golondrinas C144", "cemento loma negra", "Estructura", "date().now", "un", 40, 10500, 1120,"" ),
    new gasto("Las Pepas", "cemento loma negra", "Estructura", "date().now", "un", 40, 10500, 1120,"" ),
]
// const gasto1 = new gasto("Las Golondrinas C144", "cemento loma negra", "Estructura", "date().now", "un", 40, 10500, 1120,"" );
// const gasto2 = new gasto("Las Golondrinas C144", "cemento loma negra", "Estructura", "date().now", "un", 40, 10500, 1120,"" );
// const gasto3 = new gasto("Las Golondrinas C144", "cemento loma negra", "Estructura", "date().now", "un", 40, 10500, 1120,"" );
// const gasto4 = new gasto("Las Pepas", "cemento loma negra", "Estructura", "date().now", "un", 40, 10500, 1120,"" );




// console.log(obra1);
// console.log(gasto1);

// console.log( gasto.arrayGastos);

imprimirGastos("Las Golondrinas C144");
console.log(obra.arrayObras);

tableRender(idHtmlGasto);


