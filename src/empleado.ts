export default abstract class Empleado {
    public constructor(
        private nombre: string,
        private cuil : number,
        private sector: string
    ) {}
    public getNombre(): string {
        return this.nombre
    }
    public getCuil(): number {
        return this.cuil
    }
    public getSector(): string {
        return this.sector
    }
}