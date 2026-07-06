# ts-mixin-class-example

A minimal, runnable example of [`ts-mixin-class`](https://github.com/tonyboho/ts-mixin-class) —
multiple inheritance for TypeScript with native `implements` syntax and zero runtime overhead.

## ▶ Try it online

**https://stackblitz.com/~/github.com/tonyboho/ts-mixin-class-example?file=src/basic.ts**

StackBlitz installs the dependencies and runs the demos automatically. Each demo is a
small self-contained file:

- [src/basic.ts](src/basic.ts) — two mixins, native `implements`, `super`, `instanceof`
- [src/linearization.ts](src/linearization.ts) — C3 linearization on a diamond
- [src/generics.ts](src/generics.ts) — generic mixins and consumers
- [src/construction.ts](src/construction.ts) — typed config + static `new` (cooperative initialization)
- [src/bad-linearization.ts](src/bad-linearization.ts) — an impossible order, rejected
  at compile time (uncomment the class `Z` at the bottom to see the error)

### Seeing the editor without false errors

StackBlitz's in-browser editor uses its own TypeScript by default, so it shows
false red squiggles on `@mixin`, `implements`, and `super` — the transformer's
type support runs through the **workspace** TypeScript, not the bundled one.

To make the editor mixin-aware:

1. Open the command palette (`Ctrl`/`Cmd` + `Shift` + `P`).
2. Run **`TypeScript: Select TypeScript Version`**.
3. Choose **`Use Workspace Version`**.

The false red squiggles disappear.

> **Note:** hover / Quick Info still does not work in StackBlitz — its editor does
> not load the transformer's language-service plugin
> ([stackblitz/webcontainer-core#1142](https://github.com/stackblitz/webcontainer-core/issues/1142)).
> For the complete editor experience (hover, go-to-definition, mixin-aware
> diagnostics), clone this repo and open it in local VS Code.

## Run locally

```shell
npm install
npm start
```

`npm install` patches the local TypeScript via `ts-patch` (the `prepare` script), and
`npm start` compiles the demos with `tspc` and runs them with Node.

Expected output:

```
— basic —
describe:               Ada (age 2ms)
instanceof Named:       true
instanceof Timestamped: true

— linearization (C3) —
order: Combined > Left > Right > Root

— generics —
getValue(): 42

— construction —
fullName:   Ada Lovelace
department: Engineering
```

To see the compile-time rejection of an impossible mixin order, uncomment the class `Z`
at the bottom of [src/bad-linearization.ts](src/bad-linearization.ts) and rebuild:

```
src/bad-linearization.ts(42,20): error TS990007: Cannot linearize mixin classes
with the C3 algorithm. Requested mixins: X, Y. Conflicting order requirements:
A -> B; B -> A. ...
```

## Learn more

- Main project & docs: **https://github.com/tonyboho/ts-mixin-class**
- npm: **https://www.npmjs.com/package/ts-mixin-class**
