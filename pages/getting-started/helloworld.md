---
title: Hello, Lengine!
---

# {% $markdoc.frontmatter.title %}

Now, let's write some simple code and build.

Create a file named `hello.lg`, and open it.

Now, type below statements.

```lengine
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

Congratulation! You just wrote your first lengine script, and run it.