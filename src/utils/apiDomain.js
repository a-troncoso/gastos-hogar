import { fetchDomain, addDomain, removeDomain } from "./domainActions"

const apiDomain = domain => {
  const fetch = params => fetchDomain(domain, params)
  const add = params => addDomain(domain, params)
  const edit = params => {}
  const patch = params => {}
  const remove = params => removeDomain(domain, params)

  return {
    fetch,
    add,
    edit,
    patch,
    remove
  }
}

export default apiDomain
