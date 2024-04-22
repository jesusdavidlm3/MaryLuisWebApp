export function capitalize(original){
    let firstLetter = original.charAt(0)
    let capitalLetter = firstLetter.toUpperCase()
    let capitalizedWord = `${capitalLetter}${original.slice(1)}`
    return capitalizedWord
}