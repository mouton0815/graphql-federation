import express from 'express'

const PORT = 3000
const app = express()

app.get('/', (req, res) => {
    const data = {
        name: 'Hans',
        year: 2000,
        city: 'Rome'
    }
    res.json(data)
})

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`)
})
