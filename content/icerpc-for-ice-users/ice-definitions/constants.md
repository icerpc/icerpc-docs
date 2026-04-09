---
title: Constants and literals
---

An Ice constant is mapped to a C# static class with the same name. The generated class contains a constant named
`Value` that holds the value of the constant. For example:

{% aside alignment="top" %}

```ice
const bool AppendByDefault = true;
const byte LowerNibble = 0x0f;
const string Advice = "Don't Panic!";
const short TheAnswer = 42;
const double PI = 3.1416;

enum Fruit { Apple, Pear, Orange }
const Fruit FavoriteFruit = Pear;
```

```csharp
public static class AppendByDefault
{
    public const bool Value = true;
}

public static class LowerNibble
{
    public const byte Value = 15;
}

public static class Advice
{
    public const string Value = "Don't Panic!";
}

public static class TheAnswer
{
    public const short Value = 42;
}

public static class PI
{
    public const double Value = 3.1416;
}

public enum Fruit { Apple, Pear, Orange }

public static class FavoriteFruit
{
    public const Fruit Value = Fruit.Pear;
}
```

{% /aside %}
