var calc = (function () {
    function getAmortizationSchedule(initialValue, amountLeft, payment, interestRate, repaymentTerm) {
        if (interestRate > 1)
            interestRate /= 100;

        interestRate /= 12;

        var ret = [];

        var nextBalance = amountLeft;
        var runningInterest = 0;
        for (var i = 1; i <= repaymentTerm; i++) {
            if (nextBalance < 0) break;

            var amortization = {
                period: i,
                balance: nextBalance,
                payment: payment
            };

            amortization.interestPaid = -calcIPMT(interestRate, i, repaymentTerm, initialValue, 0, 0);
            amortization.principalPaid = payment - amortization.interestPaid;

            nextBalance = amortization.balance - amortization.principalPaid;
            runningInterest += amortization.interestPaid;

            amortization.runningInterest = runningInterest;

            ret.push(amortization);
        }

        return ret;
    }

    function calcPPMT(intr, Per, NPer, PV, FV, Due)
    {
        float1 = Per - (Due?2:1);
        float2 = - FV*intr/((Math.pow(1+ intr,NPer)- 1)*(Due?1+ intr:1))+ - PV/((Due?1:0)+ 1/intr*(1- 1/Math.pow(1+ intr,NPer- (Due?1:0))));
        return (- FV*intr/((Math.pow(1+ intr,NPer)- 1)*(Due?1+ intr:1))+ - PV/((Due?1:0)+ 1/intr*(1- 1/Math.pow(1+ intr,NPer- (Due?1:0))))- - (PV*Math.pow(1+ intr,float1)- (- 0*Math.pow(1+ intr,float1)+ - (1/intr)*float2*(Math.pow(1+ intr,float1)- 1)*(Due?1+ intr:1)- (Due?float2:0)))*intr)*-1;
    }

    function calcFV(rate, periods, payment, value, type) {
        // Credits: algorithm inspired by Apache OpenOffice

        // Initialize type
        type = (typeof type === 'undefined') ? 0 : type;

        // Evaluate rate (TODO: replace with secure expression evaluator)
        rate = eval(rate);

        // Return future value
        var result;
        if (rate === 0) {
            result = value + payment * periods;
        } else {
            var term = Math.pow(1 + rate, periods);
            if (type === 1) {
                result = value * term + payment * (1 + rate) * (term - 1.0) / rate;
            } else {
                result = value * term + payment * (term - 1) / rate;
            }
        }
        return -result;
    }

    function calcPMT(rate, periods, present, future, type) {
        // Credits: algorithm inspired by Apache OpenOffice

        // Initialize type
        type = (typeof type === 'undefined') ? 0 : type;

        // Evaluate rate (TODO: replace with secure expression evaluator)
        rate = eval(rate);

        // Return payment
        var result;
        if (rate === 0) {
            result = (present + future) / periods;
        } else {
            var term = Math.pow(1 + rate, periods);
            if (type === 1) {
                result = (future * rate / (term - 1) + present * rate / (1 - 1 / term)) / (1 + rate);
            } else {
                result = future * rate / (term - 1) + present * rate / (1 - 1 / term);
            }
        }
        return -result;
    }

    function calcIPMT(rate, period, periods, present, future, type) {
        // Credits: algorithm inspired by Apache OpenOffice

        // Initialize type
        type = (typeof type === 'undefined') ? 0 : type;

        // Evaluate rate and periods (TODO: replace with secure expression evaluator)
        rate = eval(rate);
        periods = eval(periods);

        // Compute payment
        var payment = calcPMT(rate, periods, present, future, type);

        // Compute interest
        var interest;
        if (period === 1) {
            if (type === 1) {
                interest = 0;
            } else {
                interest = -present;
            }
        } else {
            if (type === 1) {
                interest = calcFV(rate, period - 2, payment, present, 1) - payment;
            } else {
                interest = calcFV(rate, period - 1, payment, present, 0);
            }
        }

        // Return interest
        return interest * rate;
    }

    return {
        getAmortizationSchedule: getAmortizationSchedule
    }
}());