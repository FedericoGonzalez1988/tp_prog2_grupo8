export default abstract class Empleado {
    public constructor(
        private nombre: string,
        private cuil : string,
        private sector: string
    ) {}
    public getNombre(): string {
        return this.nombre
    }
    public getCuil(): string {
        return this.cuil
    }
    public getSector(): string {
        return this.sector
    }
}