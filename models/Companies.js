/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('Companies', {
		CompanyId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true
		},
		CompanyName: {
			type: DataTypes.STRING,
			allowNull: false
		}
	}, {
		tableName: 'Companies'
	});
};
