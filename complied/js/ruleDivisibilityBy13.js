/* Link: https://www.codewars.com/kata/564057bc348c7200bd0000ff

From Wikipedia:

"A divisibility rule is a shorthand way of determining whether a given integer is divisible by a fixed divisor without performing the division, usually by examining its digits."

When you divide the successive powers of `10` by `13` you get the following remainders of the integer divisions:

`1, 10, 9, 12, 3, 4` because:

    10 ^ 0 ->  1 (mod 13)
    10 ^ 1 -> 10 (mod 13)
    10 ^ 2 ->  9 (mod 13)
    10 ^ 3 -> 12 (mod 13)
    10 ^ 4 ->  3 (mod 13)
    10 ^ 5 ->  4 (mod 13)

(For "mod" you can see: [https://en.wikipedia.org/wiki/Modulo_operation](https://en.wikipedia.org/wiki/Modulo_operation))

Then the whole pattern repeats. Hence the following method:

Multiply

*   the _right_ most digit of the number with the _left_ most number in the sequence shown above,
*   the second _right_ most digit with the second _left_ most digit of the number in the sequence.

The cycle goes on and you sum all these products. Repeat this process until the sequence of sums is **stationary**.

#### Example:

What is the remainder when `1234567` is divided by `13`?

    7      6     5      4     3     2     1  (digits of 1234567 from the right)
    ×      ×     ×      ×     ×     ×     ×  (multiplication)
    1     10     9     12     3     4     1  (the repeating sequence)

Therefore following the method we get:

`7×1 + 6×10 + 5×9 + 4×12 + 3×3 + 2×4 + 1×1 = 178`

We repeat the process with the number 178:

`8x1 + 7x10 + 1x9 = 87`

and again with 87:

`7x1 + 8x10 = 87`

From now on the sequence is **stationary** (we always get `87`) and the remainder of `1234567` by `13` is the same as the remainder of `87` by `13` ( i.e `9`).

#### Task:

Call `thirt` the function which processes this sequence of operations on an integer `n (>=0)`. `thirt` will return the **stationary** number.

`thirt(1234567)` calculates 178, then 87, then 87 and returns `87`.

`thirt(321)` calculates 48, 48 and returns `48`
*/

// with Loops
const thirtLoop = (num) => {
    /** PseudoCode
     *
     *  input (num: number)
     *
     *  imut sequence: number[] = [1, 10, 9, 12, 3, 4]
     *  mut result: number = num
     *  mut tmp: number = sqrt(num * num)
     *
     *  mut identicalResultSum: boolean = false
     *  start while (not identicalResultSum)
     *      mut i: number = 0
     *      mut sum: number = 0
     *      start while (tmp > 0)
     *          sum = sum + (tmp % 10) * sequence[i % sequence.length]
     *          tmp = floor(tmp / 10)
     *
     *          i = i + 1
     *          end while
     *
     *      identicalResultSum = result equal sum
     *
     *      result = sum
     *      tmp = sum
     *      end while
     *
     *  output: number result
     */

    const sequence = [1, 10, 9, 12, 3, 4];
    let result = num;
    let tmp = Math.sqrt(num * num);

    let identicalResultSum = false;
    while (!identicalResultSum) {
        let i = 0;
        let sum = 0;
        while (tmp > 0) {
            sum += (tmp % 10) * sequence[i % sequence.length];
            tmp = Math.floor(tmp / 10);

            i++;
        }

        identicalResultSum = result === sum;

        result = sum;
        tmp = result;
    }
    return tmp;
};

// with Algo
function thirtAlgo(n) {
    // recrusive
    // https://www.codewars.com/kata/reviews/56405b5b14a5373480000115/groups/5640fd8486ba719dd7000027
    const nums = [1, 10, 9, 12, 3, 4];
    var sum = ("" + n)
        .split("")
        .reverse()
        .reduce((sum, v, i) => sum + v * nums[i % nums.length], 0);
    return sum === n ? n : thirtAlgo(sum);
}

console.log(thirtAlgo(1234567));
