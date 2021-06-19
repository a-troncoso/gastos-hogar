import { dbOperations } from "../dbOperations/"

export const fetchDomain = (domain, params) => {
  if (!params) return dbOperations[domain].fetch.fetchAll()
  if (params && params.id) return dbOperations[domain].fetch.fetchById()
}

export const addDomain = (domain, params) => dbOperations[domain].add(params)

export const removeDomain = (domain, params) => dbOperations[domain].remove(params)
