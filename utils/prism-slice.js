(function (Prism) {
    Prism.languages.slice = {
        preprocessor: {
            pattern: /#[^\r\n\/]*/,
            inside: {
                "class-name": /#\s*(define|undef|if|elif|else|endif)\b/,
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
        attribute: {
            pattern: /\[+[ \t]*[a-zA-Z0-9_:]+[ \t]*(?:\([ \t]*(?:(?:[a-zA-Z0-9_]+|\"(?:\\.|[^\\\"\r\n])*\")[ \t]*(?:,[ \t]*(?:[a-zA-Z0-9_]+|\"(?:\\.|[^\\\"\r\n])*\")[ \t]*)*)?\)[ \t]*)?\]+/,
            inside: {
                arguments: {
                    pattern: /\([ \t]*(?:(?:[a-zA-Z0-9_]+|\"(?:\\.|[^\\\"\r\n])*\")[ \t]*(?:,[ \t]*(?:[a-zA-Z0-9_]+|\"(?:\\.|[^\\\"\r\n])*\")[ \t]*)*)?\)/,
                    inside: {
                        string: /\"(?:\\.|[^\\\"\r\n])*\"/,
                        constant: /[a-zA-Z0-9_]+/,
                        punctuation: /[(),]/,
                    }
                },
                function: /[a-zA-Z0-9_:]+/,
                punctuation: /[\[\]]/,
            }
        },
        string: /\"(?:\\.|[^\\\"\r\n])*\"/,
        keyword: /\b(module|struct|exception|class|interface|enum|custom|typealias|compact|idempotent|mode|stream|tag|throws|unchecked)\b/,
        builtin: [
            {
                pattern: /\b(bool|int8|uint8|int16|uint16|int32|uint32|varint32|varuint32|int64|uint64|varint62|varuint62|float32|float64|string|Sequence|Dictionary|Result|AnyClass)\b/,
                alias: 'keyword'
            },
            {
                pattern: /\b(Slice1|Slice2)\b/,
                alias: 'constant'
            }
        ],
        number: /\b[0-9]\w*\b/,
        punctuation: /(->|::|[(){}<>:,=?-])/
    };
}(Prism));
