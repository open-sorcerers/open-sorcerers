import React from 'react';
import styled from '@emotion/styled';
import { pipe, propOr, replace, toPairs, map } from 'ramda';

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) {
    return;
  }

  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance");
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
}

function _taggedTemplateLiteral(strings, raw) {
  if (!raw) {
    raw = strings.slice(0);
  }

  return Object.freeze(Object.defineProperties(strings, {
    raw: {
      value: Object.freeze(raw)
    }
  }));
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  position: fixed;\n  height: 100vh;\n  width: 1rem;\n  z-index: 100;\n  top: 0;\n  left: ", ";\n  border-left: 1px dashed lime;\n  opacity: 0.1;\n  cursor: crosshair;\n  &:hover {\n    opacity: 1;\n  }\n  &::before {\n    position: absolute;\n    background-color: lime;\n    color: black; \n    content: \"", "\";\n    transform: rotate(-90deg);\n    padding: 0 3rem 0 1rem;\n    width: 10rem;\n    margin-left: -6.25rem;\n    margin-top: 2rem;\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}
var Breakpoint = styled.div(_templateObject(), pipe(propOr(0, "size")), pipe(propOr(false, "label"), replace(/_/g, " ")));
var renderBreakpoints = pipe(toPairs, map(function (_ref) {
  var _ref2 = _slicedToArray(_ref, 2),
      key = _ref2[0],
      px = _ref2[1];

  return {
    size: px,
    label: key
  };
}), function (kids) {
  return function () {
    return React.createElement(React.Fragment, null, map(function (bb) {
      return React.createElement(Breakpoint, Object.assign({
        key: bb.label
      }, bb));
    }, kids));
  };
});

export { Breakpoint, renderBreakpoints };
