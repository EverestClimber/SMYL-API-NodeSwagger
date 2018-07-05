/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('CompanyStats', {
		CompanyStatsId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		CompanyId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: 'Companies',
				key: 'CompanyId'
			}
		},
		IntervalId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: 'lookupInterval',
				key: 'IntervalId'
			}
		},
		EmailTrafficComparison: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		Usedcount: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		UsersCount: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		MostPopularSuggestionId: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		HappiestUserId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: 'Users',
				key: 'UserId'
			}
		},
		MostNegativeUserId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: 'Users',
				key: 'UserId'
			}
		},
		InappropriateWordCount: {
			type: DataTypes.INTEGER,
			allowNull: false
		}
	}, {
		tableName: 'CompanyStats'
	});
};
