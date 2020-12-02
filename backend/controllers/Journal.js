const { JournalEntry, User } = require('../models');

exports.create = (request, response, next) => {
    // create a new user with the password hash from bcrypt
    JournalEntry.create({
        title: request.body.title,
        body: request.body.body,
        mood: request.body.mood,
    })
        .then(journal => response.json(journal))
        .catch(next);
};

exports.list = (request, response, next) => {
    try {
        console.log('asdfasdf')
        console.log(`User: ${request.user.sub}`)
        // const entry = JournalEntry.findOne({where: {id: request.params.id}});
        const entry = JournalEntry.findOne({
            include: {
                model: User,
                where: {
                    email: request.user.sub
                }
            }
        });

        response.json(entry);
    } catch (error) {
        return response.status(400).send({
            success: false,
            error: error
        });
    }
};

exports.read = (request, response, next) => {
    try {
        console.log('asdfasdf')
        console.log(`User: ${request.user.sub}`)
        // const entry = JournalEntry.findOne({where: {id: request.params.id}});
        const entry = JournalEntry.findOne({
            include: {
                model: User,
                where: {
                    email: request.user.sub
                }
            },
            where: {id: request.params.journalEntryId}});

        response.json(entry);
    } catch (error) {
        return response.status(400).send({
            success: false,
            error: error
        });
    }
};
