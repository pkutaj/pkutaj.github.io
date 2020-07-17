const isValid = require("./2020-07-17");
describe('isValid', () => {
   /*  test('given "(){}[][)", it should return false ', () => {
        let input = "(){}[][)"
        let result = isValid(input);
        expect(result).toEqual(false)
    });
    test('given (){}, it should returh true', () => {
        let input = "(){}";
        let result = isValid(input);
        expect(result).toEqual(true);
    }); */
  /*   test('given }}, it should return false', () => {
        let input = "}}";
        let result = isValid(input);
        expect(result).toEqual(false);
        
    }); */
    test('given ()()([]{}), it should return true', () => {
        let input = "()()([]{})";
        let result = isValid(input);
        expect(result).toEqual(true);
        
    });

/*     test('given ([]), it should return true', () => {
        let input = "([])";
        let result = isValid(input);
        expect(result).toEqual(true);
        
    }); */
})


