const userId = "userId";

const getUserId = () => localStorage.getItem(userId) ?? "";

const setUserId = (id: string) => localStorage.setItem(userId, id);

const removeUserId = () => localStorage.removeItem(userId);

export { getUserId, setUserId, removeUserId };
