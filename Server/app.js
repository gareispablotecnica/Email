const Express= require('express')
const App= Express()

require('dotenv').config()
const PORT=process.env.PORT ||5000

const cors= require('cors')
App.use(cors())
App.use(Express.json())

const router= require('./src/Routers/Enviar.Routes')
App.use('/api',router)


App.listen(PORT, () => {
    console.log(`🚀 http://localhost:${PORT}`)
})