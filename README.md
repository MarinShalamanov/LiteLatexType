# LiteLatexType

The big pain of writing LaTeX is the speed. Usually writing LaTeX is much slower than writing down on paper. That's wrong. The purpose of this project is to fix this issue providing superlanguage of LaTeX that compiles down to LaTeX. 

The current state is just a proof of concept (quite buggy though), written in CoffeScript, and deployed to http://marinshalamanov.com/math.html. 

Write `a/b` instead of `\frac{a}{b}` 

Write `` \i `` for an integral

Write `` sq `` for square root

Write ``sin``, ``cos``, ``ln``, ``log`` instead of  ``\sin``, ``\cos``, ``\ln``, ``\log``

# Spec

## Shorthands
LiteLaTeX |  LaTeX
--------|--------
`inf`   | `\infty`
`sq a` | `\sqrt{a}`
`sq {a+1}` | `\sqrt{a+1}`
`=>`  |   `\implies`
`<=>` |  `\iff`
`\all` | `\forall`
`sin` | `\sin`
`==` | `\equiv`
`>=` | `\geq`
`<=` | `\leq`

## Fractions

LiteLaTeX |  LaTeX
--------|--------
`a/b`   |  `\frac{a}{b}` 
`{a+b}/b`   |  `\frac{a+b}{b}` 

## System of equations

```
| a+b=2 
| a-b=4
```   

## Multiline equations
```
|x| = \
{ a+b=2 
{ a-b=4
```   

## Matrices





