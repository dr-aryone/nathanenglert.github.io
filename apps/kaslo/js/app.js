var app = function(startLoans) {
    var m = this;

    m.extraMoney = ko.observable(100);
    m.loans = ko.observableArray(startLoans);

    m.results = ko.observableArray([]);
    m.resultPayoffTime = ko.observable(0);
    m.hasResults = ko.computed(function () {
       return m.results().length;
    });
    m.deltaInterest = ko.observable(0);
    m.deltaMonths = ko.observable(0);

    function getFriendlyText(i, length, name, payment) {
        if (i == 0) {
            return "First, pay off <strong>" + name + "</strong> by making monthly payments of <strong>$" + payment.toFixed(2) + "</strong>.";
        }

        if (i < length - 1) {
            return "Then, start making monthly payments of <strong>$" + payment.toFixed(2) + "</strong> until <strong>" + name + "</strong> is paid off.";
        }

        return "Lastly, finish up by paying off <strong>" + name + "</strong> with payments of <strong>$" + payment.toFixed(2) + "</strong>.";
    }

    m.analyzeLoans = function () {
        m.results.removeAll();
        m.deltaInterest(0);
        m.deltaMonths(0);

        var possibleLoans = ko.utils.arrayFilter(m.loans(), function(loan) {
            return loan.name()
                && loan.initialBalance()
                && loan.amountLeft()
                && loan.repaymentTerm()
                && loan.interestRate()
                && loan.minimumPayment();
        });

        if (possibleLoans.length == 0) {
            return;
        }

        possibleLoans.forEach(function (loan) {
            loan.initialSchedule = calc.getAmortizationSchedule(loan.initialBalance(), loan.amountLeft(), loan.minimumPayment(), loan.interestRate(), loan.repaymentTerm());
            loan.newSchedule = loan.initialSchedule;
        });

        possibleLoans.sort(function (a, b) {
            return a.initialSchedule.length - b.initialSchedule.length;
        });

        var runningPeriod = 0;
        var runningPayment = eval(m.extraMoney());

        for (var i = 0; i < possibleLoans.length; i++) {
            var current = possibleLoans[i];

            if (i > 0) {
                var previous = possibleLoans[i - 1];
                runningPeriod += previous.newSchedule.length;
                runningPayment += eval(previous.minimumPayment());
            }

            var balanceLeft = current.initialSchedule[runningPeriod].balance;
            var newPayment = eval(current.minimumPayment()) + runningPayment;

            current.newSchedule = calc.getAmortizationSchedule(current.initialBalance(), balanceLeft, newPayment, current.interestRate(), current.repaymentTerm());

            var oldInterest = current.initialSchedule[current.initialSchedule.length - 1].runningInterest;
            var runningInterest = current.initialSchedule[runningPeriod].runningInterest;
            var totalInterest = runningInterest + current.newSchedule[current.newSchedule.length - 1].runningInterest;

            var oldPaidOff = current.initialSchedule.length;
            var paidOff = runningPeriod + current.newSchedule.length;

            var friendlyText = getFriendlyText(i, possibleLoans.length, current.name(), newPayment);

            var result = {
                name: current.name(),
                oldPaidOff: oldPaidOff,
                paidOff: paidOff,
                oldTotalInterest: oldInterest,
                totalInterest: totalInterest,
                friendlyText: friendlyText,
                statsOpened: ko.observable(false)
            };

            m.results.push(result);
            m.deltaInterest(m.deltaInterest() + (oldInterest - totalInterest));
        }

        var lastLoan = m.results()[m.results().length - 1];
        m.deltaMonths(m.deltaMonths() + (lastLoan.oldPaidOff - lastLoan.paidOff));
    };

    m.toggleStats = function (result) {
        result.statsOpened(!result.statsOpened());
    };

    m.addLoan = function() {
        var loan = {
            name: ko.observable(),
            initialBalance: ko.observable(),
            amountLeft: ko.observable(),
            repaymentTerm: ko.observable(),
            interestRate: ko.observable(),
            minimumPayment: ko.observable()
        };
        m.loans.push(loan);
    };

    m.removeLoan = function(loan) {
        m.loans.remove(loan);
    };

    if (m.loans().length === 0) {
        m.addLoan();
        m.addLoan();
    }
};

ko.applyBindings(new app([]));