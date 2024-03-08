const axios = require('axios');
const { filterData } = require('../utils/filterData');

const authToken = process.env.AUTHTOKEN;
const apiUrl = process.env.APIURL;

const formData = async (req, res) => {
    try {

        const inputData = req.body;
        const formId = req.params.formId;

        const filloutApiResponse = await axios.get(`${apiUrl}/${formId}/submissions`, {
            headers: {
                'Authorization': `Bearer ${authToken}`
            }
        });
        const responses = await filterData(filloutApiResponse.data.responses, inputData);

        const filteredResponses = {
            'responses': responses,
            "pageCount": filloutApiResponse.data.pageCount,
            "totalResponses": responses.length
        };

        res.status(200).json(filteredResponses);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error });
    }
};

module.exports = { formData }