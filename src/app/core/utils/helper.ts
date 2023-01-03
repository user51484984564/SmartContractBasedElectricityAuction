export abstract class Helper {

    public static Trim(string: string) {
        return string.length > 6 ?
            '' + string.slice(0, 5) + '.....' + string.slice(37, 42)
            : string;
    }
}