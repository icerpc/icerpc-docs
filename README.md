# IceRPC Docs

- [IceRPC Docs](#icerpc-docs)
  - [Build Requirements](#build-requirements)
  - [Building](#building)
  - [Writing Documentation](#writing-documentation)
    - [Tags](#tags)
    - [Updating Navigation](#updating-navigation)

## Build Requirements

You'll need Node.js and npm installed to build the documentation site. To install node, it is recommended to follow
the guide provided by Node.js [here](https://nodejs.org/en/download/package-manager).

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

Documentation is written in Markdown and is located in the `pages/docs` directory. Additionally this Markdown uses
syntax extensions provided by [MarkDoc](https://markdoc.dev/docs/getting-started). These extensions allow the creation
of custom components, such as code tabs, notes, and flow diagrams, all from within the Markdown file.

[**Tags**](#tags) are the main syntactic extension that Markdoc adds on top of Markdown. Each tag is enclosed with `{%` and `%}`
and includes the tag name, attributes, and content body. Tags allow for creating custom components that can
be used in the documentation.

- [Callout](#callout)
- [Side-by-side](#side-by-side)
- [Divider](#divider)

[**Updating Navigation**](#updating-navigation) is done by editing the `/data/*.ts` files.

### Tags

#### Callout

The `callout` tag is used to create a callout box. The `callout` tag supports a `type` attribute that can be set to
either `info` or `critical`. The `type` attribute is used to set the color of the callout box and icon used. Any content
within the `callout` tag will be placed inside the callout box.

#### Attributes {#callout-attributes}

| Attribute | Description                                                                 |
| --------- | --------------------------------------------------------------------------- |
| type      | The type of callout. Can be either `info` or `critical`. Default is `info`. |

#### Examples {#callout-examples}

##### Info callout

```markdown

{% callout %}

This is an info callout

{% callout /%}
```

##### Critical callout

```markdown

{% callout type="critical" %}

This is a critical callout

{% callout /%}
```

#### Side-by-side

The `side-by-side` tag is used to create columns of content that are side-by-side. The content is split by a vertical
divider. The first item in the content is placed in the left column, and the second item is placed in the right column.
In the below example, the python codeblock would be placed in the left column while the text would be placed in the
right column.

#### Attributes {#side-by-side-attributes}

| Attribute | Description                                                                 |
| --------- | --------------------------------------------------------------------------- |
| weighted  | The column that should have more content. Can be either `left` or `right`. Default is `left`. |
| alignment | The alignment of the content in the columns. Can be either `top` or `center`. Default is `center`. |

#### Examples {#side-by-side-examples}

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

#### Divider

The `divider` tag is used to create a horizontal divider. This is useful for breaking up content into sections.

```markdown
Lorem ipsum dolor sit amet.

{% divider /%}

Lorem ipsum dolor sit amet.
```

### Updating Navigation

The hierarchy of the side navigation is defined in `/data/`. Each top navigation item has a corresponding file,
`getting-started-data.ts`, `icerpc-core-data.ts`, etc., with Slice having two files corresponding to which Slice
encoding was selected. These files export an array that defines the pages and their order in the sidebar. The values in
the arrays are either `SideBarLink` or `SideBarCategory` types.

For example, the following values define two `SideBarLink` objects, one with the title Overview that links to
the `/docs/getting-started/index.md` page, and another called `Foo` that links to the `/docs/getting-started/foo.md`
page. This generates the sidebar for the `Getting Started` top navigation item.

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

In addition to defining the pages in the sidebar, you can also use `SideBarCategory` to define a category that contains
a list of `SideBarLink` objects.

The below array defines a `SideBarCategory` object with the title `Getting Started` that contains a link to the
"What is IceRPC?" page.

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
