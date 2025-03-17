import { validate as uuidValidate } from "uuid";

export function validateUuid(uuid: string) {
  const isUuid = uuidValidate(uuid);
  return isUuid;
}
