(function (Prism) {
    Prism.languages.ice = {
        preprocessor: {
            pattern: /#\s*[a-zA-Z]+/,
            inside: {
                "class-name": /#\s*[a-zA-Z]+/,
            }
        },
        comment: [
            {
                // Doc comments
                pattern: /\/\/\/.*|\/\*\*[\s\S]*?(?:\*\/)/,
                greedy: true,
                inside: {
                    tag: /@[a-z]+\b/,
                    punctuation: /::|[:{}]/
                }
            },
            {
                // Non-doc comments
                pattern: /\/\/.*|\/\*[\s\S]*?(?:\*\/)/,
                greedy: true
            }
        ],
        attribute: {
            pattern: /\[+(?:\s*(?:[a-zA-Z0-9:-]+|\"(?:\\.|[^\\\"\r\n])*\")\s*?,?)*\]+/,
            inside: {
                function: /[a-zA-Z0-9:-]+|\"(?:\\.|[^\\\"\r\n])*?\"/,
                punctuation: /[\[\],]/
            }
        },
        string: /\"(?:\\.|[^\\\"\r\n])*?\"/,
        keyword: /\b(module|class|struct|exception|enum|interface|sequence|dictionary|const|optional|idempotent|out|local|extends|implements|throws)\b/,
        builtin: [
            {
                pattern: /\b(bool|byte|short|int|long|float|double|string|void|Value|Object|LocalObject)\b/,
                alias: 'keyword'
            },
            {
                pattern: /\b(true|false)\b/,
                alias: 'constant'
            }
        ],
        number: /\b[0-9](\w|\.)*\b/,
        punctuation: /(::|[(){}<>:;,=+-])/
    };
}(Prism));
