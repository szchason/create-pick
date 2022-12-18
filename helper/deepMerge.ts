const isObject = (val) :boolean => val && typeof val === 'object';
const mergeArrayWithDedupe = (a, b) :Record<string, any>[] => Array.from(new Set([ ...a, ...b ]));

function deepMerge(target, obj) :string {
  for (const key of Object.keys(obj)) {
    const oldVal = target[key];
    const newVal = obj[key];

    if (Array.isArray(oldVal) && Array.isArray(newVal)) {
      target[key] = mergeArrayWithDedupe(oldVal, newVal);
    } else if (isObject(oldVal) && isObject(newVal)) {
      target[key] = deepMerge(oldVal, newVal);
    } else {
      target[key] = newVal;
    }
  }

  return target;
}

export default deepMerge;
