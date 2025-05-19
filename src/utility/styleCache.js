// utils/styleCache.js
export const createStyleCache = (styleCreator) => {
  const cache = new WeakMap();
  
  return (theme) => {
    if (!cache.has(theme)) {
      cache.set(theme, styleCreator(theme));
    }
    return cache.get(theme);
  };
};