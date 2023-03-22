const { createObjectCsvWriter } = require('csv-writer');

// TODO. It is possible to use Excel format. This allow to add formatting and group tasks in header by stages
const generateCvsReport = async (usersChallenges, challenges) => {
    // TODO. Proper naming
    const fileName = './codewars_report_' + Date.now() + '.csv';

    const challengesHeaders = challenges.map((challenge) => {
        return {
            id: challenge.id,
            title: challenge.name,
        }
    });

    const userRecords = Object.entries(usersChallenges).map(([userName, solveChallenges]) => {
        const record = {
            userName,
            additionalTasksSolved: 0,
        }

        // TODO. Make sure that it is right way to compare
        const solvedChallengeIds = new Set(solveChallenges.map(({id}) => id));

        for (const challenge of challenges) {
            if (solvedChallengeIds.has(challenge.id)) {
                record[challenge.id] = 'Solved';
            } else {
                record[challenge.id] = '<nope>';
                record.additionalTasksSolved++;
            }
        }

        return record;
    })

    const csvWriter = createObjectCsvWriter({
        path: fileName,
        header: [
            { id: 'userName', title: 'User name' },
            ...challengesHeaders,
            { id: 'additionalTasksSolved', title: 'Additional tasks solved' },
        ]
    });

    // TODO. Error handling
    await csvWriter.writeRecords(userRecords);
}

module.exports = {
    generateCvsReport,
}
