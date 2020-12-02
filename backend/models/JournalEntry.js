module.exports = (sequelize, DataTypes) => {

    const JournalEntry = sequelize.define('JournalEntry', {
        title: { type: DataTypes.STRING, allowNull: false },
        body: { type: DataTypes.TEXT, allowNull: false },
        mood: { type: DataTypes.STRING, allowNull: false }
    }, {tableName: 'journal_entries', underscored: true});

    // set up the associations so we can make queries that include
    // the related objects
    JournalEntry.associate = function({ User }) {
        JournalEntry.belongsTo(User, { onDelete: 'cascade' });
    };

    return JournalEntry;
};
