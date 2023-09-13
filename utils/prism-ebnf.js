
// cspell:words ANTLR
// This highlighter only handles a subset of ANTLR and EBNF syntax,
// since we don't need the full language to express the grammar rules of Slice.

(function (Prism) {
    Prism.languages.ebnf = {
        string: /\"(?:\\.|[^\\\"\r\n])*?\"/,
        comment: {
            pattern: /\/\/.*/,
            greedy: true
        },
        definition: [
            {
                pattern: /\b[a-zA-Z]\w*(?=(<\w*>)?\s*[:;])/,
                alias: ['rule', 'class-name']
            }
        ],
        constant: {
            pattern: /\b[A-Z][A-Z_]+\b/,
            alias: 'builtin'
        },
        punctuation: /[;:()\[\]]/,
        operator: /[?*+|]/
    };
}(Prism));
