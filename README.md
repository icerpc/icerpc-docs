# IceRPC Docs

- [Build Requirements](#build-requirements)
- [Building](#building)

## Build Requirements

You'll need Node.js and npm installed to build the documentation site. To install node, it is recommended to follow
the guide provided by Node.js [here](https://nodejs.org/en/download/package-manager/#macos).

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

**Tags** are the main syntactic extension that Markdoc adds on top of Markdown. Each tag is enclosed with `{%` and `%}`
and includes the tag name, attributes, and content body. Tags allow for creating custom components that can
be used in the documentation.

- [Title](#title)
- [Side-by-side](#side-by-side)
- [Divider](#divider)
- [Grid](#grid)
- [Cards](#cards)
- [Flow](#flow)

### Title

The `title` tag dynamically sets the page's title. This is useful for pages that have descriptions or breadcrumbs.
Generally, each page should begin with a title tag.

Notably, the title tag pulls the data automatically from the page's frontmatter. For example, this means it will only
show the description if the page's frontmatter specifies the description. Since the title tag pulls the data from the
frontmatter and does not have any "children", you can use the self-closing syntax for tags.

```markdown
---
title: Lorem ipsum dolor sit amet.
description: Lorem ipsum dolor sit amet.
---

{% title /%}

...
```

### Side-by-side

The `side-by-side` tag is used to create columns of content that are side-by-side. The content is split by a vertical
divider. The first item in the content is placed in the left column, and the second item is placed in the right column.
In the below example, the python codeblock would be placed in the left column while the text would be placed in the
right column.

````markdown
{% side-by-side %}

```python
def hello(name):
  print("Hello " + name + "!")
```

Lorem ipsum dolor sit amet.

{% /side-by-side %}
````

### Divider

The `divider` tag is used to create a horizontal divider. This is useful for breaking up content into sections.

```markdown
Lorem ipsum dolor sit amet.

{% divider /%}

Lorem ipsum dolor sit amet.
```
