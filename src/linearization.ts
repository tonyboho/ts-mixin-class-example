// ⚠ BEFORE YOU START
//
// 1. Trying this example locally? Don't forget to run `npm run prepare`
//    (see the Setup section of the README:
//    https://github.com/tonyboho/ts-mixin-class#setup).
//
// 2. Select the workspace TypeScript version in VS Code / StackBlitz,
//    otherwise the editor shows false errors on @mixin / implements / super:
//
//    Ctrl/Cmd+Shift+P -> "TypeScript: Select TypeScript Version" -> "Use Workspace Version".
//
//    (Hover / Quick Info still won't work in StackBlitz — it doesn't load
//    the language-service plugin; clone locally for the full experience.)

// C3 linearization on a diamond: `Left` and `Right` both build on `Root`,
// `Combined` uses both. The transformer computes the same method-resolution
// order Python uses — every mixin appears exactly once, a consumer always
// precedes its mixins, and the local `implements` order is preserved.

import { mixin } from "ts-mixin-class"

@mixin()
class Root {
    print(): string {
        return "Root"
    }
}

@mixin()
class Left implements Root {
    print(): string {
        return `Left > ${super.print()}`
    }
}

@mixin()
class Right implements Root {
    print(): string {
        return `Right > ${super.print()}`
    }
}

class Combined implements Left, Right {
    print(): string {
        return `Combined > ${super.print()}`
    }
}

console.log("— linearization (C3) —")
console.log("order:", new Combined().print())
// Combined > Left > Right > Root — Root deduplicated, called once
console.log()
