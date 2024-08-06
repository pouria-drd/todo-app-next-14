/**
 * Fetches all tasks for a specific topic from the API.
 * @param topicID - The ID of the topic to fetch tasks for.
 * @returns A promise that resolves to the list of tasks.
 */
export const getTasksByTopic = async (topicID: string) => {
    // Make a GET request to fetch tasks for a specific topic
    const response = await fetch(`/api/topics/${topicID}/tasks`);
    // Parse the JSON response
    const data = await response.json();
    // Return the list of tasks
    return data;
};

/**
 * Creates a new task for a specific topic.
 * @param topicID - The ID of the topic to create a task for.
 * @param data - An object containing the task content and optionally other properties.
 * @returns A promise that resolves to the newly created task.
 */
export const createTask = async (
    topicID: string,
    data: { content: string }
) => {
    // Make a POST request to create a new task
    const response = await fetch(`/api/topics/${topicID}/tasks`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    // Parse the JSON response
    const result = await response.json();
    // Return the newly created task
    return result;
};

/**
 * Fetches a specific task by its ID from the API.
 * @param topicID - The ID of the topic the task belongs to.
 * @param taskID - The ID of the task to fetch.
 * @returns A promise that resolves to the task details.
 */
export const getTaskById = async (topicID: string, taskID: string) => {
    // Make a GET request to fetch a specific task
    const response = await fetch(`/api/topics/${topicID}/tasks/${taskID}`);
    // Parse the JSON response
    const data = await response.json();
    // Return the task details
    return data;
};

/**
 * Updates a specific task's content or completion status.
 * @param topicID - The ID of the topic the task belongs to.
 * @param taskID - The ID of the task to update.
 * @param data - An object containing the task's updated content and/or completion status.
 * @returns A promise that resolves to the updated task.
 */
export const updateTaskById = async (
    topicID: string,
    taskID: string,
    data: { content?: string; isCompleted?: boolean }
) => {
    // Make a PATCH request to update the task
    const response = await fetch(`/api/topics/${topicID}/tasks/${taskID}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    // Parse the JSON response
    const result = await response.json();
    // Return the updated task
    return result;
};

/**
 * Deletes a specific task by its ID.
 * @param topicID - The ID of the topic the task belongs to.
 * @param taskID - The ID of the task to delete.
 * @returns A promise that resolves to the result of the deletion.
 */
export const deleteTaskById = async (topicID: string, taskID: string) => {
    // Make a DELETE request to remove the task
    const response = await fetch(`/api/topics/${topicID}/tasks/${taskID}`, {
        method: "DELETE",
    });
    // Parse the JSON response
    const result = await response.json();
    // Return the result of the deletion
    return result;
};
