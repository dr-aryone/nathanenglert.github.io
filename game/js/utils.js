var Ottr = Ottr || {};

Ottr.Utils = {};

Ottr.Utils.arrayForRange = function (a, b) {
    var arr = [];

    for (var i = a; i <= b; i++) {
        arr.push(i);
    }

    return arr;
}