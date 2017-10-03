import models from '../models'

const User = models.User;

class HandleUser {
  static newUser = (req, res) => {
    const userFName = req.body.firstName;
    const userSurname = req.body.surname;
    const userEmail = req.body.email.toLowerCase();
    const userPassword = req.body.password;
    if (userFName && userSurname && userEmail && userPassword) {
      User.findOne({
        where: { email: userEmail }
      })
        .then((user) => {
          if (!user) {
            User.create({
              firstName: userFName,
              surname: userSurname,
              email: userEmail,
              password: userPassword,
            }).then((userCreated) => {
              res.status(201).json({
                status: 'Success',
                data: {
                  userName: `${userCreated.firstName} ${userCreated.surname}`,
                },
              })
            });
          } else {
            res.status(400).json({
              status: 'Unsuccessful', message: 'Email already exist'
            });
          }
        }) //if unsuccessful
        .catch(error => res.status(400).send(error));
    } else {
      res.status(400).json({
        status: 'Unsuccessful', message: 'Missing data input'
      });
    }
  }

  static userSignIn = (req, res) => {
    const userEmail = req.body.email;
    const userPassword = req.body.password;
    if (userEmail && userPassword) {
      User.findOne({
        where: { email: userEmail }
      })
        .then((user) => {
          if (user.password !== req.body.password) {
            response.status(400).json({
              status: 'Unsuccessful', message: 'Authentification failed, Wrong password'
            });
          } else {
            res.status(201).json({
              status: 'Success', message: 'You are now signed in'
            });
          }
        }) //if unsuccessful
        .catch(error => res.status(400).send(error));
    } else {
      response.status(400).json({
        status: 'Unsuccessful', message: 'Missing data input'
      });
    }
  }
}

export default HandleUser;
