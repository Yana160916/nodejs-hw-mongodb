const parseGender = (gender) => {
  const isString = typeof gender === 'string';
  if (!isString) return;
  const isGender = (gender) => ['male', 'female', 'other'].includes(gender);

  if (isGender(gender)) return gender;
};

const parseNumber = (number) => {
  const isString = typeof number === 'string';
  if (!isString) return;

  const parsedNumber = parseInt(number);
  if (Number.isNaN(parsedNumber)) {
    return;
  }

  return parsedNumber;
};

const parseBoolean = (value) => {
  if (value === 'true') return true;
  if (value === 'false') return false;
  return;
};

const parseType = (type) => {
  const isString = typeof type === 'string';
  if (!isString) return;
  return type;
};

export const parseFilterParams = (query) => {
  const { gender, maxAge, minAge, maxAvgMark, minAvgMark, type, isFavourite } =
    query;

  const parsedGender = parseGender(gender);
  const parsedMaxAge = parseNumber(maxAge);
  const parsedMinAge = parseNumber(minAge);
  const parsedMaxAvgMark = parseNumber(maxAvgMark);
  const parsedMinAvgMark = parseNumber(minAvgMark);
  const parsedType = parseType(type);
  const parsedIsFavourite = parseBoolean(isFavourite);

  return {
    gender: parsedGender,
    maxAge: parsedMaxAge,
    minAge: parsedMinAge,
    maxAvgMark: parsedMaxAvgMark,
    minAvgMark: parsedMinAvgMark,
    type: parsedType,
    isFavourite: parsedIsFavourite,
  };
};
