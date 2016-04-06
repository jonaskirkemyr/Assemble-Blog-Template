
declare class JsHelpers {
    static link(category: string, basename: string): string;
}
interface iSuggestion {
    title: string,
    created: string,
    summary: string,
    author: iSuggestionAuthor,
    image: string,
    category: string,
    tags: Array<string>,
    preview: string,
    basename: string,
    keyword?: string//only used for keywords in search

}

interface iSuggestionAuthor {
    name: string,
    email: string,
    img: string
}

declare var Data: any;
declare var loadJson: Function;