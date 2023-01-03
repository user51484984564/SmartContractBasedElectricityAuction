import { Declaration } from "../models/declaration";

export class MeterValidator {

    errorMessage: string = "Input invalid: ";

    private periods: string[] = [];
    private declarations: Declaration[] = [];
    private period: string = "";
    private from: number = 0;
    private to: number = 0;

    constructor(periods: string[], declarations: Declaration[], period: string, from: number, to: number,) {
        this.periods = periods;
        this.declarations = declarations;
        this.period = period;
        this.from = from;
        this.to = to;
    }

    isValid(): boolean {

        const isPeriodValid = this.isPeriodValid();
        const isFromValid = this.isFromValid();
        const isToValid = this.isToValid();

        this.updateErrorMessage(isPeriodValid, "Period");
        this.updateErrorMessage(isFromValid, "From");
        this.updateErrorMessage(isToValid, "To");

        if (isPeriodValid &&
            isFromValid &&
            isToValid)
            return true;
        else
            return false;

    }

    private isPeriodValid() {
        if (this.period == '') {
            return false;
        }
        if (this.declarations.length > 0) {

            return !this.declarations
                .map(x => x.period)
                .includes(this.period);
        } else {
            return true;
        }
    }

    private isFromValid() {
        if (this.declarations.length > 0) {

            let last = this.declarations[this.declarations.length - 1].to;
            return this.from >= last;

        } else {
            return true;
        }
    }

    private isToValid() {
        return this.to > this.from;
    }

    private updateErrorMessage(valid: boolean, errorMessage: string) {
        if (!valid) {
            let message = `| ${errorMessage} `;
            this.errorMessage = this.errorMessage + message;
        }
    }

}