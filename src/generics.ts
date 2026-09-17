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
