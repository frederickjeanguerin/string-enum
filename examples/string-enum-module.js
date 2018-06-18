// MIME problem when importing .mjs
// import StringEnum from "../dist/string-enum.mjs";
import StringEnum from "../dist/string-enum-module.js";
const foo = StringEnum("Hello", "World");
document.querySelector("h1").innerHTML = `${foo.Hello} the ${foo.World}!`;
