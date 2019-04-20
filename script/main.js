(function(){

    var calculator, LED_display, secendOperand;
    calculator = window.calculator;
    LED_display = calculator.querySelector('#LED-display');
    secendOperand = false;
    operator = /[+-/*]/;
    //number = /[0-9]/;

    


    function btn_number(e){
        var event = e.target;
        
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
                LED_display.textContent = eval(LED_display.textContent);
            }
            secendOperand = true;
            LED_display.textContent += event.textContent;
            if(event.id == 'percentage'){
            var n = LED_display.textContent.split(/[%-+*/]/);
                console.log(n);
                console.log((n[1]/100)*n[0]);

            }
    
            
            
        }
    
        LED_displayVal = LED_display.textContent;
        if(event.id == 'equal'){
            if(/[%]/.test(LED_displayVal)){
                console.log('%%%%%%');
            }else{
                LED_display.textContent = eval(LED_display.textContent);
            }
            
        }
                
        
    }


    calculator.addEventListener('click', function(e){
        if(e.target.classList.contains('calculator-btn')){
            btn_number(e);
        }
    }, false);

}());
