import R from 'ramda';
import { Maybe } from 'ramda-fantasy';

const startsWith = R.curry((prefix, xs) =>
  R.equals(R.take(prefix.length, xs), prefix)
);

const safeMap = R.curry((fn, arr) =>
  R.ifElse(R.is(Array), R.map(fn), R.always([]))(arr)
);

const safeChain = R.curry((fn, arr) =>
  R.ifElse(R.is(Array), R.chain(fn), R.always([]))(arr)
);

const safeReduce = R.curry((fn, init, arr) =>
  R.ifElse(R.is(Array), R.reduce(fn, init), R.always(init))(arr)
);

const safeProp = R.curry((prop, obj) =>
  R.ifElse(R.is(Object), R.prop(prop, obj), R.always(undefined))(obj)
);

const safeFindIndex = R.curry((fn, lst) => {
  if (R.or(R.isNil(lst), R.not(R.is(Array, lst)))) return Maybe.Nothing();

  const indx = R.findIndex(fn, lst);

  return R.equals(-1, indx) ? Maybe.Nothing() : Maybe.Just(indx);
});

const overPath = R.curry((path, fn, obj) =>
  R.ifElse(
    R.pathSatisfies(R.isNil, path),
    R.identity,
    R.ifElse(
      R.always(R.isEmpty(path)),
      R.always(fn(obj)),
      R.over(R.lensPath(path), fn)
    )
  )(obj)
);

const overProp = R.curry((prop, fn, obj) =>
  R.ifElse(
    R.propSatisfies(R.isNil, prop),
    R.identity,
    R.over(R.lensProp(prop), fn)
  )(obj)
);

const viewIndex = R.curry((inx, arr) =>
  R.ifElse(R.isNil, R.always(null), R.view(R.lensIndex(inx)))(arr)
);

const unionAll = (...lst) => R.reduce(R.union, [], lst);

const isNotEquals = R.curry((val1, val2) => R.not(R.equals(val1, val2)));

const isNotNil = R.complement(R.isNil);

const ifNil = R.curry((value, obj) =>
  R.ifElse(R.isNil, R.always(value), R.identity)(obj)
);

const combineWith = R.curryN(2, (newObj, oldObj) => R.merge(oldObj, newObj));

const append = R.curry((x, lst) =>
  R.ifElse(R.is(String), R.always(`${lst}${x}`), R.append(x))(lst)
);

const prepend = R.curry((x, lst) =>
  R.ifElse(R.is(String), R.always(`${x}${lst}`), R.prepend(x))(lst)
);

const propIsNil = R.curry((prop, obj) => R.compose(R.isNil, R.prop(prop))(obj));

const propIsNotNil = R.curry((prop, obj) =>
  R.compose(R.not, propIsNil(prop))(obj)
);

const propIsEmpty = R.curry((prop, obj) =>
  R.compose(R.isEmpty, R.prop(prop))(obj)
);

const propIsNotEmpty = R.curry((prop, obj) =>
  R.compose(R.not, propIsEmpty(prop))(obj)
);

const propIsNotEq = R.curry((prop, value, obj) =>
  R.compose(R.not, R.propEq(prop, value))(obj)
);

const isNotEmpty = R.compose(R.not, R.isEmpty);

const listToObj = R.curry((prop, list) => R.zipObj(R.pluck(prop, list), list));

const getFirstKey = R.compose(R.head, R.keys);

const getInnerPaths = R.compose(
  R.reverse,
  R.last,
  R.mapAccum((acc, x) => [R.append(x, acc), R.append(x, acc)], [])
);

const findChildElem = R.curry((listProp, findFn, obj) =>
  R.compose(
    R.ifElse(R.isNil, R.always(null), R.find(findFn)),
    R.prop(listProp)
  )(obj)
);

const addRemoveItem = R.curry((item, list) => {
  const index = R.findIndex(R.equals(item), list);

  return index > -1
    ? R.concat(
        R.slice(0, index, list),
        R.slice(index + 1, R.length(list), list)
      )
    : R.sort(R.descend(R.identity), R.append(item, list));
});

const or = (...funcList) => obj =>
  R.reduce((result, fn) => result || fn(obj), false, funcList);

const and = (...funcList) => obj =>
  R.reduce((result, fn) => result && fn(obj), true, funcList);

const getOrElse = R.curry((value, maybe) => maybe.getOrElse(value));

const trace = R.curry((msg, x) => {
  console.log(msg, x);
  return x;
});

const log = R.curry((msg, x) => {
  console.log(msg);
  return x;
});

export default {
  ...R,
  safeMap,
  safeChain,
  safeReduce,
  safeFindIndex,
  safeProp,
  startsWith,
  overPath,
  overProp,
  viewIndex,
  unionAll,
  isNotEquals,
  isNotNil,
  ifNil,
  combineWith,
  append,
  prepend,
  propIsNil,
  propIsNotNil,
  propIsEmpty,
  propIsNotEmpty,
  propIsNotEq,
  isNotEmpty,
  or,
  and,
  listToObj,
  getFirstKey,
  getInnerPaths,
  findChildElem,
  addRemoveItem,
  getOrElse,
  trace,
  log
};
