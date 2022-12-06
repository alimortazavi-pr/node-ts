import autoBind from "auto-bind";

abstract class Validator {
    constructor(){
        autoBind(this)
    }
}

export default Validator;
