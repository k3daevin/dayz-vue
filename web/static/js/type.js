let type = class Type {
    static flagIcons = [
        ["count_in_cargo", "bi bi-box"],
        ["count_in_hoarder", "bi bi-basket2"],
        ["count_in_map", "bi bi-map"],
        ["count_in_player", "bi bi-person"],
        ["crafted", "bi bi-wrench"],
        ["deloot", "bi bi-recycle"]
    ]
    static categories = [
        '',
        'weapons',
        'food',
        'clothes',
        'containers',
        'tools',
        'vehiclesparts',
        'explosives'
    ]
    constructor(xml) {
        this.visible = true;
        this.editable = false;
        function singleText(name) {
            return parseInt(xml.getElementsByTagName(name)[0].textContent)
        }
        function getNameAttribute(elem) {
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
        let categoryCollection = xml.getElementsByTagName('category')
        this.category = ""
        if (categoryCollection.length == 1) {
            this.category = getNameAttribute(categoryCollection[0])
        }
        this.usage = []
        let usageElems = xml.getElementsByTagName('usage')
        for (let i = 0; i < usageElems.length; ++i) {
            this.usage.push(getNameAttribute(usageElems[i]))
        }
        this.value = Array(4).fill(false)
        let valueElems = xml.getElementsByTagName('value')
        for (let i = 0; i < valueElems.length; ++i) {
            let string = getNameAttribute(valueElems[i])
            let tier = parseInt(string.slice(-1))
            this.value[tier-1] = true
        }

    }
}

Vue.component('value-tier', {
    props: {
        tier: Number,
        value: Array,
        disabled: {
            type: Boolean,
            default: false
        }
    },
    template: `
    <div>
        {{tier + 1}}: <input
            type="checkbox"
            v-model="value[tier]"
            v-bind:disabled="disabled"
        ></input>
    </div>
    `
})

Vue.component('type-flag', {
    props: ['icon', 'value'],
    template: `
    <b :class="icon" v-if="value" />            
    <i :class="icon" class="text-muted" v-else />
    `
})

Vue.component('mannebox', {
    props: ['type', 'property', 'editable'],
    template : `
    <div v-if="editable">
      <input v-model="type[property]"></input>
    </div>
    <div v-else>
      {{ type[property] }}
    </div>
    `
})