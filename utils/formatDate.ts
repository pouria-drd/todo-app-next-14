function formatDate(dateString: Date | string) {
    const date = new Date(dateString);
    const defaultOptions: Intl.DateTimeFormatOptions = {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        // second: "numeric",
        hour12: false, // Use 24-hour time format by default
    };
    const finalOptions = { ...defaultOptions };
    return date.toLocaleString(undefined, finalOptions);
}

export default formatDate;
