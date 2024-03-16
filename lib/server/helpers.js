/**
 * 
 * @param {*} ms 
 * @returns 
 */
export const delay = async (ms = 5000) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}