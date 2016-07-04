/**
 * Created by khang on 6/30/2016.
 */
function refactorAdd(inputString){

    var isDelimeterExist = isThereDelimeter(inputString);
    var result = 0;
    alert(isDelimeterExist);

    // Invalid string ==> -1
    // There is negative number in an Array ==> -2
    // Result their sum though any length of delimiter ==> their sum

    if(isDelimeterExist){
        result = caculateStringWithDelimeter(inputString);
    }
    else {
        result = caculateStringWithNonDelimeter(inputString);
    }
    return result;
}
// Caculate the string with non-delimeter
function caculateStringWithNonDelimeter(inputString){
    var result = 0 ;
    var checkValidString = isValidString(inputString);
    alert('valid string : ' + checkValidString);
    if(inputString == ""){
        result = 0;
    }
    else if(!checkValidString){
        result = -1;
    }
    else  {
        var arrayOfNumber = inputString.split(',');
        for (var i = 0; i < arrayOfNumber.length; i++) {
            var temp = parseInt(arrayOfNumber[i]);

            // Thrown an exception when there is a negative number .
            if(temp < 0){
                result = -2 ;
                break;
            }
            temp = isBigNumber(temp);
            result += temp;
        }
    }
    return result;
}
// Caculate the string with the delimeter
function caculateStringWithDelimeter(inputString){
    var result = 0;
    var checkValidString = isValidString(inputString);
    // If it have just one character : Ex 'a' , 'b' .
    if(!checkValidString){
        result = -1;
    } else {
        for (var i = 0; i < inputString.length; i++) {
            if (inputString.indexOf('\n') > -1) {
                inputString = inputString.replace('\n', ',');
            }
            var countBeforeIndex = "a";
            if(i>=1){
                countBeforeIndex = inputString[i-1];
            }
            if (!isNaN(inputString[i]) && isNaN(countBeforeIndex)) {
                var identifyNumber = checkLengthNumber(inputString,i);
                var temp = parseInt(inputString[i]);
                if(identifyNumber >= 10){
                    temp = identifyNumber;
                }
                // Check negative number
                if (inputString[i - 1] == '-' && i > 0) {
                    temp = -parseInt(inputString[i]);
                }
                if (temp < 0) {
                    result = -2;
                    break;
                }

                temp = isBigNumber(temp);
                result += temp;
                alert ('TEMP = ' + temp + ' , RESULT = ' + result);
            }
        }
    }
    return result;
}
//Check length of number Ex : 1000 => value 1000 not 1 , 678 => value 678 not 6+7+8
function checkLengthNumber(inputString ,index){
    var intNumber = 0;
    //   '//[***]\n1***2***3[***]1000;1002***5'
    var stringNumber = inputString[index];
    for(var i = index + 1 ; i < inputString.length ; i++){
        var tempI = inputString[i];
        alert('temp I = ' + tempI + ' ,index = ' + i);
        if (tempI.indexOf('\n')>-1 || isNaN(tempI)){
            break;
        }
        if(!isNaN(tempI)){
            stringNumber += tempI;
            intNumber = parseInt(stringNumber);
            alert('string number = ' + stringNumber + ' , int number = ' + intNumber);
        } else {
            break;
        }
    }
    return intNumber;
}
// Check is there delimeter in the string if(yes) => true // else ==> false
function isThereDelimeter(inputString){
    var checkDelimeter = false;
    for(var i = 0 ; i < inputString.length ; i++){
        var char = inputString[i];
        if (isNaN(char) && char != ',' && char != '-' || inputString.indexOf('\n')>-1){
            // This array does not have the delimiter
            checkDelimeter = true;
            break;
        }
    }
    return checkDelimeter;
}

// Check are they valid string if not valid ==> false || else ==> true
function isValidString(inputString){
    var check = true;
    // If it have just one character : Ex 'a' , 'b' .
    if (inputString.length == 1 && isNaN(inputString)){
        check = false;
    }
    if (inputString.indexOf(',\n') > -1){
        check = false;
    }
    if(inputString.indexOf(',') == 0 || inputString.indexOf('\n') == 0
        || inputString.lastIndexOf(',') == inputString.length -1 || inputString.lastIndexOf('\n') == inputString.length
        || inputString.indexOf(',,')>-1){
        inputString.lastIndex
        check = false;
    }
    return check;
}
// If it have number > 1000 ==> 0
function isBigNumber(number){
    if (number > 1000){
        return 0;
    }
    return number;
}

