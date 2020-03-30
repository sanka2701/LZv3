module.exports = function () {
    Array.prototype.diff = function(against) {
        return this.filter(function(item) {return against.indexOf(item) < 0;});
    };
};