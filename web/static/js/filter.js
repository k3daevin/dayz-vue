let filterDefinition = class FilterDefinition {
    constructor(property, binary_operator, value) {
        this.property = property
        this.binary_operator = binary_operator
        this.value = value
    }
    apply(obj) {
        return this.binary_operator.func(obj[this.property], this.value)
    }
}

let binaryOperator = class BinaryOperator {
    constructor(name, func) {
        this.name = name
        this.func = func
    }
}

const binaryOperatorsBase = {
    '<': (objvalue, defvalue) => objvalue < defvalue,
    '>': (objvalue, defvalue) => objvalue > defvalue,
    '==': (objvalue, defvalue) => objvalue == defvalue,
    '<=': (objvalue, defvalue) => objvalue <= defvalue,
    '>=': (objvalue, defvalue) => objvalue >= defvalue,
    '!=': (objvalue, defvalue) => objvalue != defvalue,
    'text_equals': (objvalue, defvalue) => objvalue == defvalue,
    'text_not_equals': (objvalue, defvalue) => objvalue != defvalue,
    'text_contains': (objvalue, defvalue) => objvalue.includes(defvalue),
    'text_not_contains': (objvalue, defvalue) => !objvalue.includes(defvalue),
    'array_contains': (objvalue, defvalue) => objvalue.includes(defvalue),
    'array_not_contains': (objvalue, defvalue) => !objvalue.includes(defvalue),
    'has_flag': (objvalue, defvalue) => objvalue[defvalue],
    'has_not_flag': (objvalue, defvalue) => !objvalue[defvalue],
    'has_tier': (objvalue, defvalue) => objvalue[defvalue - 1],
    'has_not_tier': (objvalue, defvalue) => !objvalue[defvalue - 1],
}

const binaryOperators = Object.assign({},
    ...Object.entries(binaryOperatorsBase).map(
        ([k, v]) => ({[k]: new binaryOperator(k, v)})
    )
)

const stringOperators = [
    binaryOperators['text_equals'],
    binaryOperators['text_not_equals'],
    binaryOperators['text_contains'],
    binaryOperators['text_not_contains'],
]

const numberOperators = [
    binaryOperators['<'],    
    binaryOperators['>'],    
    binaryOperators['=='],    
    binaryOperators['<='],    
    binaryOperators['>='],    
    binaryOperators['!='],    
]

const propertyOperators = {
    'name': stringOperators,
    'lifetime': numberOperators,
    'nominal': numberOperators,
    'restock': numberOperators,
    'min': numberOperators,
    'quantmin': numberOperators,
    'quantmax': numberOperators,
    'cost': numberOperators,
    'flags': [
        binaryOperators['has_flag'],
        binaryOperators['has_not_flag'],
    ],
    'category': stringOperators,
    'usage': [
        binaryOperators['array_contains'],
        binaryOperators['array_not_contains'],
    ]
}