---
title: Collections
---

# {% $markdoc.frontmatter.title %}

Lengine supports List, Sequence, Set, Map, and Stream types as default collections.

## Type of Collections


### Stream

A linked list that allows to work with lazy evaluation.

```
('cons 1 'nil)

('cons 1 #('cons 1))
```

## Manipulate your collections

Below is the example of the operations for manipulating collections.

- `head`

Returns the first element of the collection.

Usage: (head collection)

```
(def xs [1 2 3 4 5])

(println (head xs))
;;; 1
```

- `tail`

Returns a list except first element.

Usage: (tail collection)

```
(def xs [1 2 3 4 5])

(println (tail xs))
;;; (cons 2 (cons 3 (cons 4 (cons 5 nil))))
```

- `take`

Returns a list with taking first n elements.

Usage: `(take number collections)`

```
(def xs [1 2 3 4 5])

(println (take 3 xs))
;;; (cons 1 (cons 2 (cons 3 nil)))
```

- `drop`

Returns a list without first n elements.

Usage: `(drop number collections)`

```
(def xs [1 2 3 4 5])

(println (drop 3 xs))
;;; (cons 4 (cons 5 nil))
```

- `loop`

A loop operation for each elements. Note that, this would covert a value to the `lisp-body`.
Similar operation: `map`

Usage
```
(loop for var-name in collections-1
      for var-name-2 in collections-2
      ...
      lisp-body)
```

Example

```
(def xs (loop for x in (range 1 5)
      for y in (=range 1 x)
      [x y]))

(println xs)
;;; (seq (seq (seq 1 1)) (seq (seq 2 1) (seq 2 2)) (seq (seq 3 1) (seq 3 2) (seq 3 3)) (seq (seq 4 1) (seq 4 2) (seq 4 3) (seq 4 4)))
```

- `fold`

Another loop operation, but, it's to convert collections into another type of data

Usage
```
(fold collection initial-value function-2-params)
```

Example
```
(def xs [1 2 3 4 5])

(println (fold xs 0 ^((acc elem) (+ acc elem)))) ;;; or, (fold xs 0 +)
;;; 15
```

- `nil?`

A boolean operator that asks the variable is nil or not.

Usage: `(nil? value)`

```
(def xs [1 2 3 4 5])
(def xs' [])

(println (nil? xs))
(println (nil? xs'))

;;; false
;;; true
```

- `nil>`

Returns the collection's empty collection.

Usage: `(nil> value)`

Example: 
```
(def xs [1 2 3 4 5])

(println xs)
(println (fold xs (nil> xs) +:))

;;; (cons 1 (cons 2 (cons 3 (cons 4 (cons 5 nil)))))
;;; (cons 1 (cons 2 (cons 3 (cons 4 (cons 5 nil)))))
```

- `++`

Merging 2 collections

Usage: `(++ xs ys)`

- `>+`

Append an element at the front of collection

Usage: `(>+ elem collection)`

- `+<`, `+:`

Append an element at the end of the collection

Usage: `(+< collection elem)`

