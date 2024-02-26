type HttpMethods = 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE';

// const baseUrl: string = process.env.SURVEY_API as string;
const baseUrl: string = "http://192.168.0.21:8080";

abstract class HttpMethod {

    static instances: { [key: string]: HttpMethod } = {};

    protected constructor(protected method: HttpMethods) {}

    static getInstance<T extends HttpMethod>(this: new () => T): T {
        const className = this.name;
        if (!HttpMethod.instances[className]) {
            HttpMethod.instances[className] = new this();
        }

        return HttpMethod.instances[className] as T;
    }

    async call<T>(path: string, data?: object): Promise<T> {
        return new Promise<T>((resolve, reject) => {
            fetch(`${baseUrl}${path}`, {
                method: this.method,
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: data ? JSON.stringify(data) : null,
            }).then((response) => {
                if (!response.ok) {
                    reject(response);
                    return false;
                }
                resolve(response.json() as T);
            }).catch((error) => {
                reject(error);
            })
        })
    }
}

class GetMethod extends HttpMethod {
    constructor() {
        super('GET');
    }
}

class PostMethod extends HttpMethod {
    constructor() {
        super('POST');
    }
}

class PatchMethod extends HttpMethod {
    constructor() {
        super('PATCH');
    }
}

class PutMethod extends HttpMethod {
    constructor() {
        super('PUT');
    }
}

class DeleteMethod extends HttpMethod {
    constructor() {
        super('DELETE');
    }
}

export function get<T>(url: string): Promise<T> {
    return GetMethod.getInstance().call<T>(url);
}

export function post<T>(url: string, data: object): Promise<T> {
    return PostMethod.getInstance().call<T>(url, data);
}

export function patch<T>(url: string, data: object): Promise<T> {
    return PatchMethod.getInstance().call<T>(url, data);
}

export function put<T>(url: string, data: object): Promise<T> {
    return PutMethod.getInstance().call<T>(url, data);
}

export function del<T>(url: string): Promise<T> {
    return DeleteMethod.getInstance().call<T>(url);
}







