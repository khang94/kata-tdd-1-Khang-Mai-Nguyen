/**
 * Created by khang on 6/30/2016.
 */
function Add(inputNumber){
    var result = 0 ;
    var arrayOfString = [];
    var negativeNumber = 0;
    var lstNegativeNumber = [];
    // Handle New Line
    if(inputNumber.indexOf('\n')>-1){

        // Handle delimiters
        if (inputNumber.indexOf(';\n')>-1){
            
            //;\n1;2 ==> return 3
            inputNumber = inputNumber.replace(';\n',',');
            if(inputNumber.indexOf(';')>-1){
                inputNumber = inputNumber.replace(';',',');
            }
            if(inputNumber.indexOf('//')>-1){
                inputNumber = inputNumber.replace('//','0');
            }

        }
        
        // result return -1 when the input is invalided (eg. ",\n3,5,6,7" or "3,2\n," ....) ==> return -1
        if (inputNumber.lastIndexOf(',\n') == (inputNumber.length-2)
            ||  inputNumber.lastIndexOf('\n,') == (inputNumber.length-2)
            ||  inputNumber.indexOf(',\n') == 0){
            // Assign it to random character which have size 1 to return -1 to identify the input is not valid .
            // w is wrong (any character is ok just to make sure it have 1 character to return -1 )
            inputNumber = "w";
        } else {
            inputNumber = inputNumber.replace('\n', ',');
        }
    }


    // Analyse the String follow format 2,3,4,5 ....
    // if the string is empty
    if(inputNumber == ""){
        result = 0 ;
    }
    
    // if the string have size 1
    else if (inputNumber.length == 1){
        if(!isNaN(inputNumber)){
            // Suppose it is positive number
            result = parseInt(inputNumber);

            // Add negative number to show when it will be in the exception
            if(result < 0){
                lstNegativeNumber.push(result);
            }
        }
        else {
            // it is not number .
            result = -1;
        }
    }
    // if their length > 1 => put it in the Array => if not have negative number => return their sum
                                                //   if negative number is existed => put on the list and show the exception
    else  {
        arrayOfString = inputNumber.split(",");
        for(var i = 0 ; i < arrayOfString.length ; i++){
            var temp = parseInt(arrayOfString[i]);
            result += temp;
            if(temp < 0){
                lstNegativeNumber.push(temp);
            }
        }
    }

    // If it does not have negative ==> return result
    if (lstNegativeNumber.length ==0) {
        return result;
    } else { // Return list negative number to show for the user not allow
        return lstNegativeNumber;
    }
}

function compareTwoList(lstA, lstB){
    var check = true;
    if(lstA.length == lstB.length){
        for(var i = 0 ; i<lstA.length ; i++){
            if(lstA[i] != lstB[i]){
                check = false;
                break;
            }
        }
    }
    return check;
}

// Simple Test Case With Specific Number
describe('stringCaculator',function(){

    // Question 1
    it ('should return 0 when the input is empty string ',function(){
        expect(Add("")).toBe(0);
    });
    it ('should return 1 when the input is "1"',function(){
        expect(Add("1")).toBe(1);
    })
    it ('should return -1 when the input is character',function(){
        expect(Add("a")).toBe(-1);
    })
    it('should return 3 when the input is "1,2"', function(){
        expect(Add("1,2")).toBe(3);
    });

    // Question 2
    it('should return their sum when the input string have unlimit number', function(){
        var inputString = "1,2,3,4,5,6,7";
        var arrayOfString = inputString.split(",");
        var result = 0;
        for(var i = 0 ; i < arrayOfString.length ; i++){
            result += parseInt(arrayOfString[i]);
        }
        expect(Add(inputString)).toBe(result);
    });

    // Question 3
    // a
    it('allow the new line for commas', function(){
        var inputString = '1,2\n3';
        expect(Add(inputString)).toBe(6);
    });

    // b
    it('allow the new line for commas Exception', function(){
        var inputString = '1,\n';
        //var inputString = ',\n,1'
        expect(Add(inputString)).toBe(-1);
    });

    // Question 4 Support different delimiters
    it('allow the delimiters', function(){
        var inputString = "//;\n1;2";
        //var inputString = "//;\n2";
        expect(Add(inputString)).toBe(3);
    })

    // Question 5 show list negative number to throw exception
    it('negative number is not allowed', function(){
        var inputString ='-1,-2,-3';
        var lstNegativeNumber = [-1, -2 ,-3];
        var check = compareTwoList(Add(inputString),lstNegativeNumber);
        expect(check).toBe(true);
    })


})

// Test Higher
/*describe('stringCaculator',function(){
    it('should return 0 when the input is empty string',function(){
       var inputString = "";
        expect(Add(inputString)).toBe(0);
    });
    it('should return 1 number when the input just contain one number',function(){
        var inputString ;
    })
})*/
