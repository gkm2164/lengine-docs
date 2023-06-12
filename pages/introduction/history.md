---
title: Brief History and development
---

# {% $markdoc.frontmatter.title %}

Lengine was firstly initiated on October of 2019(see first commit [here](https://github.com/gkm2164/lengine/commit/07b723061c7d2ffa64bb0d2ce9565f882ee590d4)). The project was initiated to learn monad at Scala languages, and JVM binary codes.

The idea of lexer & parser was came from a [Java-doc creator project](https://github.com/gkm2164/java-doc-creator). At that time, it basically used Trie logic for lexing, and state monad for parsing. Skipping to explain Trie logic, but, with state monad, thanks to Scala's `for` statement, it was easily achieve the DSL like writing of syntax.

```scala
for {
    modifier <- parseModifier
    _ <- takeToken("class")
    clsName <- takeToken[AnyToken]
    body <- parseClassBody
} yield ClassBody(modifier, clsName, body)
```

For the LISP languages, the way to parse a sentence is quite easy, as it is starts any statements with left parenthesis, and ends with right parenthesis. Of course, it's possible to only use any symbol as a statement, but, since it doesn't have any effect, assumes to have only function calls.