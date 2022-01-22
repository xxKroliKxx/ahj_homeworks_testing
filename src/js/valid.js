export default function valid(cardNumber) {
  if (!/^[0-9]{16}$/.test(cardNumber)) {
    return false;
  }
  let sum = 0;
  for (let i = 0; i < cardNumber.length; i += 1) {
    let intVal = Number(cardNumber.substr(i, 1));
    if (i % 2 === 0) {
      intVal *= 2;
      if (intVal > 9) {
        intVal = 1 + (intVal % 10);
      }
    }
    sum += intVal;
  }
  return (sum % 10) === 0;
}
