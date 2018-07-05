/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('database_firewall_rules', {
		id: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false
		},
		start_ip_address: {
			type: DataTypes.STRING,
			allowNull: false
		},
		end_ip_address: {
			type: DataTypes.STRING,
			allowNull: false
		},
		create_date: {
			type: DataTypes.DATE,
			allowNull: false
		},
		modify_date: {
			type: DataTypes.DATE,
			allowNull: false
		}
	}, {
		tableName: 'database_firewall_rules'
	});
};
