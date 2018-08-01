/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('LookupServices', {
		ServiceId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true
		},
		ServiceName: {
			type: DataTypes.STRING,
			allowNull: false
		},
		ServiceKey: {
			type: DataTypes.STRING,
			allowNull: false
		},
		AllowAccess: {
			type: DataTypes.STRING,
			allowNull: false
		},
		HistoricMessagesCount: {
			type: DataTypes.INTEGER,
			allowNull: true,
			defaultValue: '((5))'
		},
		HistoricMessageMinChars: {
			type: DataTypes.INTEGER,
			allowNull: true,
			defaultValue: '((300))'
		}
	}, {
		tableName: 'LookupServices',
		timestamps: false,
	});
};
