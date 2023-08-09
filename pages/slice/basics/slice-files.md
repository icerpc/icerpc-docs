---
title: Slice files
description: Understand how Slice definitions are organized in Slice files.
---

## File extension

Slice definitions must be stored in files with the `.slice` extension, known as Slice files. The Slice compiler ignores
files with other extensions.

## Source files and reference files

The Slice compiler accepts two categories of Slice files: source files and reference files. The compiler parses all
these files but only generates code for the source files.

Like C# and unlike C and C++, the Slice compiler considers the definitions in all its input files and does not impose
any ordering requirement. For instance, you can use a type before defining it:

```slice
module Example

interface WidgetFactory {
    // We can use Widget before defining it.
    createWidget(name: string) -> Widget
}

struct Widget {
    name: string
    color: Color
}

enum Color { Blue, Red, White, Yellow }
```

Two files can also contain definitions with circular references, such as:

```slice {% addMode=true %}
// in Chicken.slice
module Coop

interface Chicken {
   Egg lay()
}
```

```slice {% addMode=true %}
// in Egg.slice
module Coop

interface Egg {
    Chicken hatch()
}
```

For C#, the Slice compiler generates a C# file (.cs) for each source Slice file. You typically compile all the Slice
source files for a project in one shot.

## Preprocessing

The Slice language provides a few basic preprocessing directives for conditional compilation. For example:

```slice {% addMode=true %}
module VisitorCenter

interface Greeter {
    greet(name: string) -> string

#if NextGen // only available in the NextGen version of Greeter
    sing(songName: string) -> sequence<uint8>
#endif
}
```

Slice does not provide a preprocessing directive to include or import a Slice file into another Slice file.
