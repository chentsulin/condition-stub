
module.exports = ConditionStub



function ConditionStub() {
  this._conditions = []
  this._stubs = []
}


ConditionStub.prototype.set = function(cond, stub) {
  this._conditions.push(cond)
  this._stubs.push(stub)
}


ConditionStub.prototype.getStub = function(cond) {
  for (var i = 0; i < this._conditions.length; i++) {
    if (verifyCondition(this._conditions[i])) {
      return this._stubs[i]
    }
  }
}


function verifyCondition(cond) {
  if (typeof cond === 'function') {
    return cond()
  } else if (typeof cond === 'string') {
    return eval(cond)
  } else if (Array.isArray(cond)) {
    for (var i = 0; i < cond.length; i++) {
      if (!verifyCondition(cond[i])) {
        return false
      }
    }
    return true
  } else {
    throw new TypeError('invalid condition type')
  }
}
