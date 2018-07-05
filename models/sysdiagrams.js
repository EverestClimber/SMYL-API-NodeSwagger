/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('sysdiagrams', {
		name: {
			type: DataTypes.STRING,
			allowNull: false
		},
		principal_id: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		diagram_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		version: {
			type: DataTypes.INTEGER,
			allowNull: true
		},
		definition: {
			type: "VARBINARY",
			allowNull: true
		}
	}, {
		tableName: 'sysdiagrams'
	});
};
