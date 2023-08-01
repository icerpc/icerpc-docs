(function (Prism) {
    Prism.languages.grammar = {
        string: /\"(?:\\.|[^\\\"\r\n])*?\"/,
        comment: {
            pattern: /\/\/[^\r\n]*/,
            greedy: true
        },
        definition: [
            {
                pattern: /\b[a-zA-Z]\w*(?=(<\w*>)?\s*:)/,
                alias: ['rule', 'class-name']
            },
            {
                pattern: /(?<=\n)[a-zA-Z]\w*(?=(<\w*>)?\s*;)/,
                alias: ['rule', 'class-name']
            }
        ],
        constant: {
            pattern: /\b[A-Z][A-Z_]+\b/,
            alias: ['builtin']
        },
        punctuation: /[;:()\[\]]/,
        operator: /[?*+|]/
    };
}(Prism));