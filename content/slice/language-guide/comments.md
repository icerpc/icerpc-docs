---
title: Comments and doc comments
description: Using comments and doc comments in Slice files.
---

## Comments

You can and should add comments to your Slice files to make your Slice definitions easier to understand.

A Slice comment starts with two slashes (`//`) and continues until the end of the line, just like in C# and Rust:

```slice
// This is a comment
interface FooBar { // This is another comment
}
```

Slice also supports block comments (`/* ... */`), like C, including nested block comments.

The Slice compiler completely ignores comments that are not doc comments.

## Doc comments

Slice comments that start with a triple slash (`///`) are doc comments. The Slice compiler uses these special comments
as input for the doc comments it generates in the mapped language.

Slice doc comments can be attached to all Slice elements except parameters and modules statements.

## Doc comments tags

Slice doc comments support the following tags:

| Tag                  | Applies to | Description                                                        |
|----------------------|------------|--------------------------------------------------------------------|
| `{@link identifier}` | All        | Provide a link to the Slice type, operation or field `identifier`. |
| `@param name: ...`   | Operations | Describe the operation parameter `name`.                           |
| `@returns name: ...` | Operations | Describe the return parameter `name`.                              |
| `@see identifier`    | All        | Suggest to see Slice type, operation or field `identifier`.        |

## Example

```slice
module Example

/// Represents a factory for widgets.
/// @see Widget
interface WidgetFactory {
    /// Creates a new {@link Widget}.
    /// @param name: The name of the new widget.
    /// @param color: The color of the new widget.
    /// @returns: A proxy to the new widget.
    createWidget(name: string) -> Widget

    /// Retrieves the last {@link Widget} created by this factory.
    /// @returns proxy: A proxy to the last widget.
    /// @returns timeStamp: The creation time stamp.
    getLastWidget() -> (proxy: Widget, timeStamp: WellKnownTypes::TimeStamp)
}
```

