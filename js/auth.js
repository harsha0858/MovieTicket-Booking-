const USER_KEY =
    "movieBookUsers";

const CURRENT_USER_KEY =
    "movieBookCurrentUser";

export const getUsers = () => {
    const data =
        localStorage.getItem(USER_KEY);
    return data
        ? JSON.parse(data)
        : [];
};

export const registerUser = (user) => {

    const users =
        getUsers();
    const emailExists =
        users.some(
            item =>
                item.email === user.email
        );

    if (emailExists) {
        throw new Error(

            "Email already registered"
        );
    }
    users.push(user);

    localStorage.setItem(
        USER_KEY,
        JSON.stringify(users)
    );
};

export const loginUser = (
    email,
    password
) => {
    const users =
        getUsers();
    const user =
        users.find(
            item =>
                item.email === email &&
                item.password === password
        );
    if (!user) {
        throw new Error(
            "Invalid email or password"
        );
    }
    localStorage.setItem(
        CURRENT_USER_KEY,
        JSON.stringify(user)
    );
    return user;
};

export const getCurrentUser = () => {
    const data =
        localStorage.getItem(
            CURRENT_USER_KEY
        );
    return data
        ? JSON.parse(data)
        : null;

};

export const logoutUser = () => {
    localStorage.removeItem(
        CURRENT_USER_KEY
    );
};