let type = class Type {
    constructor(xml) {
        function singleText(name) {
            return parseInt(xml.getElementsByTagName(name)[0].textContent)
        }
        function getName(elem) {
            return elem.attributes.name.value
        }
        this.name = xml.attributes["name"].value
        this.lifetime = singleText('lifetime')
        this.nominal = singleText('nominal')
        this.restock = singleText('restock')
        this.min = singleText('min')
        this.quantmin = singleText('quantmin')
        this.quantmax = singleText('quantmax')
        this.cost = singleText('cost')
        let flagsAttr = xml.getElementsByTagName('flags')[0].attributes
        this.flags = {}
        for (let i = 0; i < flagsAttr.length; ++i) {
            let item = flagsAttr.item(i)
            this.flags[item.name] = item.value == '1'
        }
        this.usage = []
        let usageElems = xml.getElementsByTagName('usage')
        for (let i = 0; i < usageElems.length; ++i) {
            this.usage.push(usageElems[i])
        }
        this.value = []
        let valueElems = xml.getElementsByTagName('value')
        for (let i = 0; i < valueElems.length; ++i) {
            this.value.push(valueElems[i])
        }

    }
} 