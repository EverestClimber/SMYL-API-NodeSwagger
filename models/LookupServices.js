/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('LookupServices', {
		ServiceId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true
		},
		ServiceName: {
			type: DataTypes.STRING,
			allowNull: false
		},
		ServiceKey: {
			type: DataTypes.STRING,
			allowNull: false
		},
		AllowAccess: {
			type: DataTypes.STRING,
			allowNull: false
		}
	}, {
		tableName: 'LookupServices',
		timestamps: false,
	});
};
