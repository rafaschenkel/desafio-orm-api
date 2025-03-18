const verifyObject = (key: object, value: string): boolean => {
  const result = Object.keys(key).includes(value);
  return result;
};

export default verifyObject;
