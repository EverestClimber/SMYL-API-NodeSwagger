/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('lookupInterval', {
		IntervalId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		IntervalStartDate: {
			type: DataTypes.DATEONLY,
			allowNull: false
		},
		IntervalEndDate: {
			type: DataTypes.DATEONLY,
			allowNull: false
		}
	}, {
		tableName: 'lookupInterval'
	});
};
