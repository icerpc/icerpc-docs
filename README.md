# IceRPC Docs

- [Build Requirements](#build-requirements)
- [Building](#building)
- [Writing Documentation](#writing-documentation)
  - [Custom Nodes](#custom-nodes)
  - [Available Tags](#available-tags)
  - [Updating Navigation](#updating-navigation)

## Build Requirements

You'll need Node.js and npm installed to build the documentation site. To
install node, it is recommended to follow the guide provided by Node.js
[here](https://nodejs.org/en/download/package-manager).

## Building

First, install the required dependencies:

```
npm install
```

Then start the development server:

```
npm run dev
```

## Writing Documentation

Documentation is written in Markdown and is located in the `pages`
directory. Additionally this Markdown uses syntax extensions provided by
[MarkDoc](https://markdoc.dev). These extensions allow the creation of custom
components, such as code tabs, notes, and flow diagrams, all from within the
Markdown file.

[**Nodes**](#custom-nodes) are elements that Markdoc inherits from Markdown,
specifically the CommonMark specification. Markdoc nodes enable you to customize
how your document renders without using any custom syntax. This consists of
items such as code fences and tables. We can extend these nodes to add
additional functionality with attributes.

- [Code Fence](#code-fences)
- [Links](#links)

[**Tags**](#available-tags) are the main syntactic extension that Markdoc adds
on top of Markdown. Each tag is enclosed with `{%` and `%}` and includes the tag
name, attributes, and content body. Tags allow for creating custom components
that can be used in the documentation.

- [Callout](#callout)
- [Side-by-side](#side-by-side)
- [Divider](#divider)
- [Grid](#grid)
- [Mini-Card](#mini-card)
- [Light-Mode](#light-mode)
- [Dark-Mode](#dark-mode)

[**Updating Navigation**](#updating-navigation) is done by editing the
`/data/*.ts` files.

## Custom Nodes

### Code Fences

Code fences are a way to show blocks of code in a visually clear and distinct
way. When you use code fences, you can also specify which programming language
the code is written in, and this helps to display it with appropriate syntax
highlighting, which makes it easier to read and understand. To specify the
programming language, you simply add the name of the language right after the
opening code fence.

#### Attributes

| Attribute | Description                                                                                                                                             |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| title     | The title of the code block.                                                                                                                            |
| addMode   | Whether or not to automatically add `mode = 1` to the code block when viewing Slice1 documentation. Can be either `true` or `false` Default is `false`. |

#### Examples

##### Code block title

````md
```python title="hello.py"
def hello(name):
  print("Hello, " + name)
```
````

##### Code block automatic mode

````md
```slice addMode=true
module Foo

interface Bar {}
```
````

---

### Links

Links are a way to reference other pages or external resources. Links can be to
other pages within the documentation site, or to external resources such as
GitHub or of the API reference. Links can be created by using the Markdown link
syntax.

#### API Reference Links

API reference links are links to the API reference. These links have a special
shorthand syntax that allows you to link to a specific class or method. The
syntax for these links is `<language>:<class-name>`

#### Examples

##### Link to a page in the API reference

```markdown
[ClientConnection](csharp:IceRpc.ClientConnection) will link to the page
<https://docs.testing.zeroc.com/api/csharp/api/IceRpc.ClientConnection.html>
```

## Available Tags

### Callout

The `callout` tag is used to create a callout box. The `callout` tag supports a
`type` attribute that can be set to either `note` or `danger`. The `type`
attribute is used to set the color of the callout box and icon used. Any content
within the `callout` tag will be placed inside the callout box.

#### Attributes

| Attribute | Description                                                                 |
| --------- | --------------------------------------------------------------------------- |
| type      | The type of callout. Can be either `note` or `danger`. Default is `note`. |

#### Examples

##### Note callout

```markdown
{% callout %}

This is an note callout

{% /callout %}
```

##### Danger callout

```markdown
{% callout type="danger" %}

This is a danger callout

{% /callout %}
```

---

### Side-by-side

The `side-by-side` tag is used to create columns of content that are
side-by-side. The content is split by a vertical divider. The first item in the
content is placed in the left column, and the second item is placed in the right
column. In the below example, the python codeblock would be placed in the left
column while the text would be placed in the right column.

#### Attributes

| Attribute | Description                                                                                        |
| --------- | -------------------------------------------------------------------------------------------------- |
| weighted  | The column that should have more content. Can be either `left` or `right`. Default is `left`.      |
| alignment | The alignment of the content in the columns. Can be either `top` or `center`. Default is `center`. |

#### Examples

##### Left weighted side-by-side

````markdown
{% side-by-side %}

```python
def hello(name):
  print("I will be on the left")
```

I will also be on the left

I will be on the right

{% /side-by-side %}
````

##### Right weighted side-by-side

````markdown
{% side-by-side weighted="right" %}

```python
def hello(name):
  print("I will be on the left")
```

I will also be on the right

I will be on the right

{% /side-by-side %}
````

##### Top aligned side-by-side

````markdown
{% side-by-side alignment="top" %}

```python
def hello(name):
  print("I will be on the left")
  print("I will be on the left")
  print("I will be on the left")
  print("I will be on the left")
```

I will be on the right

{% /side-by-side %}
````

---

### Divider

The `divider` tag is used to create a horizontal divider. This is useful for
breaking up content into sections.

```markdown
Lorem ipsum dolor sit amet.

{% divider /%}

Lorem ipsum dolor sit amet.
```

---

### Grid

The `grid` tag is used to create a grid of content. It is primarily intended to be used with the `mini-card` tag.

#### Attributes

| Attribute | Description                                                                              |
| --------- | ---------------------------------------------------------------------------------------- |
| columns   | The number of columns the grid could have, defaults to `3`. (On mobile will always be 1) |

#### Examples

```markdown
{% grid columns=2 %}

{% mini-card title="Foo" description="..." href="/foo" /%}
{% mini-card title="Bar" description="..." href="/bar" /%}
{% mini-card title="Fizz" description="..." href="/fizz" /%}
{% mini-card title="Buzz" description="..." href="/buzz" /%}

{% grid %}
```

---

### Mini-Card

The `mini-card` tag is used to create a mini card. Mini cards are used in the grid tag. They are small cards with
a title, description, and link.

#### Attributes

| Attribute   | Description                               |
| ----------- | ----------------------------------------- |
| title       | The title of the mini card.               |
| description | The description of the mini card.         |
| href        | The href used when clicking the mini card |

#### Examples

See the [`grid`](#Grid) tag for an example of how to use the `mini-card` tag.

---

## Updating Navigation

The hierarchy of the side navigation is defined in `/data/`. Each top navigation
item has a corresponding file, `getting-started-data.ts`, `icerpc-data.ts`,
etc., with Slice having two files corresponding to which Slice
mode was selected. These files export an array that defines the pages and
their order in the sidebar. The values in the arrays are either `SideBarLink` or
`SideBarCategory` types.

For example, the following values define two `SideBarLink` objects, one with the
title Overview that links to the `/getting-started/index.md` page, and
another called `Foo` that links to the `/getting-started/foo.md` page.
This generates the sidebar for the `Getting Started` top navigation item.

```TypeScript

export const gettingStartedData: SideBarSourceType[] = [
  {
    title: 'Overview',
    path: `${GETTING_STARTED_BASE_URL}/`
  },
  {
    title: 'Foo',
    path: `${GETTING_STARTED_BASE_URL}/foo/`
  },
  ...
]

```

In addition to defining the pages in the sidebar, you can also use
`SideBarCategory` to define a category that contains a list of `SideBarLink`
objects.

The below array defines a `SideBarCategory` object with the title
`Getting Started` that contains a link to the "What is IceRPC?" page.

```TypeScript
export const gettingStartedData: SideBarSourceType[] = [
  {
    title: 'Overview',
    path: `${GETTING_STARTED_BASE_URL}/`
  },
  {
    title: 'Getting started',
    links: [
      {
        title: 'What is IceRPC?',
        path: `${GETTING_STARTED_BASE_URL}/what-is-icerpc/`
      },
      ...
    ]
  }
  ...
]
```

---

### Light-Mode

The `light-mode` tag is used to render content that should only be visible in light mode.

#### Examples

```markdown
{% light-mode %}
This content will only be visible in light mode
{% /light-mode %}
```

---

### Dark-Mode

The `dark-mode` tag is used to render content that should only be visible in dark mode.

#### Examples

```markdown
{% dark-mode %}
This content will only be visible in dark mode
{% /dark-mode %}
```

---
