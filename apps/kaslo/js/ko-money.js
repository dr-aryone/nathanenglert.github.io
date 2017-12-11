(function(){

    var toMoney = function(num){
        return '$' + (num.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,') );
    };

    var handler = function(element, valueAccessor, allBindings){
        var valueUnwrapped = ko.unwrap( valueAccessor() );
        return element.innerText = toMoney(valueUnwrapped);
    };

    ko.bindingHandlers.money = {
        update: handler
    };
})();