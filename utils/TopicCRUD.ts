export const getTopics = async () => {
    const response = await fetch("/api/topics");
    const data = await response.json();
    return data;
};

export const getTopicById = async (topicID: string) => {
    const response = await fetch(`/api/topics/${topicID}`);
    const data = await response.json();
    return data;
};

export const createTopic = async (data: { title: string }) => {
    const response = await fetch("/api/topics", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    const result = await response.json();
    return result;
};

export const updateTopicId = async (
    topicID: string,
    data: { title: string }
) => {
    const response = await fetch(`/api/topics/${topicID}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    const result = await response.json();
    return result;
};

export const deleteTopicById = async (topicID: string) => {
    const response = await fetch(`/api/topics/${topicID}`, {
        method: "DELETE",
    });
    const result = await response.json();
    return result;
};
