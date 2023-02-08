const jsonSafeParse = (str, defaultValue = {}) => {
  try {
    return JSON.parse(str) || defaultValue;
  } catch(e) {
    return defaultValue
  }
};

export default jsonSafeParse;
