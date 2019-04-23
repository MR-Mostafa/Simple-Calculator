(function(){

    var calculator, log, display;
    calculator = window.calculator;
    display = calculator.querySelector('#LED-display');
    log = window.log;

    var cal = {
        displayValue     : "",
        result : null,
        percentageResult: null,
        numberOfDecimal  : 5,
    }
    


var displayValueSplit = () => {
    return cal.displayValue.toString().split('').filter(Boolean);
};
var getLastCharacter = () => {
    return cal.displayValue[cal.displayValue.length-1];
};
var splitWithOperator = () => {
    // filter(Boolean) remove falsy items in arr
    var arr = cal.displayValue.split(/[-+*/%\(\)]/).filter(Boolean);
    return arr;
};
var update = () => {
    display.textContent = cal.displayValue;
};

var showResult = () => {
    var findPercentageSign;
    // شماره مکانی که علامت درصد در اونجا واقع شده رو برمی‌گردونه
    findPercentageSign = cal.displayValue.indexOf('%');

    if(findPercentageSign != -1){
        // اینجا دارم چک می‌کنم که اپراتور قبل از درصد چی بوده؟
        // بعدش اونو در متغیر ذخیره می‌کنم
        for( var i = findPercentageSign; i >= 0; i--){
            if(/[\+\-\*\/]/.test(cal.displayValue.slice(i,findPercentageSign))){
                var whichOperator = cal.displayValue.slice(i,i+1)
                break;
            }
        }
        console.log(findPercentageSign);
        console.log(i);
        console.log(whichOperator);

        // اینحا تمام اپرندهای قبل از درصد رو انتخاب می‌کنم
        // و بعدش با توجه به اپراتوری که استفاده شده اونو جدا می‌کنم از هم
        var findOperand = cal.displayValue.slice(0,i);
        findOperand = findOperand.split(/[\+\-\*\/]/);

        // اینجا هم میزان درصد رو پیدا می‌کنم
        var findPercentageNumber = cal.displayValue.slice(i+1,findPercentageSign);
        console.log(findPercentageNumber);
        
        switch(whichOperator){
            case '+':
                cal.percentageResult = (Number(findPercentageNumber/100)) * Number(findOperand[findOperand.length-1]);
                break;
            case '-':

                break;
            case '*':
                cal.percentageResult = (Number(findPercentageNumber/100)) / Number(findOperand[findOperand.length-1]);
                break;
            case '/':

                break;
        }

        console.log( cal.percentageResult);
        
    }

};


function btn_number(e){
    var event = e.target;
       
    if(event.classList.contains('numbers')){
        // When the number buttons is clicked, the default value change. (Zero number is deleted)
        if(cal.displayValue == "0") cal.displayValue = '';
        // When the number buttons is clicked, In the display is shown
        cal.displayValue += event.textContent;
        update();
    } // if number


    if(event.classList.contains('operator')){
        // If you click on the operator buttons again, it will replace the last operator in cal.displayValue
        // Ex: if you've written 3+ and then click on minus or division button, the cal.displayValue is chacge to 3- (NOT 3+-)
        if(/[\-\+\*/]/.test(getLastCharacter())){
           cal.displayValue = cal.displayValue.slice(0, cal.displayValue.length-1);
        }
        cal.displayValue += event.textContent;
        update();
       
    } // if operator


    if(event.id == 'percentage'){
        
        // اگر آخرین کاراکتر عبارت های زیر نبود، علامت درصد رو اضافه می‌کنه
        if(!/[\-\+\*/%]/.test(getLastCharacter())){
            // update cal.displayValue
            cal.displayValue += event.textContent;
            update();
         }
        
    } // if percentage

    if(event.classList.contains('Parentheses')){
        // When the number buttons is clicked, the default value change. (Zero number is deleted)
        if(cal.displayValue == "0") cal.displayValue = '';
        cal.displayValue += event.textContent;
        update();
    } // if Parentheses

    if(event.id == 'equal'){
        showResult();
    } // if equal

    
    
    
} // function btn_number


    calculator.addEventListener('click', function(e){
        if(e.target.classList.contains('calculator-btn')){
            btn_number(e);
        }
    }, false);

}());
function newFunction() {
    ;
}

