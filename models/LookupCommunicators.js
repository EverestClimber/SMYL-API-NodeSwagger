/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('LookupCommunicators', {
		CommunicatorId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true
		},
		CommunicatorName: {
			type: DataTypes.STRING,
			allowNull: false
		},
		Summary: {
			type: DataTypes.STRING,
			allowNull: false
		}
	}, {
		tableName: 'LookupCommunicators'
	});
};
