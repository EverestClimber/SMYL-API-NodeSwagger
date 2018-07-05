/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('UserStats', {
		UserStatsId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		Userid: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: 'Users',
				key: 'UserId'
			}
		},
		WritingStreak: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		ContentCount: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		IntervalId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: 'lookupInterval',
				key: 'IntervalId'
			}
		},
		CompanyRanking: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		UnusualWordsRanking: {
			type: DataTypes.INTEGER,
			allowNull: false
		}
	}, {
		tableName: 'UserStats'
	});
};
