---
title: Purpose of the language
---

# {% $markdoc.frontmatter.title %}

The lengine is developed for the purpose of studying programming language and byte codes such as JVM and LLVM.

Current version of compiler supports JVM at this moment, and plans to implement LLVM later. With the JVM byte code compiler, also targeting to make this language to be general purpose.

The language syntax or structures is following LISP. However, the well used keywords for variables & functions are changed to more shorter one, `def` to be variable declaration, and `fn` to be function declaration.
Also, this language is strictly immutable in terms of manipulating data. All variables declared at specific scope is immutable. This will restrict all mutable behavior, so that prevents all side effect behavior.