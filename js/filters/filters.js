app.filter('vegFilter', function() {      
        return function(input) {
            if (input == "yes") {
                return "data/vegetarian-mark.svg";
            } else { 
                return "";
            }
        };
});
app.filter('veganFilter', function() {      
        return function(input) {
            if (input == "yes") {
                return "data/vegan.svg";
            } else { 
                return "";
            }
        };
});
app.filter('gfFilter', function() {      
        return function(input) {
            if (input == "yes") {
                return "data/gf.png";
            } else { 
                return "";
            }
        };
});
app.filter('link', function() {      
        return function(input) {
            
            if (typeof(input)=="string"){
                console.log(input.slice(0,3))
                var test = input.slice(0,3) == "htt" ? "<a href="+input+" target='_blank'>"+input+"</a>" : input
                return test
            } else {return "We're working on that"}
            
            
        };
});