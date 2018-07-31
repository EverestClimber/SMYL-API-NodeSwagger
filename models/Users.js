/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('Users', {
		UserId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
		},
		PrimaryEmail: {
			type: DataTypes.STRING,
			allowNull: false
		},
		SecondaryEmail: {
			type: DataTypes.STRING,
			allowNull: false
		},
		Title: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		FirstName: {
			type: DataTypes.STRING,
			allowNull: false
		},
		LastName: {
			type: DataTypes.STRING,
			allowNull: false
		},
		Language: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		LanguageProficency: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		CompanyId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: 'Companies',
				key: 'CompanyId'
			}
		},
		LastLoggedIn: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		OptInData: {
			type: DataTypes.BOOLEAN,
			allowNull: false
		},
		CommunicatorId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: 'LookupCommunicators',
				key: 'CommunicatorId'
			}
		},
		BelbinPreferred: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		Mbti: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		Gender: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		Status: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		DateOfBirth: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		Password: {
			type: DataTypes.STRING,
			allowNull: true
		},
		DateTimeCreated: {
			type: DataTypes.STRING,
			allowNull: true
		},
		DateTimeModified: {
			type: DataTypes.STRING,
			allowNull: true
		},
		Status: {
			type: DataTypes.INTEGER,
			allowNull: true
		}
	}, {
		tableName: 'Users',
		timestamps: false,
	});
};
