dis = document.querySelector('#LED-display');

(function(){

    var calculator, LED_display;
    calculator = window.calculator;
    LED_display = calculator.querySelector('#LED-display');
    
    


    function btn_number(e){
        var event = e.target;
        LED_displayVal = LED_display.textContent;
        
        if(e.target.classList.contains('numbers') == true){
            if(LED_display.textContent == "0"){
                LED_display.textContent = '';
            }
            LED_display.textContent += event.textContent*1;
        }

        if(LED_displayVal[LED_displayVal.length - 1] != "+"){
            if(e.target.id == 'plus'){
                LED_display.textContent += '+';
            }
        }

        if(e.target.id == 'equal'){
            if(LED_displayVal[LED_displayVal.length - 1] == "+"){
                LED_display.textContent = LED_displayVal.substring(0, LED_displayVal.length-1)
            }
            //LED_display.textContent = LED_displayVal *1;
        }
        
        console.log(LED_displayVal.length);
        
        
    }



    calculator.addEventListener('click', function(e){
        btn_number(e);
    }, false);

}());
