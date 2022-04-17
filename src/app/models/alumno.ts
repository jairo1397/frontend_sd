export class Alumno {
    id?: number;
    nombre: string;
    apellido: string;
    edad: number;
    genero: string;
    promedio_pond: number;

    constructor(nombre: string, apellido: string, edad: number, genero: string, promedio_pond: number) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.edad = edad;
        this.genero = genero;
        this.promedio_pond = promedio_pond;
    }

}