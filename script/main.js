(function(){

    var calculator, LED_display;
    calculator = window.calculator;
    LED_display = calculator.querySelector('#LED-display');
    operator = /[+-/*]/;
    number = /[0-9]/;

    


    function btn_number(e){
        var event = e.target;
        LED_displayVal = LED_display.textContent;
        
        if(event.classList.contains('numbers')){
            if(LED_display.textContent == "0"){
                LED_display.textContent = '';
            }
            LED_display.textContent += event.textContent;
        }

        if(event.classList.contains('operator')){
            if(operator.test(LED_displayVal[LED_displayVal.length - 1])){
                LED_display.textContent = LED_displayVal.slice(0, LED_displayVal.length-1);
            }
            LED_display.textContent += event.textContent;
        }
    


        if(event.id == 'equal'){
            LED_display.textContent = eval(LED_display.textContent);
        }
                
        
    }



    calculator.addEventListener('click', function(e){
        btn_number(e);
    }, false);

}());
