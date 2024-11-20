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



//Objeto OBRA
class obra{
    constructor(nombreObra, fechaDeInicio, Descripcion, presupuestoGeneral){
        this.nombreObra = nombreObra;
        this.fechaDeInicio = fechaDeInicio;
        this.Descripcion = Descripcion;
        this.presupuestoGeneral = presupuestoGeneral;
    }
}


//Objeto GASTO
class gasto{
    constructor(concepto, rubro, fecha, unidad, cantidad, pUnitArs, conversionArsUsd, montoUsd ){
        this.concepto = concepto;
        this.rubro = rubro;
        this.fecha = fecha;
        this.unidad = unidad;
        this.cantidad = cantidad;
        this.pUnitArs = pUnitArs;
        this.conversionArsUsd = conversionArsUsd;
        this.montoUsd = montoUsd;
    }
}


const obra1 = new obra("Las Golondrinas C144", "date().now", "VIvienda en country Las Golondrinas, Bs. As.", 350000000);
const gasto1 = new gasto("cemento loma negra", "Estructura", "date().now", "un", 40, 10500, 1120,"" );

console.log(obra1);
console.log(gasto1);