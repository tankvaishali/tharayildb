import express from 'express'

const GetApi = express.Router()

GetApi.get('/get', (req, res) => {
    res.send("successfully logged")
})

export default GetApi