const tsTypesMap = {
  'bool': 'boolean'
};

module.exports = propType => tsTypesMap[propType] || propType;
