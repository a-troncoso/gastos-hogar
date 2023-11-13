import { dbOperations } from "../dbOperations/";

export const domainSource = {
  localDB: "LOCAL_DB",
  api: "API",
};

export const fetchDomain = (domain, source = domainSource.localDB, params) => {
  if (!params) return dbOperations[domain][source].fetch.fetchAll();
  if (params && params.id)
    return dbOperations[domain][source].fetch.fetchById();
};

export const addDomain = (domain, source = domainSource.localDB, params) =>
  dbOperations[domain][source].add(params);

export const removeDomain = (domain, source = domainSource.localDB, params) =>
  dbOperations[domain][source].remove(params);
