export const generateRandomString = () => {
    const characters = 'ABCDEFGHIJKLAMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < 4; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length))
    }
    return result;
};