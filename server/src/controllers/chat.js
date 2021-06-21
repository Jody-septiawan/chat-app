const { chat, user } = require('../../models')
const Op = require('Sequelize').Op

exports.sendMessage = async (req,res) => {
    try {
        const idUserFrom = req.idUser
        const idUserTo = parseInt(req.params.id)
        const { body } = req
        
        const data = {
            idUserFrom,
            idUserTo,
            message: body.message
        }

        await chat.create(data)

        res.send({
            status: "Success",
            data: {
                chat: data
            }
        })
        
    } catch (error) {
        console.log(error)
        res.status({
            status: 'Failed',
            message: 'Server Error',
        })
    }
}

exports.getMessageById = async (req,res) => {
    try {
        const idUserFrom = req.idUser
        const idUserTo = parseInt(req.params.id)
        
        const data = await chat.findAll({
            include: [{
               model: user,
               as: 'chatTo',
               attributes: {
                exclude: ['createdAt', 'updatedAt', 'password']
               }
            },{
                model: user,
               as: 'chatFrom',
               attributes: {
                exclude: ['createdAt', 'updatedAt', 'password']
               }
            }],
            where: {
                idUserFrom: {
                    [Op.or]: [idUserFrom,idUserTo]
                },
                idUserTo: {
                    [Op.or]: [idUserFrom,idUserTo]
                }
            },
            attributes: {
                exclude: ['createdAt', 'updatedAt', 'idUserFrom', 'idUserTo']
            },
            order: [['createdAt', 'ASC']]
        })

        res.send({
            status: "Success",
            data: {
                chat: data
            }
        })
        
    } catch (error) {
        console.log(error)
        res.status({
            status: 'Failed',
            message: 'Server Error',
        })
    }
}

exports.getMessages = async (req,res) => {
    try {
        const idUserFrom = req.idUser
        
        const data = await chat.findAll({
            where: {
                idUserFrom
            },
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            },
            group: ['chat.idUserTo'],
            order: [['updatedAt', 'DESC']]
        })

        res.send({
            status: "Success",
            data: {
                chat: data
            }
        })
        
    } catch (error) {
        console.log(error)
        res.status({
            status: 'Failed',
            message: 'Server Error',
        })
    }
}