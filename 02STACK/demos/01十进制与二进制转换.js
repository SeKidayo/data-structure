import Stack from "../01Stack";

/**
 * 十进制数转换为二进制数
 * @param {number} decNumber
 * @returns {number} binNumberString
 */
function dec2bin(decNumber) {
  const stack = new Stack();

  let _decNumber = decNumber;

  while(_decNumber > 0) {
    stack.push(_decNumber % 2);

    _decNumber = Math.floor(_decNumber / 2);
  }

  const binNumberStringArray = ['0b'];
  while(!stack.isEmpty()) {
    binNumberStringArray.push(stack.pop());
  }

  return binNumberStringArray.join('');

}


// ------------- test ----------

console.log(dec2bin(444));