---
title: Tail recursion optimization
---

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
