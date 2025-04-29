class Vec {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    plus(other_vec) {
        return new Vec(this.x + other_vec.x, this.y + other_vec.y);
    }

    minus(other_vec) {
        return new Vec(this.x - other_vec.x, this.y - other_vec.y);
    }

    get length() {
        return Math.sqrt(this.x*this.x + this.y+this.y);
    }

    toString() {
        return `(${this.x}, ${this.y})`
    }
}

// vec1 = new Vec(2, 3);
// vec2 = new Vec(4, 5);

// console.log(vec1.plus(vec2).toString());
// console.log(vec1.minus(vec2).toString());
// console.log(vec1.length)

// let ages = new Map();
// ages.set('a', 2);
// // ages.delete('a');
// console.log(ages.get('a'));

class Group {
    constructor() {
        this.map = new Map();
    }

    add(e) {
        if (!this.map.has(e)) {
            this.map.set(e, true);
        }
    }

    delete(e) {
        this.map.delete(e);
    }

    has(e) {
        return this.map.has(e);
    }

    static from(iter) {
        let group = new Group();
        for (let e of iter) {
            group.add(e);
        }
        return group;
    }

    [Symbol.iterator] = () => new GroupIterable(this);
}

class GroupIterable {
    constructor(group) {
        this.elements = [...group.map.keys()];
        this.curr = 0;
        this.num_elements = this.elements.length;
    }

    next() {
        if (this.curr == this.num_elements) {
            return {done: true};
        }

        let value = this.elements[this.curr];
        this.curr++;
        return {value, done: false};
    }
}

let gg = Group.from([1, 2, 3, 4]);
// console.log(gg.has(2));
// console.log(gg.has(4));
// gg.delete(2);
// console.log(gg.has(2));
for (let e of gg) {
    console.log(e);
}

// console.log([...gg.map.keys()])