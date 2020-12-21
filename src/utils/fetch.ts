
export default (path: string, opt: RequestInit = {}) => {
    return fetch(
        `http://localhost:8080/${path}`,
        Object.assign(opt, {
            credentials: 'include',
            headers: {
                'content-type': 'application/json',
                ...opt.headers
            },})
    )
}