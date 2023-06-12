---
title: Numeric data types
---

# {% $markdoc.frontmatter.title %}

Numeric data is one of basic requirements for any computer programming languages.
The programming language, basically should be able to handle various kind of data types, when it comes to numeric data.

This section, will show you what kind of numeric data can be handled with lengine.

## Primitive Number Types 

Primitive types are the types that are compatible with native java languages. Though, most of all data types are compatible with it, this one is using exactly same data type of JVM languages.

### Integer type

Let's start with integer type. Integer type in Lengine is basically, 8 bytes(64-bits). It is corresponds to `long` type in java. However, this one, especially, uses boxed type usually, `java.lang.Long`

Basically, all kind of integer numeric data is handled with this integer type.

```
;;; example of integer number
0
10
-10
#16rA   ;; hex representation of number 10
#2r1010 ;; binary representation of number 10
```

The supporting operators are as follows.

```
+, -, *, /, rem : Basic 4 operations, Add, Subtract, Multiplication, Division, and Remainder.

(+ 3 5) = 8
(- 5 3) = 2
(* 3 5) = 15
(/ 6 3) = 2
(rem 3 2) = 1

&, |, ~ : Binary "and", "or", "negation" operations.
(& 5 10) = 0
(| 5 10) = 15
(~ 0) = -1

```

### Double Number

Double is 64-bits floating points. 

```
0.15
2e10
```

Supported operators:
```
+, -, *, /, rem
```

## Complex Type

Complex type is combination of primitive types. At the JVM level, this one is not supported with primitive types, but, is capsulated with some class types.

### Ratio Number

Ratio number is represent as `Integer/Integer` form. For example, `3/5` is `0.6`. This type is to preserve loss of fractions, and assure precise numbers. However, 

```
3/5
```

Supported operators
```
+, -, *, /:
```

### Complex Number

Complex number is composed of real / imagination numbers

```
#C(1 2)  ;;; 1 + 2i, real number is 1, and imagination number 2
```

Supported operators

```
+, -, *, /:
```