### Get your Classes defined now! 
<sup><sup>(idk what I'm doing)</sup></sup>


Defining getter and setter has never been easier before:

```ts
import { def, undef } from "get-defined"

class Test {
  name = "";
  age = 0;
  alive = true;
}

const test = def(Test);

test.setName("hey");

console.log(test.getName()); // "hey"

const test_undef = undef(test)

console.log(test_undef.getName()) // Error: test_undef.getName is not a function.
```

Don't ask questions and start defining your classes!

FULLY TYPED, READY FOR PROD!!!