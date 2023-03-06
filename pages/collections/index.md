---
title: Collections
---

# {% $markdoc.frontmatter.title %}

Lengine supports List, Sequence, Set, Map, and Stream types as default collections.

## List


Since the LISP is for efficient list processing language, let's use some of examples here.

Again, let's open the hello.lg file, and make some changes on there.

```
(module hello)
(require "collections")
```

To use collections, 

```
(def xs [1 2 3 4 5])

(println (fold xs 0 +))
```

To use collection types, you should import all `collections`.

At third line, `def` is to define a new variable.
It will define a variable name `xs`, and the value is `[1 2 3 4 5]`

Underlied implementation of list is single linked list, and you can decalre it with below.

```
;;; [1 2 3 4 5] equivalent representation
(cons 1 (cons 2 (cons 3 (cons 4 (cons 5 nil)))))
```

The 4th line is to run `fold` operation. `fold` is to aggregate all elements in collections with an operation. `+` is a function takes 2 parameters, and return a value which add them.

So, `fold` would repeatedly add all the element starting from `0`.

```
$ ./lenginec hello.lg
$ ./leng hello
15
```