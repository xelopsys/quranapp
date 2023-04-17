import humps from 'humps';

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const decamelize = (object: Record<string, string>) => {
  if (!(object && !(object instanceof File))) return object;

  if (object instanceof FormData) {
    const formData = new FormData();
    // eslint-disable-next-line no-restricted-syntax
    for (const [key, value] of object.entries) {
      formData.append(humps.decamelize(key), value);
    }
    return formData;
  }

  if (typeof object === 'object') {
    return humps.decamelizeKeys(object);
  }
  return {};
};

export { wait, decamelize };
