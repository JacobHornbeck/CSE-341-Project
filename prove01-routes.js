const fs = require('fs')

const routeHandler = (req, res) => {
    if (req.url === '/') {
        res.setHeader('Content-Type', 'text/html')
        res.write(`<html>
            <head><title>Prove 01</title></head>
            <body>
                <form action="/create-user" method="POST">
                    <input type="text" name="username">
                    <input type="submit" value="Send">
                </form>
            </body>
        </html>`)
        return res.end()
    }
    if (req.url === '/users') {
        let listItems = ""
        fs.readFileSync('./prove01-users.txt', 'utf8').split('\n').filter((str_chunk) => {
            return str_chunk != ''
        }).forEach((item) => {
            listItems += "<li>"+item.replace(/\+/, ' ')+"</li>"
        })
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
    }
    if (req.url === '/create-user') {
        const body = []
        req.on('data', chunk => {
            body.push(chunk)
        })
        req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString()
            let nameToAdd = parsedBody.split('=')[1]
            console.log(nameToAdd)
            fs.writeFile('./prove01-users.txt', nameToAdd+'\n', { flag: 'a+' }, err => {})
        })
        res.statusCode = 302
        res.setHeader('Location', '/')
        return res.end()
    }
    res.setHeader('Content-Type', 'text/html')
    res.write(`<html>
        <head><title>Prove 01</title></head>
        <body>
            <p>Sorry, we couldn't find that page.</p>
        </body>
    </html>`)
    res.end()
}

module.exports = routeHandler