const { chat, user } = require("../../models")
const jwt = require('jsonwebtoken')
const Op = require('Sequelize').Op

const getChat = async (socket) => {
  try {
    const token = socket.handshake.auth.token
    
    const secretKey = process.env.SECRET_KEY
    const verified = jwt.verify(token, secretKey)

    const idUserTo = parseInt(socket.handshake.query.id)
    const idUserFrom = verified.id //id User

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

    socket.emit('message', data);

  } catch (error) {
    console.log(error)
  }
}

let countUser = 0;
let interval;

module.exports.respond = (socket) => {
  countUser++
  console.log('user connect : ', countUser);


  if (interval) {
    clearInterval(interval)
  }

  interval = setInterval( () => {
     getChat(socket);
  }, 1000);


  socket.on('disconnect', () => {
    console.log('user disconnect');
    countUser--
    socket.disconnect();
  })

  socket.emit('countUser', countUser)

  //load users
  socket.on('load users', async () => {
    try {
      let users = await user.findAll({
        attributes: {
          exclude: ["createdAt", "updatedAt", "password"],
        },
      });
      socket.emit('users', users);
    } catch (error) {
      console.log(error);
    }
  });

  //load message
  // socket.on('load message', async () => {
    
  // })
  

  socket.on('add message', async (data) => {
    try {
      await chat.create(data)
      await getChat(socket);
    } catch (error) {
      console.log()
    }
  })

}