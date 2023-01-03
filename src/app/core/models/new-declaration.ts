export class NewDeclaration {
    period: string = '';
    from: number = 0;
    to: number = 0;
    generated = 0;

    constructor(period: string, from: number, to: number, generated: number) {
        this.period = period;
        this.from = from;
        this.to = to;
        this.generated = generated;
    }
}