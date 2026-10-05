
let displayElemen = document.getElementById('display');

function mathEval (exp) {
    var reg = /(?:[a-z$_][a-z0-9$_]*)|(?:[;={}\[\]"'!&<>^\\?:])/ig,
        valid = true;
       

    exp = exp.replace(reg, function ($0) {
        if (Math.hasOwnProperty($0))
            return "Math."+$0;
        else
            valid = false;
    });
    
    // Don't eval if our replace function flagged as invalid
    if (!valid)
        displayElemen.value = "Invalid";
    else
        try { displayElemen.value = eval(displayElemen.value); } catch (e) { displayElemen.value = "Invalid"; };
}

function appendToDisplay(elemen)
{
    displayElemen.value += elemen;
}

function clearDisplay()
{
    displayElemen.value = "";
}

function calculate()
{
    mathEval(displayElemen.value);
}
