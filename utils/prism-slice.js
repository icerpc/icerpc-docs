(function (Prism) {
    Prism.languages.slice = {
        preprocessor: {
            pattern: /^\s*#[^\r\n/]*/,
            inside: {
                keyword: /#\s*(define|undef|if|elif|else|endif)\b/,
                symbol: /\b\w+\b/,
                operator: /\!|&&|\|\|/,
                punctuation: /[#()]/
            }
        },
        comment: [
            {
                // Doc comments
                pattern: /\/\/\/.*/,
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
        string: /\"(?:\\.|[^\\\"\r\n])*?\"/,
        keyword: /\b(module|struct|exception|class|interface|enum|custom|typealias|compact|idempotent|mode|stream|tag|throws|unchecked)\b/,
        builtin: [
            {
                pattern: /\b(bool|int8|uint8|int16|uint16|int32|uint32|varint32|varuint32|int64|uint64|varint62|varuint62|float32|float64|string|sequence|dictionary|AnyClass)\b/,
                alias: 'keyword'
            },
            {
                pattern: /\b(Slice1|Slice2)\b/,
                alias: 'constant'
            }
        ],
        number: /\b[0-9]\w*\b/,
        punctuation: /(->|::|\[\[|\]\]|[(){}<>\[\]:,=?-])/
    };
}(Prism));
