export let savedOnly= false
export let followedOnly= false
export let categories= ['']
export let searchQuery= ""

export function setSaved(newVal : boolean) {
    savedOnly = newVal;
}
export function getSaved() {
    return savedOnly;
}

export function setFollowed(newVal : boolean) {
    followedOnly = newVal;
}
export function getFollowed() {
    return followedOnly;
}

export function addCategory(newCategory : string) {
    categories = [...categories,newCategory];
}
export function getCategories() {
    return categories;
}

export function setQuery(newQuery : string) {
    searchQuery=newQuery;
}
export function getQuery() {
    return searchQuery;
}

export function resetSearch() {
    savedOnly= false
    followedOnly= false
    categories= ['']
    searchQuery= ""
}
