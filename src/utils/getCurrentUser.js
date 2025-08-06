const getCurrentUser = () => {
    try {
        const userStr = localStorage.getItem("currentUser");
        return userStr ? JSON.parse(userStr) : null;
    } catch (err) {
        console.error("Error parsing user data:", err);
        return null;
    }
};

export default getCurrentUser;