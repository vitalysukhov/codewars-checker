/*
*
*   Based on https://dev.codewars.com/
*
*/

const fetch = require('node-fetch');

const CODEWARS_API_DOMAIN = 'http://www.codewars.com/api/v1';
const CODEWARS_USER_API = CODEWARS_API_DOMAIN + `/users/`;

const getUserCompletedChallengesUrl = (user, page) => {
    return CODEWARS_USER_API + user + `/code-challenges/completed?page=` + page;
}

const fetchUsersChallengesByPage = async (user, page) => {
    const userCompletedChallengesUrl = getUserCompletedChallengesUrl(user, page);
    let response;
    try {
        response = await fetch(userCompletedChallengesUrl);
    } catch (err) {
        throw new Error(`Request to "${CODEWARS_API_DOMAIN}" failed with "${err}"`);
    }

    await validateResponseStatusCode(response, 200);

    try {
        return await response.json();
    } catch (err) {
        throw new Error(`Parsing of "${CODEWARS_API_DOMAIN}" response failed with "${err}"`);
    }
}

const validateResponseStatusCode = async (response, expectedCode) => {
    if (!response.ok && response.status !== expectedCode) {
        const text = await response.text();
        throw new Error(`Request to "${CODEWARS_API_DOMAIN}" failed with "${text}"`);
    }
}


const fetchAllUsersChallenges = async (user) => {
    let responseData = await fetchUsersChallengesByPage(user, 0);
    const challenges = [...responseData.data];
    const totalPages = responseData.totalPages;

    for (let i = 1; i < totalPages; i++) {
        responseData = await fetchUsersChallengesByPage(user, 0);
        challenges.push(...responseData.data)
    }

    return challenges;
}


module.exports = {
    fetchAllUsersChallenges,
}

