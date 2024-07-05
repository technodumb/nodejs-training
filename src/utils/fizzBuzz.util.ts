export class FizzBuzz {
    public fizzBuzz(num) {
        let ret = "";
        if (this.divisibleByThree(num)) {
            console.log(num);
            ret += "Fizz";
        }
        if (num % 5 == 0) {
            ret += "Buzz";
        }
        return ret ? ret : num;
    }

    divisibleByThree = (num: number): boolean => num % 3 == 0;
}

const fizzBuzz = new FizzBuzz();
for (let i = 0; i < 20; i++) {
    console.log(fizzBuzz.fizzBuzz(i));
}
