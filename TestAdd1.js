describe(Add, function(){
    beforeeach(function(){
       // alert('before each');
        var guiTest = '<h1>Input the string and click button to see whether the test is pass or not . </h1>'+
        '<p><input type="text" id="string" placeholder="Input your string at here">' +
            ' Please input your string at here . eg : 1,2,3 or 1.... </p>'+
        '<p>Result: <span id="result"></span></p>'
            '<input type="button" value="Caculator" id="btnClick">';

        document.body.insertAdjacentHTML(
            'afterbegin',
            a);
    });

    // Remove HTML feature from the DOM
    aftereach(function(){
       document.body.removeChild(document.getElementById('string'));
    });

    beforeeach(function(){
       window.Add.init();
    });
    it('should return empty for ""',function(){

        document.getElementById('string').value='';
        expect(document.getElementById('result').innerHTML).toBe('');
    });
    it('should return 1 for "1"',function(){
        document.getElementById('string').value = '1';
        expect(document.getElementById('result').innerHTML).toBe('1');
    });
    it('should return 3 for "1,2"',function(){
          document.getElementById('string').value = '1,2';
          expect(document.getElementById('result').innerHTML).toBe('3');
    });
});
/*describe('calculator', function () {

    beforeEach(module('calculatorApp'));

    var $controller;

    beforeEach(inject(function(_$controller_){
        $controller = _$controller_;
    }));

    describe('sum', function () {
        it('1 + 1 should equal 2', function () {
            var $scope = {};
            var controller = $controller('CalculatorController', { $scope: $scope });
            $scope.x = 1;
            $scope.y = 2;
            $scope.sum();
            expect($scope.z).toBe(5);
        });
    });

}); */
/**
 * Created by khang on 6/28/2016.
 */
