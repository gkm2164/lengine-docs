---
title: Basic of Lengine
---

# {% $markdoc.frontmatter.title %}

Lengine is functional programming language. The definition of functional programming language could be different, but, these days, 1) it doesn't have side effects(or disoriented), and 2) function is a first class object. Lengine doesn't have any side effect. The developer with lengine can define variables, but, most of the variables are basically immutable. However, there are few side effects for I/O handling, and some error handling mechanisms(try/recover). Also, in lengine, function is all that matter.

## Data types

Before get into actual codes, let's take a look what kind of data types are supported. Lengine divides into 2 groups, 1) Primitive types, 2) Collection types.

### Primitive Types

Primitive Type is basic data type to manipulate data.

#### Boolean Type

Boolean type is binary data, only has `true` and `false`. This data type is only 1 byte.

```
;;; example of boolean value
false
true
```

#### Char Type

Char type is basic element of String, but, also can be changed into integer numbers as well. Usually, char type is 2 bytes. The ranges are from `0` ~ `65536`.
`0x0000` ~ `0xFFFF`

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

#### Integer Number

Integer type is 64-bits integers, and signed number.

```
;;; example of integer number
0
10
-10
#16rA   ;; hex representation of number 10
#2r1010 ;; binary representation of number 10
```

#### Double Number

Double is 64-bits floating points.

```
0.15
2e10
```

### Complex Type

Complex type is compose of primitive types.

#### Ratio Number

Ratio number is represent as `Integer/Integer` form. For example, `3/5` is `0.6`. This type is to preserve loss of fractions, and assure precise numbers. However, 

```
3/5
```

#### Complex Number

Complex number is composed of real / imagination numbers

```
#C(1 2)  ;;; 1 + 2i, real number is 1, and imagination number 2
```

#### String

String is compose of Character type.

```
""
"abcdef"
"Something"
```

### Collection Types

This will be discussed separately under section [Collections](./collections)

## Define of variables

To define a variable, you should use `def` keyword.

```lengine
;;; variable.lg
(module variables)

(def x 3)
(def y 5)

(println (+ x y))
```

Above example shows how to define variable x & y, and use it under 

## Lazy evaluations

```lengine
(def x (lazy (some-def)))
;;; ==
(def x #(some-def))


(def y (force x))
;;; ==
(def y !(x))
```

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

### Recursion

One of beauty of the functional programming is that the developers can maximize the use of recursion. Let's take a moment for implementing factorial.

In mathematics, factorial is denoted as `n!`, and it's value is `n * (n - 1) * (n - 2) * ... * 1`.

If you are familiar with imperative programming, the factorial can be implemented as follows.

```c++
int ret = 1;
int n = 0;
cin >> n;

for (int i = 2; i < n; i++) {
    ret *= i;
}

cout << ret << endl;
```

In lengine, there's no such loop, but, it has recursion.

```lengine
(fn fact (n) 
  (if (= n 1) 1
      (* n (fact (- n 1)))))
```

So, if you run `(fact 5)`, it will exactly show the `120`.

However, it's not actually working as a loop, but, function.
Here's how the above code is represented

```jvm
0  FACT:
1     ALOAD 0
2     ICONST_1
3     DO_EQ
4     IFNE RET
5     ALOAD 0
6     ALOAD 0
7     ICONST_1
8     ISUB
9     CALL FACT   ;;; In this position, the stack will persist return address on next instruction, and will accumulate it.
10    IMULT
11    GOTO FACT
12 RET:
13    ICONST_1
14    ARETURN

```

Above logic requires a stack growth until it can calculate the desired result. From 1 till 8, the stack is grown. Fortunately, from 1 ~ 4, the stack became 0. But, from 5 ~ 9, even 6 ~ 8 reduces stack into 1, still, line number 5, 8, 9 requires additional stack. So technically, 3 stack spaces are keep accumulated for making any recursive calls which means that the program eventually finished with errors.

The next section would present how this can be optimized, and be an alternative for while loop.

### Tail recursion

The problem of previous lengine code is that it will eventually overflowing the stack, as the function call requires stack to be growth.
Most of the programming language requires 1 additional memory space to have return address. But, if a calling itself is located at the return position, the compile optimize it to not accumulating stack, but, override current activation record.

Let's take a look below example.

```
(fn recursion ()
    (resursion))
```

Above logic in lengine, will convert it into `while` loop, and will run forever without any stack overflowing.

To use it at above example, the fact-loop should place another function call at the beginning of clause.

