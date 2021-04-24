const fs = require('fs')

const routeHandler = (req, res) => {
    let body = []
    switch (req.url) {
        case '/':
            res.setHeader('Content-Type', 'text/html')
            res.write(`<html>
                <head><title>Prove 01</title></head>
                <body>
                    <form action="/create-user" method="POST">
                        <input type="text" name="username" autofocus>
                        <input type="submit" value="Send">
                    </form>
                </body>
            </html>`)
            return res.end()
        break;
        case '/users':
            let listItems = ""
            fs.readFileSync('./prove01-users.txt', 'utf8').split('\n').filter((str_chunk) => {
                return str_chunk != ''
            }).forEach((item, index) => {
                listItems += "<li>"+item.replace(/\+/, ' ')+" <form action='/delete-user' method='POST'><input type='hidden' name='oneToDelete' value='"+index+"'><input type='submit' value='Delete'></form></li>"
            })
            if (listItems.length < 1)
                listItems = "<p>Sorry, we couldn't find any users</p>"
            res.setHeader('Content-Type', 'text/html')
            res.write(`<html>
                <head><title>Prove 01</title></head>
                <body>
                    <ul>
                        ${listItems}
                    </ul>
                </body>
            </html>`)
            return res.end()
        break;
        case '/create-user':
            body = []
            req.on('data', chunk => {
                body.push(chunk)
            })
            req.on('end', () => {
                const parsedBody = Buffer.concat(body).toString()
                const nameToAdd = parsedBody.split('=')[1]
                console.log(nameToAdd)
                fs.writeFile('./prove01-users.txt', nameToAdd+'\n', { flag: 'a+' }, err => {})
            })
            res.statusCode = 302
            res.setHeader('Location', '/')
            return res.end()
        break;
        case '/delete-user':
            body = []
            req.on('data', chunk => {
                body.push(chunk)
            })
            req.on('end', () => {
                const parsedBody = Buffer.concat(body).toString()
                const indexOfOneToRemove = parsedBody.split('=')[1]

                let namesLeft = fs.readFileSync('./prove01-users.txt', 'utf8').split('\n').filter((str_chunk, index) => {
                    return index != indexOfOneToRemove
                })

                let textToWrite = namesLeft.toString().split(',').join('\n')
                console.log(textToWrite)

                fs.writeFile('./prove01-users.txt', textToWrite, err => {})
                res.statusCode = 302
                res.setHeader('Location', '/users')
                return res.end()
            })
        break;
        default:
            res.setHeader('Content-Type', 'text/html')
            res.write(`<html>
                <head><title>Prove 01</title></head>
                <body>
                    <p>Sorry, we couldn't find that page.</p>
                </body>
            </html>`)
            res.end()
        break;
    }
}

module.exports = routeHandler