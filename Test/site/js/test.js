describe("Таймер", function() {
  it("Возвращает ли функция объект?", function() {
    assert.typeOf(timer.getTimeRemaining(), "object");
  });
});
