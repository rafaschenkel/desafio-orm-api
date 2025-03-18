import { validate as uuidValidate } from "uuid";

const validateUuid = (uuid: string): boolean => {
  const isUuid = uuidValidate(uuid);
  return isUuid;
};

export default validateUuid;
