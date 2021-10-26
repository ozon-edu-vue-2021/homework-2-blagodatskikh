export default class Node {
    constructor(type, name, target, parent = null) {
        this.type = type;
        this.name = name;
        this.target = target;
        this.parent = parent;
        this.expanded = false;
        this.selected = false;
        this.children = [];
    }
}
