export class Passenger {
    private static ID: number = 0;
    public id: number;

    constructor(public firstName: string, public lastName: string) {
        this.id = Passenger.ID++;
    }
}