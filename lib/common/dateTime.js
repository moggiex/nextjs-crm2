export const formatDateTime = (dateTime) => {
    // const createdAt = "2024-03-05T20:15:00.907Z";
    const formatter = new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZoneName: 'short',
    });

    const formattedDate = formatter.format(new Date(dateTime));
    return formattedDate;
}

