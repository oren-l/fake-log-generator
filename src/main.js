const _ = require('lodash')
const moment = require('moment')
const momentRand = require('moment-random')
const uuidGen = require('uuid-random')

const [
    strNumOfLogLines
] = process.argv.slice(2)

const numOfLogLines = parseInt(strNumOfLogLines, 10)


// <random_ip from array of 5 ip address> - - [<random>] "<GET/POST>" /api/payment/<autopayoff/another_service/another_service/another_service>/?accountId=<random_UUID> HTTP/1.1 <200/401/302/404/500> <random 740 - 1920></random_UUID>

// const randIp = () =>
//     _.range(4)
//         .map(() => _.random(1, 127))
//         .join('.')

// [10/Oct/2000:13:55:36 -0700] 
// [DD/MMM/YYYY:HH:mm:ss ZZ]

const ipList = [
    '58.53.97.113',
    '119.48.44.5',
    '10.57.109.3',
    '67.77.6.108',
    '62.97.72.40',
    '12.126.28.109',
    '95.104.105.3',
    '35.13.94.10',
    '82.15.100.52',
    '46.58.6.7',
    '54.96.28.28',
    '19.105.59.19'
]

const methods = [
    'GET',
    'POST',
]

const statusList = [
    200,
    302,
    400,
    401,
    500,
]

const pathList = [
    'autopayoff',
    'account',
    'beatrix',
    'currency',
    'entitlement',
    'invoice',
    'overdue',
    'profiles',
    'subscription',
    'usage',
    'admin',
]

const start = moment().subtract(14, 'days')
const end = moment()


const generateLogLine = (time) => {
    const ip = _.sample(ipList)
    const bytes = _.random(740, 1920)
    const method = _.sample(methods)
    const path = _.sample(pathList)
    let status = _.sample(statusList)
    let query = ''

    if (path === 'autopayoff' && method == 'GET') {
        const uuid = uuidGen()
        query = `?accountId=${uuid}`
    }

    if (path === 'admin') {
        status = 404
    }
    
    return `${ip} - - [${time}] "${method} /api/payment/${path}/${query} HTTP/1.1" ${status} ${bytes}`
}


let logDates = []

for (let i = 0; i < numOfLogLines; i++) {
    const time = momentRand(end, start)
    logDates.push(time)
}

_(logDates)
    .sortBy((time) => time.unix())
    .forEach((time) => {
        const timeCLF = time.format('DD/MMM/YYYY:HH:mm:ss ZZ')
        console.log(generateLogLine(timeCLF));
    })


// console.log(
//     _.range(15)
//         .map(randIp)
//         .map((ip) => `'${ip}'`)
//         .join(',\n')    
// );


