/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('LookupPhrases', {
		PhraseId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true
		},
		Phrase: {
			type: DataTypes.STRING,
			allowNull: false
		}
	}, {
		tableName: 'LookupPhrases'
	});
};
