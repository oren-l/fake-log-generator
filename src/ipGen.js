const _ = require('lodash')

const [
    strNumOfIps
] = process.argv.slice(2)

const numOfIps = parseInt(strNumOfIps, 10)

const randIp = () =>
    _.range(4)
        .map(() => _.random(1, 127))
        .join('.')


console.log(
    _.range(numOfIps)
        .map(randIp)
        .map((ip) => `'${ip}'`)
        .join(',\n')    
);