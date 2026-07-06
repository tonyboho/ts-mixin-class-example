# ts-mixin-class-example

A minimal, runnable example of [`ts-mixin-class`](https://github.com/tonyboho/ts-mixin-class) —
multiple inheritance for TypeScript with native `implements` syntax and zero runtime overhead.

## ▶ Try it online

**https://stackblitz.com/~/github.com/tonyboho/ts-mixin-class-example?file=src/main.ts**

StackBlitz installs the dependencies and runs the demo automatically. The terminal
prints the result of composing mixins, C3 linearization, `instanceof`, and generics.

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
`npm start` compiles [src/main.ts](src/main.ts) with `tspc` and runs it with Node.

Expected output:

```
label:                 Ada
describe:              Ada (age 1ms)
instanceof Named:      true
instanceof Timestamped: true

C3 order:              Combined > Left > Right > Root

generic getValue():    42
```

## What it shows

- two mixins composed into a class with native `implements`,
- `super` calls reaching into the mixin chain,
- C3 linearization on a diamond,
- `instanceof` on mixins,
- generics.

## Learn more

- Main project & docs: **https://github.com/tonyboho/ts-mixin-class**
- npm: **https://www.npmjs.com/package/ts-mixin-class**
