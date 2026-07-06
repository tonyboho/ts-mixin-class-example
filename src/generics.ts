// Generics: both mixins and consumers can be generic, with full inference —
// no `Constructor<T>` factory workarounds.

import { mixin } from "ts-mixin-class"

@mixin()
class StoredValue<T> {
    value: T | undefined

    getValue(): T | undefined {
        return this.value
    }
}

class Box<T> implements StoredValue<T> {
    constructor(value: T) {
        this.value = value
    }
}

const box = new Box(42) // Box<number>, inferred from the argument

// `getValue()` is typed through the generic mixin
const value: number | undefined = box.getValue()

console.log("— generics —")
console.log("getValue():", value)
console.log()
