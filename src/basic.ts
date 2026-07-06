// NOTE: In StackBlitz the editor may show false red squiggles on @mixin /
// implements / super — its bundled TypeScript doesn't run the transformer.
// Fix: open the command palette (Ctrl/Cmd+Shift+P) -> "TypeScript: Select
// TypeScript Version" -> "Use Workspace Version", and they disappear.
// (Hover / Quick Info still won't work here — StackBlitz doesn't load the
// language-service plugin; clone locally for the full editor experience.)
// The code compiles and RUNS correctly regardless — see the terminal output.
//
// Each demo is a small self-contained file:
//
//   src/basic.ts             — two mixins, native `implements`, super, instanceof
//   src/linearization.ts     — C3 linearization on a diamond
//   src/generics.ts          — generic mixins and consumers
//   src/construction.ts      — typed config + static `new` (cooperative init)
//   src/bad-linearization.ts — an impossible order, rejected at compile time

// Basic composition: two independent mixins combined with the native
// `implements` keyword. `super` reaches into the mixin chain, `instanceof`
// recognizes the mixins.

import { mixin } from "ts-mixin-class"

@mixin()
class Named {
    name: string = "Ada"

    label(): string {
        return this.name
    }
}

@mixin()
class Timestamped {
    createdAt: Date = new Date()

    age(): number {
        return Date.now() - this.createdAt.getTime()
    }
}

class User implements Named, Timestamped {
    describe(): string {
        return `${super.label()} (age ${super.age()}ms)`
    }
}

const user = new User()

console.log("— basic —")
console.log("describe:              ", user.describe())
console.log("instanceof Named:      ", user instanceof Named)
console.log("instanceof Timestamped:", user instanceof Timestamped)
console.log()
