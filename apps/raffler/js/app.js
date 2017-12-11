/**
 * Created by nengl on 9/27/2016.
 */
var app = function() {
    var m = this;

    m.rafflers = ko.observableArray([]);
    m.winner = ko.observable("");
    m.hasWinner = ko.computed(function () {
       return m.winner();
    });
    m.alert = ko.observable("");
    m.hasAlert = ko.computed(function () {
        return m.alert();
    });

    m.addRaffler = function() {
        var raffler = {name:ko.observable(""), amount:ko.observable(1)};
        m.rafflers.push(raffler);
    };

    m.removeRaffler = function(raffler) {
        m.rafflers.remove(raffler);
    };

    m.pickWinner = function() {
        m.alert("");

        var possibleContestants = ko.utils.arrayFilter(m.rafflers(), function(raffler) {
            return raffler.name().length > 0 && raffler.amount() > 0;
        });

        if (possibleContestants.length == 0) {
            m.alert("No possible contestants!");
            m.winner("");
            return;
        }

        var total = 0;
        ko.utils.arrayForEach(possibleContestants, function(raffler) {
            total += parseInt(raffler.amount());
        });

        var random = getRandomIntInclusive(1, total);

        var running = 0;
        var raffler = ko.utils.arrayFirst(possibleContestants, function(raffler) {
            running += parseInt(raffler.amount());
            return random <= running;
        });

        raffler.amount(raffler.amount() - 1);

        m.winner(raffler.name() + "!");
    };

    m.onTabOutOfAmount = function(data, event) {
        if (event.keyCode == 9 && !event.shiftKey) {
            var context = ko.contextFor(event.target);
            if (context.$index() != m.rafflers().length - 1)
                return true;

            m.addRaffler();
        }
        return true;
    };

    function getRandomIntInclusive(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    m.addRaffler();
};

ko.applyBindings(new app());