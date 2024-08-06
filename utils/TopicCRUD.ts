/**
 * Fetches a list of all topics from the API.
 * @returns A promise that resolves to the list of topics.
 */
export const getTopics = async () => {
    // Make a GET request to fetch all topics
    const response = await fetch("/api/topics");
    // Parse the JSON response
    const data = await response.json();
    // Return the list of topics
    return data;
};

/**
 * Fetches a specific topic by its ID from the API.
 * @param topicID - The ID of the topic to fetch.
 * @returns A promise that resolves to the details of the topic.
 */
export const getTopicById = async (topicID: string) => {
    // Make a GET request to fetch the topic by ID
    const response = await fetch(`/api/topics/${topicID}`);
    // Parse the JSON response
    const data = await response.json();
    // Return the topic details
    return data;
};

/**
 * Creates a new topic.
 * @param data - An object containing the title of the new topic.
 * @returns A promise that resolves to the newly created topic.
 */
export const createTopic = async (data: { title: string }) => {
    // Make a POST request to create a new topic
    const response = await fetch("/api/topics", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    // Parse the JSON response
    const result = await response.json();
    // Return the newly created topic
    return result;
};

/**
 * Updates the title of an existing topic.
 * @param topicID - The ID of the topic to update.
 * @param data - An object containing the new title for the topic.
 * @returns A promise that resolves to the updated topic.
 */
export const updateTopicId = async (
    topicID: string,
    data: { title: string }
) => {
    // Make a PATCH request to update the topic
    const response = await fetch(`/api/topics/${topicID}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    // Parse the JSON response
    const result = await response.json();
    // Return the updated topic
    return result;
};

/**
 * Deletes a specific topic by its ID.
 * @param topicID - The ID of the topic to delete.
 * @returns A promise that resolves to the result of the deletion.
 */
export const deleteTopicById = async (topicID: string) => {
    // Make a DELETE request to remove the topic
    const response = await fetch(`/api/topics/${topicID}`, {
        method: "DELETE",
    });
    // Parse the JSON response
    const result = await response.json();
    // Return the result of the deletion
    return result;
};
