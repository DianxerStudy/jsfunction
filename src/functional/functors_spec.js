var support = require('./support');


var validateEmail = email => {
    if(typeof email == 'string'){
        let emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/i;
        return emailRegex.test(email) ? support.Right.of(email)
                                     : support.Left.of('Not a correct email address');
    }
    new support.Left.of('email address is required');
}

var addToMailingList = arr => email => new support.IO(() => {
    let newList = arr.slice(0,arr.length)
    newList.push(email)
    return newList
})

var emailBlast = arr => new support.IO(() => {
    let output = `the email ${arr[arr.length - 1]} has been added into the mail list. ${arr}`
    console.log( output)
    return arr
});

var mailList = ['sean.shen@perficient.com','dianxer@163.com']

var joinMailingList = mail => validateEmail(mail)
                        .map(addToMailingList(mailList))
                        .map(support.chain(emailBlast));
var newIOEither = joinMailingList('hellowo@rldmail.com');
var newMailList  = support.either(support.id,support.unsafecall)(newIOEither);
console.log(newMailList);