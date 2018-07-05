/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('UserPhrases', {
		UserPhraseId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true
		},
		UserId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: 'Users',
				key: 'UserId'
			}
		},
		PhraseId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: 'LookupPhrases',
				key: 'PhraseId'
			}
		},
		UserContentId: {
			type: DataTypes.INTEGER,
			allowNull: false
		}
	}, {
		tableName: 'UserPhrases'
	});
};
