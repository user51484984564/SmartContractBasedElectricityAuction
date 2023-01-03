import { Declaration } from "../models/declaration";

export abstract class Calculator {
    
    public static CurrentBalance(declarations: Declaration[]) {
        let balance = 0;
        declarations.forEach(d => balance = balance + d.monthBalance);
        return balance;
    }


}