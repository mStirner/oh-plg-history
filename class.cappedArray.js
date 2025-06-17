module.exports = class CappedArray {

    constructor(limit) {
        this.limit = limit;
        this.data = [];
    }

    add(item) {

        if (this.data.length >= this.limit) {
            this.data.shift();
        }

        this.data.push(item);

    }

    toJSON() {
        return this.data;
    }

    getAll() {
        return this.data;
    }

};