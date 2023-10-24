const checkStringLength = (string, length) => string.length <= length;

const isStringPalindrome = (string) => {
  string = string.replaceAll(' ', '').toLowerCase();
  return string === string.split('').reverse().join('');
};


const selectNumbers = (string) => {
  if (!string) {
    return NaN;
  }
  string = string.toString().replace(/[^0-9]/g, '');
  return parseInt(string, 10);
};

checkStringLength('проверяемая строка', 20);
isStringPalindrome('Проверяемая строка');
selectNumbers('12 кефир, 0.5 батона');
