/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('LookupGroupEmails', {
		GroupEmailId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true
		},
		LocalPart: {
			type: DataTypes.STRING,
			allowNull: false
		}
	}, {
		tableName: 'LookupGroupEmails'
	});
};
