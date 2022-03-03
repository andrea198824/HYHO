function testWordOrSpaces(word) {
    var RegExpression = new RegExp(/^[a-zA-Z\s]*$/);
    return RegExpression.test(word);
}

function testNumber(number) {
  if (isNaN(number)){
    return false
  } 
  return true
}

  export default {
    testWord,
    testNumber,
  }