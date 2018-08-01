/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('UserContents', {
		UserContentId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		SentenceCount: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		UnusualWordCount: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		QuestionsCount: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		ExclamationPointCount: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		LongestSentenceWordCount: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		ClassificationId: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		ContentId: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		UserId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: 'Users',
				key: 'UserId'
			}
		},
		CompanyId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: 'Companies',
				key: 'CompanyId'
			}
		},
		RecipientId: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		AuthoredDate: {
			type: DataTypes.STRING,
			allowNull: false
		},
		ContentsText: {
			type: DataTypes.STRING,
			allowNull: false
		},
		ParentContentId: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		Score: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		CharacterCount: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		WordCount: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		Subject: {
			type: DataTypes.STRING,
			allowNull: false
		},
		MessageConversationId: {
			type: DataTypes.STRING,
			allowNull: false
		},
	}, {
		tableName: 'UserContents',
		timestamps: false,
	});
};
