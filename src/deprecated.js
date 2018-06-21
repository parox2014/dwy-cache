const DEFAULT_MSG = 'This function will be removed in future versions.';

export function deprecated(classname,msg='') {
  return function (target, key, descriptor) {
    
    if (typeof descriptor.value !== 'function') {
      throw new SyntaxError('Only functions can be marked as deprecated');
    }

    const methodSignature = `${classname}#${key}`;

    return {
      ...descriptor,
      value: function deprecationWrapper() {
        console.warn(`DEPRECATION ${methodSignature}: ${DEFAULT_MSG}${msg}`);
        return descriptor.value.apply(this, arguments);
      }
    };
  }
}

