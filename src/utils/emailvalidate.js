export const emailvalidate = (string = "") => {
    return !RegExp(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i).test(string)
}