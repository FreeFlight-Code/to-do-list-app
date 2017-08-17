import superagent from 'superagent';

const methods = ['get', 'post', 'put', 'patch', 'del'];

function formatUrl(path) {
    const adjustedPath = path[0] !== '/' ? '/' + path : path;
    return '/api' + adjustedPath;
}

export default class ApiClient {
    constructor(req) {
        methods.forEach((method) =>
            this[method] = (path, {params, data} = {}) => new Promise((resolve, reject) => {
                const request = superagent[method](formatUrl(path));

                if (params) {
                    request.query(params);
                }

                if (data) {
                    request.send(data);
                }

                request.end((err, {body} = {}) => {
                    return err ? reject(body || err) : resolve(body)
                });
            }));
    }
}