/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('LookupSuggestions', {
		SuggestionId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true
		},
		Rule: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		ActionId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: 'LookupAction',
				key: 'ActionId'
			}
		}
	}, {
		tableName: 'LookupSuggestions'
	});
};
