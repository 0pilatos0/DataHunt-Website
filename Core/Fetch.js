const https = require('https');
require('dotenv').config({path:'../.env'})

module.exports = async function Fetch(url){
    return new Promise((resolve, reject) => {
        if(url.indexOf('?') > -1){
            url = `${url}&key=${process.env.TRELLOKEY}&token=${process.env.TRELLOTOKEN}`
        }
        else{
            url = `${url}?key=${process.env.TRELLOKEY}&token=${process.env.TRELLOTOKEN}`
        }
        https.get(url, (response) => {
            let data = ''

            response.on('data', (chunk) => {
                data += chunk
            })

            response.on('end', () => {
                return resolve(JSON.parse(data))
            })
        })
    })
}