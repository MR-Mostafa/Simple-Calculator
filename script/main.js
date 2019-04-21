(function(){

    var calculator, log, LED_display, secendOperand;
    calculator = window.calculator;
    LED_display = calculator.querySelector('#LED-display');
    log = window.log;
    secendOperand = false;
    operator = /[+-/*]/;
    //number = /[0-9]/;

    


function btn_number(e){
    var event = e.target;
    var logDisplay = 0;

    if(event.classList.contains('numbers')){
        if(LED_display.textContent == "0"){
            LED_display.textContent = '';
        }
        LED_display.textContent += event.textContent;
    }

    if(event.classList.contains('operator')){
        if(operator.test(LED_display.textContent[LED_display.textContent.length - 1])){
            LED_display.textContent = LED_display.textContent.slice(0, LED_display.textContent.length-1);
        }

        if(event.id != 'percentage' && secendOperand == true){
            logDisplay = LED_display.textContent + '=';
            LED_display.textContent = eval(LED_display.textContent);
        }
        secendOperand = true;

        if(event.id != 'percentage') LED_display.textContent += event.textContent;

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
        }

        
        
    }


    if(logDisplay != 0){
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
    }
            
    
}


    calculator.addEventListener('click', function(e){
        if(e.target.classList.contains('calculator-btn')){
            btn_number(e);
        }
    }, false);

}());
