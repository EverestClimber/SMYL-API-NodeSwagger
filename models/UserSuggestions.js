/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('UserSuggestions', {
		UserSuggestionId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		SuggestionId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: 'LookupSuggestions',
				key: 'SuggestionId'
			}
		},
		UserId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: 'Users',
				key: 'UserId'
			}
		},
		ReplacementText: {
			type: DataTypes.STRING,
			allowNull: false
		}
	}, {
		tableName: 'UserSuggestions',
		timestamps: false,
	});
};
