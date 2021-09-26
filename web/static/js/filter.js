let filterDefinition = class FilterDefinition {
    constructor(property, binary_operator, value) {
        this.property = property
        this.binary_operator = binary_operator
        this.value = value
    }
    apply(obj) {
        return this.binary_operator(obj[this.property], this.value)
    }
}