export default function payment_system(cardNumber){
    switch (cardNumber.slice(0, 1)){
        case '2':
            return 'Mir'
        case '4':
            return 'Visa'
        case '5':
            return 'MasterCard';
        default:
            return '';
    }
}