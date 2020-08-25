/*
 * @repast myFn :: Number -> String -> Number
 */
const myFn = x => y => parseInt(y, 10) + x

// @repast _myFn :: Number -> String -> Number
function _myFn(x) {
  return function _subFn(y) {
    return parseInt(y, 10) + x
  }
}

// @repast _myMixedFn :: Number -> String -> Number
function _myMixedFn(x) {
  return y => parseInt(y, 10) + x
}

/*
@repast _myComboFn :: Number -> String -> Number
*/
const _myComboFn = x =>
  function _subComboFn(y) {
    return parseInt(y, 10) + x
  }

// functors are cool

// @repast Container = { value: String }

// @repast Container :: x -> Container x
function Container({ value }) {
  this.value = value
  return this
}
// @repast Container.of :: x -> Container x
Container.of = x => new Container({ value: x })
// @repast Container.prototype.map :: (a -> b) -> Container a -> Container b
Container.prototype.map = function map(fn) {
  return Container.of(fn(this.value))
}
