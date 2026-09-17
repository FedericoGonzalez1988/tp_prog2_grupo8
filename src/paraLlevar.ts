export default class ParaLlevar extends Pedido {

    constructor(private horario:Date){
        //en el super faltan agregar los parametros del constructor de Pedido
        super()
        this.horario = horario;
    }

}