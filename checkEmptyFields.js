module.exports = async (currentObj) => {
  try {
    const checkEmptyFields = (async (obj) => {
      for (const prop in obj) {
        if (Array.isArray(obj[prop]) || typeof obj[prop] === 'object') {
          await checkEmptyFields(obj[prop]);
        }

        if (
          obj[prop] === null
          || obj[prop] === ''
          || obj[prop] === undefined
        ) {
          throw `${prop} is empty`;
        }
      }

      return obj;
    });

    const newObj = await checkEmptyFields(JSON.parse(JSON.stringify(currentObj)));

    return newObj;
  } catch (err) {
    throw err;
  }
};
