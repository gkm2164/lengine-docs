---
title: Defining and calling functions
---

# {% $markdoc.frontmatter.title %}

## Define a function

### Definition of functions
Function is first class of any functional programming languages.

```lengine
;;; function.lg
(module function)

(fn adder (x y) (+ x y))
```

The `adder` is defined as function, and have equivalent definitions. For here, we can define a function as a variable where the value is a function, which means that we can define any function, that just behaves as if it is a value, and it is called to be `lambda`.

```lengine
(lambda (x y) (+ x y))
```

Each lambda doesn't have their name, but, just behaves as if it is a value. To give a name to lambda, we can use `def` here.

So, with the defintion of function in lambda, below 2 are identical.

```
(fn adder (x y) (+ x y))
(def adder (lambda (x y) (+ x y)))
```

The difference between function and lambda is that the function assumes that it has a name when define it. For example, let's modify above code a bit.

```
(module failure-compile)

(require "collections") ;;; to use head / tail

;;; Below is compiled
(fn adders (acc xs)
    (if (nil? xs) acc
        (adders (+ acc (head xs)) (tail xs))))


;;; Below is not able to compiled, and will fail with saying not found adders'
(def adders' (lambda (acc xs) 
    (if (nil? xs) acc
        (adders' (+ acc (head xs)) (tail xs)))))
;;; [ERROR]: Unable to resolve: adders' at compile-example/failure-compile.lg:14:10

```

Above code shows the difference of it.

### Short version of lambda

Now, the lambda can be shorten with the character `^`. Let's take a look following example again.

```
(lambda (x y) (+ x y))
```

The above one is identical with below

```
^((x y) (+ x y))
```

So, above `adder` variable with lambda definition can be re-written in below form.

```
(def adder ^((x y) (+ x y)))
```


### Calling function

As you notice from the introduction, the way to function call is made with clause, `(<function> param1 param2 ... paramn)`.

In the place of function, any function value can be in.

For example, to use a function defined above,

```
(adder 3 5)
```

We can make a call as above way. However, sometimes, we want to define a one-time use function, and now lambda came up.

```lengine
(^((x y) (+ x y)) 3 5)
```

This one is useful, when you define a function that has child function.
