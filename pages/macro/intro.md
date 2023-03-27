---
title: Introduction to Macro
---

# {% $markdoc.frontmatter.title %}

Macro is a one of compiler directives along with `module`, `import`, `export`, and `require`. However, it is one of powerful, in terms of giving developers to think out of syntax definitions in this websites. Although, the result of macro should be compiled, but, before that, you can define your own syntax.

Let's take a look with few examples.

## Simple hello world

```
(defmacro hello (,my ,name ,is varname)
    (printf "Hello, %s\n" [varname]))

(hello my name is "Gyeongmin")
```

Above example shows how to use `defmacro`

Comma(,) is to denote the compiler that the symbol name should be literally that name. So, even compiler recognize `my`, `name`, and `is`, those are should be a part of pattern matching.

Also, note that, all `hello`, `my`, `name` and `is` are dispeared after conversion is done, and only remains macro body, `(printf "Hello, %s\n", ["Gyeongmin"])`

```
(defmacro print-fmt (fmt args*)
    (printf fmt args))

(print-fmt "Hello, %s and %s\n" "A" "B")
```

Above is var-args feature. the variable `args*` is collecting all args at the beginning of the element into list type.
This way, you don't need to define multiple functions to accept variable length of parameters.

```
(defmacro adds (num*)
    (fold num 0 +))

(println (adds 1 2 3 4 5))
```

Above is to define adding variable number of numbers. As you can notice, all numbers 1, 2, 3, 4, 5 is aggregated into a list type.