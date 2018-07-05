/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('LookupWords', {
		WordId: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		Word: {
			type: DataTypes.STRING,
			allowNull: true
		},
		WordDefinition: {
			type: DataTypes.STRING,
			allowNull: true
		},
		Inappropriate: {
			type: DataTypes.BOOLEAN,
			allowNull: true
		},
		Unusual: {
			type: DataTypes.BOOLEAN,
			allowNull: true
		}
	}, {
		tableName: 'LookupWords'
	});
};
