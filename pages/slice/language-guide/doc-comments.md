---
title: Doc comments
description: Learn how to write doc comments in Slice.
---

## Purpose of doc comments

Slice comments that start with `///` are doc comments. The Slice compiler uses these special comments as input for the
doc comments it generates in the mapped language.

Slice doc comments can be attached to all Slice definitions except encoding, modules, parameters and typealias.

## Doc comments tags

Slice doc comments support the following tags:

| Tag                       | Applies to | Description                                                        |
|---------------------------|------------|--------------------------------------------------------------------|
| `{@link identifier}`      | All        | Provide a link to the Slice type, operation or field `identifier`. |
| `@param name: ...`        | Operations | Describe the operation parameter `name`.                           |
| `@returns name: ...`      | Operations | Describe the return parameter `name`.                              |
| `@see identifier`         | All        | Suggest to see Slice type, operation or field `identifier`.        |
| `@throws exception: ... ` | Operations | Describe when the operation throws Slice exception `exception`.    |

{% slice1 %}
{% callout %}
An operation can have multiple `@throws` doc comments even though the operation itself can only throw one exception or
`AnyException`.
{% /callout %}
{% /slice1 %}

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
    /// @throws WidgetException: Thrown if the factory could not create the widget.
    createWidget(name: string) -> Widget throws WidgetException

    /// Retrieves the last {@link Widget} created by this factory.
    /// @returns proxy: A proxy to the last widget.
    /// @returns timeStamp: The creation time stamp.
    /// @throws WidgetException: Thrown if the factory has not created any widget yet.
    getLastWidget() -> (proxy: Widget, timeStamp: TimeStamp) throws WidgetException
}
```