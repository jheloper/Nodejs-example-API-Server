const Sequelize = require('sequelize');
const sequelize = new Sequelize('node_api_codlab', 'root', '1234');

const User = sequelize.define('user', {
  name: Sequelize.STRING
});

module.exports = {
  sequelize: sequelize,
  User: User
};