// Simple Test Case With Specific Number
describe('stringCaculator',function(){

    // Question 1
    it ('should return 0 when the input is empty string ',function(){
        expect(refactorAdd("")).toBe(0);
    });
    it ('should return 1 when the input is "1"',function(){
        expect(refactorAdd("1")).toBe(1);
    })
    it ('should return -1 when the input is character',function(){
        expect(refactorAdd("a")).toBe(-1);
    })
    it('should return 3 when the input is "1,2"', function(){
        expect(refactorAdd("1,2")).toBe(3);
    });
    it('should return -1 when the input is ",1,2"', function(){
        expect(refactorAdd(",1,2")).toBe(-1);
    });
    it('should return -1 when the input is "1,2,"', function(){
        expect(refactorAdd("1,2,")).toBe(-1);
    });
    it('should return -1 when the input is "1,,,2,3"', function(){
        expect(refactorAdd("1,,,2,3")).toBe(-1);
    });

    // Question 2
    it('should return their sum when the input string have unlimit number', function(){
        var inputString = "1,2,3,4,5,6,7";
        var arrayOfString = inputString.split(",");
        var result = 0;
        for(var i = 0 ; i < arrayOfString.length ; i++){
            result += parseInt(arrayOfString[i]);
        }
        expect(refactorAdd(inputString)).toBe(result);
    });

    // Question 3
    // a
    it('allow the new line for commas', function(){
        var inputString = '1,2\n3\n4';
        expect(refactorAdd(inputString)).toBe(10);
    });

    // b
    it('allow the new line for commas Exception', function(){
        var inputString = '1,\n';
        expect(refactorAdd(inputString)).toBe(-1);
    });

    // c
    it('allow the new line for commas Exception', function(){
        var inputString = '\n,5';
        expect(refactorAdd(inputString)).toBe(-1);
    });

    // Question 4 Support different delimiters
    // a
    it('allow the delimiters 1', function(){
        var inputString = "//;\n1;2";
        expect(refactorAdd(inputString)).toBe(3);
    })

    // b
    it('allow the delimiters 2', function(){
        var inputString = "//;\n1;2;//;5";
        expect(refactorAdd(inputString)).toBe(8);
    })

    //c
    it('allow the delimiters 3', function(){
        var inputString = "//;\n1;\n2;//;5\n";
        expect(refactorAdd(inputString)).toBe(8);
    })

    //d
    it('allow the delimiters 4 Exception', function(){
        var inputString = "//;\n1;\n2;//;5,\n";
        expect(refactorAdd(inputString)).toBe(-1);
    })

    // Question 5 show negative number to throw exception ,
    // result = -2 when there is any negative number in an Array
    // a
    it('negative number is not allowed throw in exception 1 .', function(){
        var inputString ='-1,-2,-3';
        expect(refactorAdd(inputString)).toBe(-2);
    })
    // b
    it('negative number is not allowed throw in exception 2.', function(){
        var inputString ='1,2,-3';
        expect(refactorAdd(inputString)).toBe(-2);
    })
    // c
    it('negative number is not allowed throw in exception 3.', function(){
        var inputString ='1\n2,3,5,-6,7';
        expect(refactorAdd(inputString)).toBe(-2);
    })


    // Question 6 Number bigger than 1000 should be ignored
    // a
    it('Number bigger than 1000 should be (ignored) equals zero',function(){
        var inputString = '1001,2,1002,3,5,1003,1000';
        expect(refactorAdd(inputString)).toBe(1010);
    })

    // b
    it('Number bigger than 1000 should be (ignored) equals zero Exception',function(){
        var inputString = '1001,2,1002,3,5,1003,-1000';
        expect(refactorAdd(inputString)).toBe(-2);
    })

    // Question 7 The delimeter can be of any length with the any format .
    // a
    it('Allow any length of the delimeter with some format', function(){
        var inputString = '//[***]\n1***2***3';
        expect(refactorAdd(inputString)).toBe(6);
    })
    // b
    it('Allow any length of the delimeter with some format 2', function(){
        var inputString = '//[***]\n1***2***3[***]1000***1002***5';
        expect(refactorAdd(inputString)).toBe(1011);
    })

    // Question 8 Allow multiple delimeter.
    //[*][%]\n1*2%3
    it('Allow multiple of the delimter ', function(){
        var inputString = '//[*][%]\n1*2%3';
        expect(refactorAdd(inputString)).toBe(6);
    })

    // Question 9 handle multiple delimiters with length longer than one char
    // a
    it('handle multiple delimiters with length longer than one char ', function(){
        var inputString = '//[******][%%%%%%]\n1*2%%%%%5';
        expect(refactorAdd(inputString)).toBe(8);
    })
    // b
    it('handle multiple delimiters with length longer than one char ', function(){
        var inputString = '//[******][%%%%%%]\n1*]]]]]20%%%%%5';
        expect(refactorAdd(inputString)).toBe(26);
    })
    // c
    it('handle multiple delimiters with length longer than one char ', function(){
        var inputString = '//[******][%%%%%%]\n1000*]]]]]20%%%%%5[&&&&&]+1001';
        expect(refactorAdd(inputString)).toBe(1025);
    })
})
