var currencies = [
    {name: "dkk", sign: "kr", prefix: false},
    {name: "usd", sign: "$", prefix: true}
];
var appendCurrencyMarker = function(foodObject, price) {
    for(var i = 0; i < currencies.length; i++) {
        if(foodObject.currency.toLowerCase() === currencies[i].name) {
            if(currencies[i].prefix) {
                return currencies[i].sign + price;
            } else {
                return price + currencies[i].sign;
            }
        }
    }
};

var removeCurrencyMarkers = function(priceString) {
    return priceString.replace(/[^0-9.,]/g, "");
}

angular.module("app").service("foodPrice", function() {

    return {
        getPrice: function(foodObject){
            var price = (foodObject.price/100).toFixed(2);
            var finalPriceString = appendCurrencyMarker(foodObject, price);
            return finalPriceString;
        },
        setPriceFromString: function(foodObject){
            if(foodObject && foodObject.priceString) {
                foodObject.price = removeCurrencyMarkers(foodObject.priceString) * 100;
            }
        }

    }
});