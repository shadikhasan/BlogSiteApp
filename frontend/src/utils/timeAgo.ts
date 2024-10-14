// src/utils/timeAgo.ts

export const timeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    // Calculate time intervals
    const years = Math.floor(seconds / 31536000);
    const months = Math.floor(seconds / 2592000);
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor(seconds / 60);

    // Determine the appropriate time format
    if (years >= 1) {
        return `${years} বছর আগে`;
    }
    if (months >= 1) {
        return `${months} মাস আগে`;
    }
    if (days >= 1) {
        return `${days} দিন আগে`;
    }
    if (hours >= 1) {
        const remainingMinutes = minutes % 60; // Calculate remaining minutes
        return remainingMinutes > 0 
            ? `${hours} ঘন্টা ${remainingMinutes} মিনিট আগে` 
            : `${hours} ঘন্টা আগে`;
    }
    if (minutes >= 1) {
        return `${minutes} মিনিট আগে`;
    }
    return 'এক মিনিট আগে'; // Fallback for very recent times
};
