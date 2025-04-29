import debounce from 'lodash.debounce';


export const createDebouncedSearch = (searchFunction, delay = 400) => {
  if (typeof searchFunction !== 'function') {
    console.warn('Expected a function in createDebouncedSearch, but received:', typeof searchFunction);
    return () => {};
  }

  const debouncedFn = debounce(searchFunction, delay);

  // Optionally add metadata (for debugging or devtools)
  debouncedFn.originalName = searchFunction.name || 'anonymousFunction';

  return debouncedFn;
};
