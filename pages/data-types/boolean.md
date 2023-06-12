---
title: Boolean data type
---

# {% $markdoc.frontmatter.title %}

Boolean type is binary data, only has `true` and `false`. This data type is only 1 byte.

```
;;; example of boolean value
false
true
```

This data type is used for denoting a result of condition, so that it can be used when running any branch statements, such as, `if` statement. The operations yields this boolean types are typically, a comparison operators.

```
(> 3 5) ;;; 3 > 5 ?, and the answer is false
(= 3 5) ;;; 3 = 5 ?, and the answer is false
(< 3 5) ;;; 3 < 5 ?, and the answer is true
(/= 3 5) ;;; 3 /= 5 ? , and the answer is true

;;; use of above example

(if (< 3 5)
    (println "Yeah, 3 is less than 5!")
    (println "What? 3 should be less than 5!"))

;;; Result: Yeah, 3 is less than 5!
```

Since a program is to behave along some inputs, and with some inputs which gives different behavior is decided by these kind of condition statements, this data type is defined as somewhat primitive types.
