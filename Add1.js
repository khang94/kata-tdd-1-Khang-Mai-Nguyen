/**
 * Created by khang on 6/29/2016.
 */
window.Add1 = window.Add1 || {};
(function(){
    var caculator = function(){
        var inputString = document.getElementById('string').value;
        //alert(inputString);
        var arrayOfNumber = [];
        var result = 0 ;
        if(inputString.length == 0){
            result = 0;
        }
        else if (inputString.length == 1 ){
            if(!isNaN(inputString)) {
                alert('it s number');
                result += parseInt(inputString);
            } else {
                alert('it s not number');
                result = 'Please input the number.';
            }
        }
        else {
            arrayOfNumber = inputString.split(",");
            for(var i = 0 ; i < arrayOfNumber.length ; i++){
                result += parseInt(arrayOfNumber[i]);
            }
        }
        alert("result = " + result);
        document.getElementById('result').innerHTML = result.toString();
        return result;
    };
    window.Add1.init = function(){
        document.getElementById('btnClick').addEventListener('click',caculator);


    };
})();
/*function add1(number){
    var arrayOfNumber = [];
    var result = 0;
    if(number.length == 0) {
        result = 0;
    }
    else if(number.length=1){
        result = number;
    }
    else {
        arrayOfNumber = number.split(",");
        for(var i = 0 ; i < arrayOfNumber.length ; i++) {
            result += arrayOfNumber[i];
        }
    }
    return result;
}*/