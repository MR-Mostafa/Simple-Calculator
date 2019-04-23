(function(){

    var calculator, log, display;
    calculator = window.calculator;
    display = calculator.querySelector('#LED-display');
    log = window.log;

    var cal = {
        displayValue     : "0",
        result           : false,
        resultPersent    : null,
        numberOfDecimal  : 5,
        getLastCharacter : function(){
                return cal.displayValue[cal.displayValue.length-1];
            },
        splitWithOperator : function(){
                // filter(Boolean) remove falsy items in arr
                var arr = this.displayValue.split(/[-+*/%\(\)]/).filter(Boolean);
                return arr;
            },
        whichOperator : function(){
                if (/[+]/.test(this.displayValue)) return '+';
                if (/[-]/.test(this.displayValue)) return '-';
                if (/[/]/.test(this.displayValue)) return '/';
                if (/[*]/.test(this.displayValue)) return '*';
                return false;
            }
    }
    

function update(){
    display.textContent = cal.displayValue;
}
function showResult(){
    if( cal.splitWithOperator().length >= 2 && /[-+*/%]/.test(cal.getLastCharacter()) == false ){
        // Calculates value
        cal.result = eval(cal.displayValue);
        // show log
        log.textContent = cal.displayValue + '=';
        // reset cal.displayValue
        cal.displayValue = cal.result.toString();
        //show cal.result
        // the addition sign before the variable name, is deleted extra zeros in decimal number
        // Ex: 12/5 before adding a plus sign is equal to 2.40000 BUT after adding a plus sign is equal 2.4
        display.textContent = +cal.result.toFixed(cal.numberOfDecimal);
    }
}


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
        if(/[-+*/%]/.test(cal.getLastCharacter())){
           cal.displayValue = cal.displayValue.slice(0, cal.displayValue.length-1);
        }

        if(event.id == 'percentage' && cal.splitWithOperator().length >= 2){
            
            cal.displayValue += event.textContent;
            update();

            if(cal.whichOperator() == '/'){
                cal.resultPersent = Number(cal.splitWithOperator()[1])/100;
            }else{
                cal.resultPersent = (Number(cal.splitWithOperator()[1])/100)*Number(cal.splitWithOperator()[0]);
            }

            // show log
            log.textContent = cal.displayValue + '=' + +cal.resultPersent.toFixed(cal.numberOfDecimal);

            if(cal.whichOperator() == '/') cal.result = Number(cal.splitWithOperator()[0]) / Number(cal.resultPersent);
            if(cal.whichOperator() == '*') cal.result = Number(cal.splitWithOperator()[0]) * Number(cal.resultPersent);
            if(cal.whichOperator() == '+') cal.result = Number(cal.splitWithOperator()[0]) + Number(cal.resultPersent);
            if(cal.whichOperator() == '-') cal.result = Number(cal.splitWithOperator()[0]) - Number(cal.resultPersent);
            
            //console.log(cal.whichOperator());
            //console.log(cal.splitWithOperator());
            // reset cal.displayValue
            cal.displayValue = cal.result.toString();
            //show cal.result
            // the addition sign before the variable name, is deleted extra zeros in decimal number
            // Ex: 12/5 before adding a plus sign is equal to 2.40000 BUT after adding a plus sign is equal 2.4
            display.textContent = +cal.result.toFixed(cal.numberOfDecimal);
            
        }
        
        if(event.id != 'percentage'){
            // if cal.splitWithOperator.length greater than or equal 2, then calculates that value and show it.
            // Ex: if you've written 3+2 and then click on other operator buttons, it will show 5.
            if(cal.splitWithOperator().length >= 2){
                showResult();
            }
            // update cal.displayValue
            cal.displayValue += event.textContent;
            update();
        }
       
    } // if operator

   
    if(event.classList.contains('Parentheses')){
        

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
