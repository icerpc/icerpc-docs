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

Slice doc comments can be attached to all Slice elements except parameters, modules, and mode statements.

## Doc comments tags

Slice doc comments support the following tags:

{% slice1 %}
| Tag                       | Applies to | Description                                                        |
|---------------------------|------------|--------------------------------------------------------------------|
| `{@link identifier}`      | All        | Provide a link to the Slice type, operation or field `identifier`. |
| `@param name: ...`        | Operations | Describe the operation parameter `name`.                           |
| `@returns name: ...`      | Operations | Describe the return parameter `name`.                              |
| `@see identifier`         | All        | Suggest to see Slice type, operation or field `identifier`.        |
| `@throws exception: ... ` | Operations | Describe when the operation throws Slice exception `exception`.    |
{% /slice1 %}

{% slice2 %}
| Tag                  | Applies to | Description                                                        |
|----------------------|------------|--------------------------------------------------------------------|
| `{@link identifier}` | All        | Provide a link to the Slice type, operation or field `identifier`. |
| `@param name: ...`   | Operations | Describe the operation parameter `name`.                           |
| `@returns name: ...` | Operations | Describe the return parameter `name`.                              |
| `@see identifier`    | All        | Suggest to see Slice type, operation or field `identifier`.        |
{% /slice2 %}

## Example

{% slice1 %}
```slice  {% addMode=true %}
module Example

/// Represents a factory for widgets.
/// @see Widget
interface WidgetFactory {
    /// Creates a new {@link Widget}.
    /// @param name: The name of the new widget.
    /// @param color: The color of the new widget.
    /// @returns: A proxy to the new widget.
    /// @throws WidgetException: Thrown if the factory could not create the widget.
    /// @throws InvalidNameException: Thrown if the provided name was invalid.
    createWidget(name: string) -> Widget throws (WidgetException, InvalidNameException)

    /// Retrieves the last {@link Widget} created by this factory.
    /// @returns proxy: A proxy to the last widget.
    /// @returns timeStamp: The creation time stamp.
    /// @throws WidgetException: Thrown if the factory has not created any widget yet.
    /// @throws DerivedFromWidgetException: It's okay to document derived exceptions.
    getLastWidget() -> (proxy: Widget, timeStamp: TimeStamp) throws WidgetException
}
```
{% /slice1 %}

{% slice2 %}
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
{% /slice2 %}
