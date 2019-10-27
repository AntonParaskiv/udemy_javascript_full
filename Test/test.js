function sayName(name) {
  let message = "My name is " + name;
  return message;
}

let arr = [5, -3, 6, -5, 0, -7, 8, 9];
let result = arr.reduce(function(sum, elem) {
  return sum + elem;
});

let assert = require("chai").assert;

describe("sayName", function() {
  it("Получаем фразу с новым именем", function() {
    assert.typeOf(sayName("Alex"), "string");
    assert.equal(sayName("Alex"), "My name is Alex");
  });
});

describe("arr", function() {
  it("Получаем сумму чисел массива", function() {
    assert.equal(result, 13);
  });
});
