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
