const TSDBuilder = function(current, resolvers, customResolvers) {
  this.current = current;
  this.result = '';
  this.resolvers = resolvers;
  this.customResolvers = customResolvers;
};

TSDBuilder.prototype.next = function(strategy) {
  this.result += strategy(this.current, this.resolvers, this.customResolvers);
  return this;
};

TSDBuilder.prototype.end = function() {
  return this.result;
};

module.exports = TSDBuilder;
