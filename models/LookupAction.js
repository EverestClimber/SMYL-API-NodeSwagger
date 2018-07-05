/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('LookupAction', {
		ActionId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true
		},
		ActionText: {
			type: DataTypes.STRING,
			allowNull: false
		}
	}, {
		tableName: 'LookupAction'
	});
};
