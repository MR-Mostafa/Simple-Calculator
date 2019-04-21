(function(){

    var calculator, log, LED_display, mainOperatorSign;
    calculator = window.calculator;
    LED_display = calculator.querySelector('#LED-display');
    log = window.log;
    mainOperatorSign = /[+-/*]/;
    //number = /[0-9]/;

    var cal = {
        displayValue        : "0", 
        logDisplay          : "0",
        result              : "0",
        splitWithOperator   : function(){ return this.displayValue.split(/[+*\-\/%]/); },
        splitWithPercentage : function(){ return this.displayValue.split(/[%]/); },
        whichOperator       : function(){
                                    if (/[+]/.test(this.splitWithPercentage()[0])) return '+';
                                    if (/[-]/.test(this.splitWithPercentage()[0])) return '-';
                                    if (/[/]/.test(this.splitWithPercentage()[0])) return '/';
                                    if (/[*]/.test(this.splitWithPercentage()[0])) return '*';
                                    return false;
                                }
    } 
    

function updateDisplayValue(){
    LED_display.textContent = cal.displayValue;
    LED_display.textContent.toFixed(4);
}
function showLog(){
    log.textContent = cal.logDisplay;
}
function showResult(percentagebtn = false){
    if(percentagebtn == true){
        if(cal.result % 1 == 0){
            log.textContent = cal.splitWithPercentage()[0] + '%=' + cal.result;
            LED_display.textContent = eval(cal.splitWithOperator()[0] +  cal.whichOperator() + cal.result);
        }else{
            log.textContent = cal.splitWithPercentage()[0] + '%=' + +cal.result.toFixed(4);
            LED_display.textContent = +eval(cal.splitWithOperator()[0] +  cal.whichOperator() + cal.result).toFixed(4);
        }
    }else{
        if(eval(cal.displayValue) % 1 == 0){
            log.textContent = cal.displayValue + '=' + eval(cal.displayValue);
            LED_display.textContent = eval(cal.displayValue);
        }else{
            log.textContent = cal.displayValue + '=' + +eval(cal.displayValue).toFixed(4);
            LED_display.textContent = +eval(cal.displayValue).toFixed(4);
        }
    }
}


function btn_number(e){
    var event = e.target;
    if(event.classList.contains('numbers')){
        if(cal.displayValue == "0"){
            cal.displayValue = '';
        }
        cal.displayValue += event.textContent;
        updateDisplayValue();
    }


    if(event.classList.contains('operator')){
        // If you click on the operator button again, it will remove the last operator in cal.displayValue
        // Ex: if you've written 3+ and then click on minus button, the cal.displayValue is chacge to 3- (NOT 3+-)
        if(mainOperatorSign.test(cal.displayValue[cal.displayValue.length - 1])){
            cal.displayValue = cal.displayValue.slice(0, cal.displayValue.length-1);
        }

        // if event.id is not equal to 'percentage' AND cal.secendOperand.length greater than or equal 2, then Calculates the value.
        // Ex: if you've written 3+2 and then click on other operator buttons, it will show 5.
        // It also updates cal.logDisplay
        if(event.id != 'percentage'){
            cal.logDisplay = cal.displayValue + '=';
            cal.displayValue = eval(cal.displayValue);
            updateDisplayValue();
        }

        // Write operator sign in cal.displayValue, if event.id not equal to 'percentage'
        if(event.id != 'percentage') cal.displayValue += event.textContent; updateDisplayValue();

        // Write 'percentage' sign in cal.displayValue, if event.id equal to 'percentage'
        // you can't Write 'percentage' sign as a first Operand
        console.log(cal.splitWithOperator());
        if(event.id == 'percentage' && cal.splitWithOperator().length >= 2){
            
            cal.displayValue += event.textContent;
            updateDisplayValue();

            if(cal.whichOperator() == '/'){
                cal.result = Number(cal.splitWithOperator()[1])/100;
            }else{
                cal.result = (Number(cal.splitWithOperator()[1])/100)*Number(cal.splitWithOperator()[0]);
            }
            showResult(true);
        }
        

        /*
        if(event.id == 'percentage'){
            var numSplit, numSplitSecond, result, whichOperand;
            numSplit = LED_display.textContent.split(/[%]/);
            numSplitSecond = LED_display.textContent.split(/[+*\-\/%]/);
            if(numSplitSecond.length >= 2){
                LED_display.textContent += event.textContent;
                if (/[+]/.test(numSplit[0])) whichOperand = '+';
                if (/[-]/.test(numSplit[0])) whichOperand = '-';
                if (/[/]/.test(numSplit[0])) whichOperand = '/';
                if (/[*]/.test(numSplit[0])) whichOperand = '*';

                if(whichOperand == '/'){
                    result = ((Number(numSplitSecond[1])/100));
                }else{
                    result = ((Number(numSplitSecond[1])/100))*Number(numSplitSecond[0]);
                }

                if(result % 1 == 0){
                    logDisplay = numSplit[0] + '%=' + result;
                    LED_display.textContent = eval(numSplitSecond[0] +  whichOperand + result);
                }else{
                    logDisplay = numSplit[0] + '%=' + +result.toFixed(4);
                    LED_display.textContent = +eval(numSplitSecond[0] +  whichOperand + result).toFixed(4);
                }
                
            }
        }*/

        
        
    }

    if(event.id == 'equal'){

        showResult(false);
    }

    /*if(logDisplay != 0){
        log.textContent = logDisplay;
    }
    
    LED_displayVal = LED_display.textContent;
    if(event.id == 'equal'){
        var result = eval(LED_display.textContent);
        if(result % 1 == 0){
            LED_display.textContent = +result;
        }else{
            LED_display.textContent = +result.toFixed(4);
        }
    }*/
           
    
}


    calculator.addEventListener('click', function(e){
        if(e.target.classList.contains('calculator-btn')){
            btn_number(e);
        }
    }, false);

}());
