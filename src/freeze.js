function _deepFreeze(obj, refs) {
  if (!(obj && typeof obj === 'object')) {
    return obj;
  }
  if (refs.has(obj)) {
    const ref = refs.get(obj);
    return ref;
  }
  refs.set(obj, Object.freeze(Array.isArray(obj) ? [...obj] : { ...obj }));
  const values = Array.isArray(obj) ? obj : Object.values(obj);
  for (let item of values) {
    _deepFreeze(item, refs);
  }
  return obj;
}

export default function deepFreeze(obj) {
  return _deepFreeze(obj, new WeakMap());
}
