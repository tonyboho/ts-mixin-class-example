// An impossible mixin order — rejected at COMPILE TIME.
//
// `X` fixes the order A-before-B, `Y` fixes the opposite. A class consuming
// both has no valid C3 linearization. Runtime mixin libraries silently pick
// some order; ts-mixin-class refuses to compile it and explains why.
//
// UNCOMMENT the class `Z` at the bottom, and the compiler (and the editor,
// with the workspace TypeScript selected) will show:
//
//   error TS990007: Cannot linearize mixin classes with the C3 algorithm.
//   Requested mixins: X, Y. Conflicting order requirements: A -> B; B -> A.
//   This means the mixins require incompatible inheritance order ...
//   Fix it by changing the implements order, removing one conflicting mixin,
//   or splitting the incompatible mixins.

import { mixin } from "ts-mixin-class"

@mixin()
class A {
    a(): string {
        return "A"
    }
}

@mixin()
class B {
    b(): string {
        return "B"
    }
}

// X fixes the order A-before-B
@mixin()
class X implements A, B {}

// Y fixes the opposite order B-before-A
@mixin()
class Y implements B, A {}

// Z asks for both X and Y — an impossible order. Uncomment to see the error:

// class Z implements X, Y {}
