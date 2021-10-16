import * as number from "./number"
// @ponicode
describe("number.rangeNumber", () => {
    test("0", () => {
        let callFunction: any = () => {
            number.rangeNumber(-5.48, 0)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction: any = () => {
            number.rangeNumber(-100, 0)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction: any = () => {
            number.rangeNumber(-100, 100)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction: any = () => {
            number.rangeNumber(100, 0)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction: any = () => {
            number.rangeNumber(1, 0)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction: any = () => {
            number.rangeNumber(Infinity, Infinity)
        }
    
        expect(callFunction).not.toThrow()
    })
})