```
(fn fact-loop (acc n)
    (if (= n 1) acc
        (fact-loop (* acc n) (- n 1))))
```

Above logic will exactly converted into loops.

Below is the example of the JVM assembly representation of code.

```jvm
FACT_LOOP:
    ALOAD 1        ;;; Parameter location
    ICONST_1
    IEQ            ;;; do equals operation
    IFNE RET       ;;; stack 0
    ILOAD 0        ;;; [acc]
    ILOAD 1        ;;; [acc n]
    IMULT          ;;; [(* acc n)]
    ASTORE 0       ;;; []
    ILOAD 1        ;;; [n]
    ICONST_1       ;;; [n 1]
    ISUB           ;;; [(- n 1)]
    ASTORE 1       ;;; []
    GOTO FACT_LOOP ;;; !!
RET:
    ALOAD 1
    ARETURN
```

Now, only we have GOTO which goes to FACT_LOOP without accumulating any stacks.

Likewise, if you write a code with `tail recursion`, then the lengine compiler would optimize it as non-stack accumulating one, but, use on limited number of variable locations.

As the recursion is one of important things in functional programming, the lengine provides a simple notation to call itself, `$`.

Above recursion function can be simplied into below form.

```
(fn recursion ()
    ($))
```

Then, the compiler would notice a symbol `$` as `recursion`, and would call itself.

## Define of module, export, import, require

Now, moving into another phase.
On the real world, as the service's scale getting larger, the codes cannot be written in to one file, since more than one developer involves into the project. Also, modularizing a service makes it easier to publish it as library, and use it.

In this section, let's assume that we're about to build some library, and importing from some logics.

### Important compiler directives

Before moving into actual explanation, let's take a look for 4 directives needs to make your code as a library module.

- `module`

Usage: `(module name.with.separating.dot)`

Module declarative is to give a module's name. This one is similar to java's approach.

Below one will create a class namely, `hello`.

```
(module hello)
```

Now, if you want to give some package name,

```
(module a.hello)
```

Above one will create a folder `a`, and inside `a`, it will put `hello.class` file there.

- `export`

Export is to expose a variable or a method to other modules.

Let's take a look this example

```
(module hello)

(fn adder-3 (a b c) ((+ a b) c))

(export adder-3)

(export magic-number 30)

(export sub-3 ^((a b c) (- (- a b) c)))

(export sigma ^((n) 
    (if (< n 1) 0
        (+ n ($ (- n 1))))))
```

Above code shows how to export 3 different kind of ways.

First one is to export a pre-defined function to outside of the module.

Second line is to export a value 30 as symbol name `magic-number`.

Third line is to export lambda which is subtract `b` and `c` from `a`.

Forth export is to export a lambda that do some recursion.

- `import`

Now, with above module/exported, let's import the symbols.

Import is to get a symbol individually, not importing entire modules.

Let's prepare one example module to export

```
;;; Filename: hello-module-exports.lg
(module hello-module-exports)

(export hello ^((msg) (printf "Hello, %s!\n" [msg])))
```

And with above module, let's import from another module here.

```
;;; Filename: hello-module-imports.lg
(module hello-module-imports)

(import hello-module-exports.hello)

(hello "Lengine")
```

And, let's compile both file individually.

```
$ ./lenginec hello-module-exports.lg
$ ./lenginec hello-module-imports.lg
```

And you would be able to see few class files are generated from currently working directory.


And now, let's execute the consuming script.

```
$ ./leng hello-module-imports
Hello, Lengine!
```

However, importing a library individually is exhaustive for developers.

- `require`

Above example is for individually importing the files. How about you want to import entire exported symbols to this script?

```
(module hello-module-imports)

(require "hello-module-exports")

(hello "Lengine")
```

Actually, whenever you compile your code, the code automatically imports one big library file, `lengine-code/prelude.lg`.

Please note that, the behvaior of export/import are much similar to the script languages, which means that if you imports more and more, running your scripts could take a bit longer.

This part needs to be improved by importing the variables when it is actually called, and under development.

### Use of directives

```lengine
;;; my-adder.lg
(module my-adder)

;;; Limitation of `+` operation is that, it only takes 2 parameters. I want 3!
(fn adder-3 (a b c) (+ (+ a b) c))

(export adder-3)

(export magic-number 10293848576)
```

```lengine
;;; main.lg
(module main)

(import my-adder.adder-3)

(println (adder-3 1 2 3))
;;; 6
```

```lengine
;;; main-2.lg
(module main)

(require "my-adder")

(println magic-number)
;;; 10293848576
(println (adder-3 1 2 3))
;;; 6
```