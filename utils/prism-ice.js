(function (Prism) {
    Prism.languages.ice = Prism.languages.extend('clike', {

        'keyword': /\b(?:const|extends|idempotent|implements|local|optional|out|throws)\b/,
        'builtin': /\b(?:bool|byte|class|dictionary|double|enum|exception|float|int|interface|long|module|sequence|short|string|struct|void|LocalObject|Object)\b/,
        'number': [
            // binary and octal integers
            /\b0(?:b[01_]+|o[0-7_]+)i?\b/i,
            // hexadecimal integers and floats
            /\b0x(?:[a-f\d_]+(?:\.[a-f\d_]*)?|\.[a-f\d_]+)(?:p[+-]?\d+(?:_\d+)*)?i?(?!\w)/i,
            // decimal integers and floats
            /(?:\b\d[\d_]*(?:\.[\d_]*)?|\B\.\d[\d_]*)(?:e[+-]?[\d_]+)?i?(?!\w)/i
        ],
        'preprocessor': {
            pattern: /^ *#.*/gm,
            greedy: true,
        },
        'class-name': {
            pattern: /(\b(?:enum|interface|struct|class|exception|module|extends)\s+|\bcatch\s+\()[\w.\\]+/i,
            lookbehind: true
        },
    });

    Prism.languages.insertBefore('ice', 'keyword', {
        'preprocessor': {
            pattern: /(^[\t ]*)#.*/m,
            lookbehind: true,
            inside: {
                'string': [
                    {
                        // highlight the path of the include statement as a string
                        pattern: /^(#\s*include\s*)<[^>]+>/,
                        lookbehind: true
                    },
                    Prism.languages.clike['string']
                ],
                'directive': {
                    pattern: /^(#\s*)[a-z]+/,
                    lookbehind: true,
                    alias: 'keyword'
                },
                'directive-hash': /^#/,
            }
        }
    });
}(Prism));
