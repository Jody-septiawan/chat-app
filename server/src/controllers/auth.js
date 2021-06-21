const { user } = require('../../models')
const joi = require('joi')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.registrasi = async (req,res) => {
    try {
    
    const { username, password } = req.body
    const data = req.body

    const schema = joi.object({
        username: joi.string().min(4).required(),
        password: joi.string().min(4).required()
    })

    const { error } = schema.validate(data)

    if(error){
        return res.send({
            status: 'Failed',
            message: error.details[0].message
        })
    }

    const checkUsername =  await user.findOne({
        where: {
            username
        }
    })

    if(checkUsername){
        return res.send({
            status: 'Failed',
            message: 'Username Already Registered'
        })
    }

    const hashStrenght = 10
    const hashedPassword = await bcrypt.hash(password, hashStrenght)

    const dataUser = await user.create({
        ...data,
        password: hashedPassword
    })

    res.send({
        status: 'Success',
        data: {
            user: {
                username: dataUser.username
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

exports.login = async (req,res) => {
    try {
    
    const { username, password } = req.body
    const data = req.body

    const schema = joi.object({
        username: joi.string().min(4).required(),
        password: joi.string().min(4).required()
    })

    const { error } = schema.validate(data)

    if(error){
        return res.send({
            status: 'Failed',
            message: error.details[0].message
        })
    }

    const checkUsername =  await user.findOne({
        where: {
            username
        }
    })

    if(!checkUsername){
        return res.send({
            status: 'Failed',
            message: "Username and Password don't match"
        })
    }

    const isValidPassword = await bcrypt.compare(password, checkUsername.password)

    if(!isValidPassword){
        return res.send({
            status: 'Failed',
            message: "Username and Password don't match"
        })
    }
    
    const secretKey = process.env.SECRET_KEY

    const token = jwt.sign({
        id: checkUsername.id
    },secretKey)


    res.send({
        status: 'Success',
        data: {
            user: {
                id: checkUsername.id,
                username: checkUsername.username,
                token
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

exports.checkAuth = async (req,res) => {
    try {

        const id = req.idUser

        const dataUser = await user.findOne({
            where: {
                id
            },
            attributes: {
                exclude: ['createdAt', 'updatedAt', 'password']
            }
        })
    
        if(!dataUser){
            return res.status(404).send({
                status: 'failed'
            })
        }


        res.send({
            status: 'success',
            data: {
                user: {
                    id: dataUser.id,
                    username: dataUser.username,
                    email: dataUser.email
                }
            }
        })
        
    } catch (error) {
        console.log(error)
        res.status({
            status: 'failed',
            message: 'Server Error',
        })
    }
}
