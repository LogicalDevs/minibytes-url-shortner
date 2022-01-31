export namespace verifyURL {
    const urlRegex : RegExp = /(https:\/\/)|(www.)|(http:\/\/)/;

    export class urlValidator {
        static isValid(URL: string) {
            return urlRegex.test(URL);
        }
    }
}
