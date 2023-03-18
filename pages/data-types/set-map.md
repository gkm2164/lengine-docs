---
title: Set and Map
---

# {% $markdoc.frontmatter.title %}

## Set

An unordered collection. Fast at adding element & checking element is in the collection.

```
(set [1 2 3 4 5])
```

## Map - a hashed object

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