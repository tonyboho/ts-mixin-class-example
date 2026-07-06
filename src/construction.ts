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
