---
title: Slice files
description: Understand how Slice definitions are organized in Slice files.
---

{% title /%}

## .slice extension

Slice definitions must be stored in files with the `.slice` extension--Slice files. If you choose a different extension,
the Slice compiler will ignore your file.

## Source files and reference files

The Slice compiler accepts two categories of Slice files: source files and reference files. The compiler parses all
these files but only generates code for the source files.

Like C# and unlike C/C++, the Slice compiler considers the definitions in all its input files and does not impose any
ordering requirement. For instance, you can use a type before defining it:
```slice
module Example

interface WidgetFactory {
    // We can use Widget and InvalidNameException before defining them.
    createWidget(name: string) -> Widget throws InvalidNameException
}

struct Widget {
    name: string
}

exception InvalidNameException {}
```

Two files can also contain definitions with circular references, such as:

```slice
// in Chicken.slice
module Coop

interface Chicken {
   Egg lay()
}
```

```slice
// in Egg.slice
module Coop

interface Egg {
    Chicken hatch()
}
```

For C#, the Slice compiler generates a C# file (.cs) for each source Slice file. You typically compile all the Slice
files for a project or assembly in one shot.

## Preprocessing

The Slice language provides a few basic preprocessing directives for conditional compilation. For example:
```slice
module HelloExample

interface Hello {
    sayHello(name: string) -> string

#if NextGen // only available in the NextGen version
    sayGoodbye(name: string) -> string
#endif
}
```

Slice does not provide a preprocessing directive to include or import a Slice file into another Slice file.
