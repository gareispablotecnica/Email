const { enviarCorreo } = require('../Utils/Email')
// ---> Importamos la Base de datos
const db = require('../DataBase/db')

const EnviarCorreo = async (req, res) => {

    const { Email, Asunto, Cuerpo } = req.body

    if (!Email || !Asunto || !Cuerpo) {
        return res.status(404).json({ Error: 'Deben Completar los Campos para Continuar' })
        console.error('⛔ Campos Vacios')
    }
   
    // --------------> Email : Tabla de la Base de Datos
    query = 'INSERT INTO Email(Email,Asunto,Cuerpo)VALUES(?,?,?)'  
    
    db.run(query, [Email, Asunto, Cuerpo], async (Error) => {
        if (Error) {
            return res.status(500).json({ Error: 'Error interno' })
            console.error('Error Interno : Revisar Query o Parametros: ', Error)
        }

        // ----> function enviarCorreo(destinatario, asunto, cuerpo) ---> se encuentra en UTILS
            const Correo = await enviarCorreo(Email, Asunto, Cuerpo)
            if (!Correo.success) 
                {
                return res.status(404).json({ Error: 'Error al Enviar el Email' })
            }

            return res.status(201).json({ mensaje: 'Email Enviados' })
    })


}

module.exports = { EnviarCorreo }