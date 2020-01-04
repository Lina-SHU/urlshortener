function sample(array) {
  const index = Math.floor(Math.random() * array.length)
  return array[index]
}

function shortenURL() {
  const lowerCaseLetters = 'abcdefghijklmnopqrstuvwxyz'
  const upperCaseLetters = lowerCaseLetters.toUpperCase()
  const numbers = '1234567890'

  let collection = []
  collection = collection.concat(lowerCaseLetters.split(''))
  collection = collection.concat(upperCaseLetters.split(''))
  collection = collection.concat(numbers.split(''))
  let shortenWords = ''
  for (let i = 0; i < 5; i++) {
    shortenWords += sample(collection)
  }
  return shortenWords
}

module.exports = shortenURL