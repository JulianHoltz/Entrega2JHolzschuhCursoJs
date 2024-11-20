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
MENU
*/


let loop = false;

while(loop == false){
    alert("Seleccione una opcion del menu para Operar");
    let opcion = parseInt(prompt("1 - Crear obra nueva; 2 - Crear gasto nuevo; 3 - Eliminar gasto existente, 4 - Imprimir gastos"));

    switch(opcion){
        case 1:
            alert("Elegiste la opcion 1");
            loop = true;
            break;
        case 2:
            alert("Elegiste la opcion 2");
            loop = true;
            break;
        case 3:
            alert("Elegiste la opcion 3");
            loop = true;
            break;
        case 4:
            alert("Elegiste la opcion 4");
            loop = true;
            break;
        default:
            alert("Ninguna opcion valida");
            break;
    }
}
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
DATOS PARA TEST
*/
const obra1 = new obra("Las Golondrinas C144", "date().now", "VIvienda en country Las Golondrinas, Bs. As.", 350000000);
const gasto1 = new gasto("Las Golondrinas C144", "cemento loma negra", "Estructura", "date().now", "un", 40, 10500, 1120,"" );
const gasto2 = new gasto("Las Golondrinas C144", "cemento loma negra", "Estructura", "date().now", "un", 40, 10500, 1120,"" );
const gasto3 = new gasto("Las Golondrinas C144", "cemento loma negra", "Estructura", "date().now", "un", 40, 10500, 1120,"" );
const gasto4 = new gasto("Las Pepas", "cemento loma negra", "Estructura", "date().now", "un", 40, 10500, 1120,"" );




// console.log(obra1);
// console.log(gasto1);

// console.log( gasto.arrayGastos);

imprimirGastos("Las Golondrinas C144");