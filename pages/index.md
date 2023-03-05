---
title: Lengine Introduction
description: Introduction of Lengine language / compiler
---

# Lengine Introduction

Lengine is a language which based upon LISP. All code can be built upon JVM binary code, and also executes on the JVM machine directly.

## Install and first code

First, clone this repo and install the dependencies required:

```bash
$ git clone https://github.com/gkm2164/lengine
```

Then, build lengine parser/compilers

```bash
$ cd lengine
$ ./install.sh
```

Will generate some files here. Now, let's write some simple code and build.

Create a file named `hello.lg`, and open it.

Now, type below statements.

```lisp
;;; hello.lg
(module hello)

(println "Hello, World!")
```

first line, ;;; is to write down some comment. You can use the character `;` throughout the codes to leave any comments.

2nd line, module is compiler directive, and it lets compile know that this is built in this module name. Will discuss this later, but, the compiler takes this as class name.

Last, it will print "Hello, World!" to the console.

Let's build it and execute.

```
$ ./lenginec hello.lg
$ ./leng hello
Hello, World!
```

Since the LISP is for efficient list processing language, let's use some of examples here. Again, let's open the hello.lg file, and make some changes on there.

```
(module hello)

(require "collections")

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