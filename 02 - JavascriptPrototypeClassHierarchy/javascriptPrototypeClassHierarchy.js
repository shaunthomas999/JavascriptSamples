/**
 * Parent Class
 */
var MyParentClass = function() {
  this.myProperty = "parent";
};

MyParentClass.prototype.hello = function() {
  return "hello";
};

/**
 * Child Class
 */
var MyChildClass = function() {
  this.myProperty = "child";
};

MyChildClass.prototype = Object.create(MyParentClass.prototype);
MyChildClass.prototype.constructor = MyChildClass;

/**
 * Object creation and requirements condition checking
 */
var myChildObject = new MyChildClass();

console.log("Child object instanceof check with parent prototype");
console.log(myChildObject instanceof MyParentClass);

console.log("Child object calling parent method");
console.log(myChildObject.hello());