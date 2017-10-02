import Users from '../models/users.js'

exports.newUser = (req, res) => {
  const userFName = req.body.firstName;
  const userSurname = req.nody.surname;
  const userEmail = req.body.email;
  const userPassword = req.body.password;
  if (userFName && userSurname && userEmail && userPassword) {
    users.create({ //if parameters were sent
      firstName: userFName,
      surname: userSurname,
      email: userEmail,
      password: userPassword,
    })
      .then((userCreated) => {
        res.status(201).json({
          status: 'Success',
          data: {
            userName: `${userCreated.firstName} ${userCreated.surname}`,
          },
        });
      }) //if unsuccessful
      .catch(error => res.status(400).send(error));
  } else {
    response.status(400).json({
      status: 'Unsuccessful', message: 'Missing data input'
    });
  }
}
