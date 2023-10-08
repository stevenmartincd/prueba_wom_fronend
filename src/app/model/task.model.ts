export class Task {
    id?: number;
    idUser: number;
    name: string;
    status: number;

    constructor() {
        this.idUser = 0;
        this.name = '';
        this.status = 0;
    }
}
