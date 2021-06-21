const { user } = require('../../models')

exports.getUsers = async (req,res) => {
    try {

    const data = await user.findAll({
        attributes: {
            exclude: ['createdAt', 'updatedAt', 'password']
        }
    })

    res.send({
        status: 'Success',
        data: {
            users: {
                data
            }
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

exports.getUser = async (req,res) => {
    try {

    const id = req.params.id

    const data = await user.findOne({
        where: {
            id
        },
        attributes: {
            exclude: ['createdAt', 'updatedAt', 'password']
        }
    })

    res.send({
        status: 'Success',
        data: {
            user: {
                data
            }
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