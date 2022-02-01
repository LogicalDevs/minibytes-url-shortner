export namespace verifyTag {
    const tagRegex : RegExp = /(\W|^)(Blog|Business|Educational|E-Commerce|Entertainment|Forum|Other)(\W|$)/;

    export class tagValidator {
        static isValid(Tag: string) {
            return tagRegex.test(Tag);
        }
    }
}
