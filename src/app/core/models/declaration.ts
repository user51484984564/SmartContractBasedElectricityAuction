export class Declaration {
    id: number = 0;
    period: string = '';
    from: number = 0;
    to: number = 0
    generated: number = 0;
    monthBalance: number = 0;


    constructor(id: number, period: string, from: number, to: number, generated: number) {
        this.id = id,
            this.period = period;
        this.from = from;
        this.to = to;
        this.generated = generated;
        this.monthBalance = generated - (to - from);
    }
}