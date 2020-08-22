/*
 * @hm myFn :: Number -> String -> Number
 */
const myFn = x => y => parseInt(y, 10) + x

// @hm _myFn :: Number -> String -> Number
function _myFn(x) {
  return function _subFn(y) {
    return parseInt(y, 10) + x
  }
}

// @hm _myMixedFn :: Number -> String -> Number
function _myMixedFn(x) {
  return y => parseInt(y, 10) + x
}

/*
@hm _myComboFn :: Number -> String -> Number
*/
const _myComboFn = x =>
  function _subComboFn(y) {
    return parseInt(y, 10) + x
  }

// functors are cool

// @hm-type Container
function Container(value) {
  this.value = value
  return this
}
// @hm Container.of :: x -> Container x
Container.of = x => new Container(x)
// @hm Container.prototype.map :: (a -> b) -> Container a -> Container b
Container.prototype.map = fn => Container.of(fn(this.value))
