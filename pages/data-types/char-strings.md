---
title: Character and strings
---

# {% $markdoc.frontmatter.title %}

### Char Type

Char type is basic element of String, and, it can be turned into integer numbers as well. Usually, char type is 2 bytes. The ranges are from `0` ~ `65536`, which is, `0x0000` ~ `0xFFFF`

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



#### String

String is compose of Character type.

```
""
"abcdef"
"Something"
```

String is also, can be interpreted as collection of characters, which means that it can be manipulated with many other collection operations.