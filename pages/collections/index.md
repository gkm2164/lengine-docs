---
title: Collections
---

# {% $markdoc.frontmatter.title %}

Lengine supports List, Sequence, Set, Map, and Stream types as default collections.

## Type of Collections

### List

#### 1. Define a list

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

#### 2. Empty list

The empty list can be represented with either `[]` or `nil`.

Below are the example of usages.

```
(module empty-list)

(def xs nil)
(def ys [])

(def xs' (cons 1 xs))
(def ys' (cons 1 ys))

;;; And, below shows "PASSED"

(assert-equals "Should be identical" xs' ys')
;;; Will print "PASSED: Should be identical"
```

### Sequence

Sequence is doubly linked list. Above list is fast at adding/removing from head of element, Sequence is fast at both front and rear.

```
(seq [1 2 3 4 5])
```

Below would shows a significant different at performance.

```
(module list-seq-comparison)

(require "collections")

(def list-x nil)
(def seq-x (seq nil))

(println (fold (range 0 1000) list-x +:)) ;;; Adding element 
(println (fold (range 0 1000) seq-x +:))
```

`range` takes 2 integer `a` and `b`, and generate a number sequence starting from `a` to `b`, and `b` is excluded. So, this will generate number sequence within `a <= x < b`. Later will discuss the utility functions, but, to generate an inclusive range, you can call `=range` function.

`+:` is an operation which takes 2 parameters, collection, and any types. It returns a collection that attaches the element at last.

So, running `fold` operation will attach number sequence from 0 to 1000 at either `list-x`(single linked list), and `seq-x`(double linked list).

The characteristic of single linked list is that the reference of the list is stored with just head of the element, and it is connected with a reference to next element. So, whenever adding an element at last means that always starting from first element, and look for the location of `nil`, and put element on there. The time complexity became O(n) for each elements, so, for above case, O(n^2).


But, sequence type is double linked list, and it means that the sequence knows the beginning of list, and end of list. This means that adding last operation doesn't require complexity more than constant time.

So you would notice that first line would take some time to be printed, but, second line would show up at pretty faster time.

### Set

An unordered collection. Fast at adding element & checking element is in the collection.

```
(set [1 2 3 4 5])
```

### Hashed Object

A hash map

```
;;; Object
{
  :id 7
  :name "James Bond"
  :email "jamesbond007@secretagent.com"
}
```

access

```
(def person {
  :id 7
  :name "James Bond"
  :email "jamesbond007@secretagent.com"
})

(println (:name person))
;;; == "James Bond"
```

Note that `:name` is a function which takes 1 parameter.

### Stream

A linked list that allows to work with lazy evaluation.

```
('cons 1 'nil)

('cons 1 #('cons 1))
```

## Manipulate your collections

- `head`
- `tail`
- `take`
- `drop`
- `loop`
- `fold`
- `reduce`

- `nil?`
- `nil>`