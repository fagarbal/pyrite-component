describe("Component", function() {
  var component;

  beforeEach(function() {
    component = document.createElement('example-component');
  });

  it("should be HTMLPyriteComponent", function() {
    expect(component instanceof HTMLPyriteComponent).toBeTruthy();
  });

});
