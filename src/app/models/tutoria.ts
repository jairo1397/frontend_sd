export class Tutoria {
    id?: number;
    tutor!:string;
    reunion!: string;
    grabacion!:string;
    hora!:string;
    acuerdos!:string;
    alumno!: number;
    fecha!:String;
    constructor() {
        this.tutor = "";
        this.hora = "";
        this.acuerdos = "";
        this.reunion = "";
        this.grabacion= "";
        this.alumno = 0;
        this.fecha = "";
    }
}