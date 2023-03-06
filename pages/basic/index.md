---
title: Basic of Lengine
---

# {% $markdoc.frontmatter.title %}

Lengine is functional programming language. The definition of functional programming language could be different, but, these days, 1) it doesn't have side effects(or disoriented), and 2) function is a first class object. Lengine doesn't have any side effect. The developer with lengine can define variables, but, most of the variables are basically immutable. However, there are few side effects for I/O handling, and some error handling mechanisms(try/recover). Also, in lengine, function is all that matter.

## Data types

Before get into actual codes, let's take a look what kind of data types are supported. Lengine divides into 2 groups, 1) Primitive types, 2) Collection types.

### Primitive Types

Primitive Type is basic data type to manipulate data.

#### Boolean Type

Boolean type is binary data, only has `true` and `false`. This data type is only 1 byte.

```
;;; example of boolean value
false
true
```

#### Char Type

Char type is basic element of String, but, also can be changed into integer numbers as well. Usually, char type is 2 bytes. The ranges are from `0` ~ `65536`.
`0x0000` ~ `0xFFFF`

```
;;; example of character type
#\a   ;;; 'a'
#\b   ;;; 'b'
#\0   ;;; '0'. Note that '0' is different with 0
```

There's also special character types, such as, space, and linefeed.

```
#\Backspace     ;;; backward delete
#\Tab           ;;; tab
#\Linefeed      ;;; line feed - map with \4
#\Page          ;;; usually, 2 lines of enter
#\Space         ;;; space
#\Return        ;;; \n
#\Rubout        ;;; forward delete
```

#### Integer Number

Integer type is 64-bits integers, and signed number.

```
;;; example of integer number
0
10
-10
#16rA   ;; hex representation of number 10
#2r1010 ;; binary representation of number 10
```

#### Double Number

Double is 64-bits floating points.

```
0.15
2e10
```

### Complex Type

Complex type is compose of primitive types.

#### Ratio Number

Ratio number is represent as `Integer/Integer` form. For example, `3/5` is `0.6`. This type is to preserve loss of fractions, and assure precise numbers. However, 

```
3/5
```

#### Complex Number

Complex number is composed of real / imagination numbers

```
#C(1 2)  ;;; 1 + 2i, real number is 1, and imagination number 2
```

#### String

String is compose of Character type.

```
""
"abcdef"
"Something"
```

### Collection Types

This will be discussed separately under section [Collections](./collections)

## Define of variables

To define a variable, you should use `def` keyword.

```lengine
;;; variable.lg
(module variables)

(def x 3)
(def y 5)

(println (+ x y))
```

Above example shows how to define variable x & y, and use it under 

## Lazy evaluations

```lengine
(def x (lazy (some-def)))
;;; ==
(def x #(some-def))


(def y (force x))
;;; ==
(def y !(x))
```