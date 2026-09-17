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

// Cooperative initialization: extend `Base` (directly or via a mixin) and the
// class gets a static `new` constructor taking a single, fully typed config
// object — derived from the `public` properties of the class AND its mixins.
// `!` marks a config key as required.

import { mixin } from "ts-mixin-class"
import { Base } from "ts-mixin-class/base"

@mixin()
class Person {
    public firstName!: string = ""
    public lastName: string = ""
}

class Employee extends Base implements Person {
    public department: string = "Engineering"

    fullName: string = "" // not `public` — not part of the config

    override initialize(config: EmployeeConfig): void {
        super.initialize(config)

        this.fullName = `${this.firstName} ${this.lastName}`.trim()
    }
}

const employee = Employee.new({
    firstName : "Ada",
    lastName  : "Lovelace"
})

// @ts-expect-error — unknown config key
Employee.new({ firstName : "Ada", fulName : "typo" })

// @ts-expect-error — missing required `firstName`
Employee.new({ lastName : "Lovelace" })

console.log("— construction —")
console.log("fullName:  ", employee.fullName)
console.log("department:", employee.department)
console.log()
