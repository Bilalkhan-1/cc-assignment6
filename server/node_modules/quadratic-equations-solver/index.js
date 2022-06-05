module.exports = function solve(a, b, c) {
  if(a == null || b == null || c == null) throw new TypeError("Wrong values!");

  var solution1 = (-1 * b + Math.sqrt(Math.pow(b, 2) + (-4 * a * c))) / (2 * a);
  var solution2 = (-1 * b - Math.sqrt(Math.pow(b, 2) + (-4 * a * c))) / (2 * a);
  var discriminant = Math.pow(b, 2) + (-4 * a * c);
  return [solution1, solution2, discriminant];
};