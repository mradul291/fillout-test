
function compareValues(responseValue, inputValue, condition) {
    if (typeof responseValue === 'string' && responseValue.includes('T')) {
        responseValue = new Date(responseValue);
    }
    if (typeof inputValue === 'string' && inputValue.includes('T')) {
        inputValue = new Date(inputValue);
    }
    switch (condition) {
        case 'equals':
            return responseValue === inputValue;
        case 'does_not_equal':
            return responseValue !== inputValue;
        case 'greater_than':
            return responseValue > inputValue;
        case 'less_than':
            return responseValue < inputValue;
        default:
            throw new Error(`Invalid condition: ${condition}`);
    }
}


function filterData(responses, inputs) {
    return responses
        .map((response) => {
            const matchedQuestions = response.questions.filter((question) => {
                return inputs.some((input) => {
                    return question.id === input.id && compareValues(question.value, input.value, input.condition);
                });
            });

            return inputs.every((input) =>
                matchedQuestions.some(
                    (question) =>
                        question.id === input.id && compareValues(question.value, input.value, input.condition)
                )
            )
                ? {
                    ...response,
                    questions: matchedQuestions.length > 0 ? matchedQuestions : undefined,
                }
                : null;
        })
        .filter(Boolean);
}

module.exports = { filterData }