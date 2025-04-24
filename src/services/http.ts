type HttpRequestBody =
    | string
    | FormData
    | URLSearchParams
    | Blob
    | File
    | ArrayBuffer
    | ArrayBufferView;

const get = <TResponse>(
    apiBaseURL: string,
    endpoint: string,
    token: string,
): Promise<TResponse> => makeRequest(apiBaseURL, endpoint, "get", undefined, undefined, token);

const put = <TResponse>(
    apiBaseURL: string,
    endpoint: string,
    body: HttpRequestBody = "",
    headers = new Headers(),
    token: string,
): Promise<TResponse> =>
    makeRequest(
        apiBaseURL,
        endpoint,
        "put",
        body,
        setContentTypeJSON(headers),
        token,
    );

/**
 * Post image data to the API
 *
 * @param endpoint url of the endpoint to post the image to
 * @param imageData base64 encoded data URI of the image to post
 * @param headers HTTP headers to include in the request
 * @returns Response from the server
 */
const postImage = <TResponse>(
    apiBaseURL: string,
    endpoint: string,
    imageData: string,
    headers?: Headers
): Promise<TResponse> => {
    const blob = dataURItoBlob(imageData);
    const fileType = blob.type.replace("image/", "");
    const imageDataForm = new FormData();
    imageDataForm.append("image", blob, `image.${fileType}`);
    return makeRequest(apiBaseURL, endpoint, "post", imageDataForm, headers);
};

const post = <TResponse>(
    apiBaseURL: string,
    endpoint: string,
    body: HttpRequestBody = "",
    headers = new Headers(),
    token: string,
): Promise<TResponse> =>
    makeRequest(
        apiBaseURL,
        endpoint,
        "post",
        body,
        setContentTypeJSON(headers),
        token,
    );

// PATCH is required to be in all caps.  http services automatically capitalizes headers for post,put,get,del... but not patch.
const patch = <TResponse>(
    apiBaseURL: string,
    endpoint: string,
    body: HttpRequestBody = "",
    headers = new Headers(),
    token,
): Promise<TResponse> =>
    makeRequest(
        apiBaseURL,
        endpoint,
        "PATCH",
        body,
        setContentTypeJSON(headers),
        token,
    );

const del = <TResponse>(
    apiBaseURL: string,
    endpoint: string,
    body: HttpRequestBody = "",
    headers = new Headers(),
    token: string,
): Promise<TResponse> =>
    makeRequest(
        apiBaseURL,
        endpoint,
        "delete",
        body,
        setContentTypeJSON(headers),
        token,
    );

/**
 * Make a request to the API
 *
 * @param endpoint API endpoint to request, a URL relative to API base URL, ex: `activity/023487` (no leading slash)
 * @param method HTTP method to use
 * @param body Body of the request
 * @param headers Options to put in the Header
 * @returns The parsed response to the request
 */
const makeRequest = async <TResponse>(
    apiBaseURL: string,
    endpoint: string,
    method: string,
    body?: HttpRequestBody,
    headers?: Headers,
    token?: string,
): Promise<TResponse> => {
    const fullUrl = `${apiBaseURL}/${endpoint}`;
    console.log(`Making ${method} request to ${fullUrl}`);
    
    try {
        if (body && typeof body === 'string') {
            console.log(`Request body: ${body.substring(0, 200)}${body.length > 200 ? '...' : ''}`);
        } else if (body) {
            console.log('Request has body of type:', body.constructor.name);
        }
        
        // 处理授权头
        const requestHeaders = await handleAuthHeader(headers ?? new Headers(), token ?? "");
        console.log('Request headers:', Array.from(requestHeaders.entries()));
        
        const response = await fetch(fullUrl, {
            method,
            body,
            headers: requestHeaders,
        });
        
        console.log(`Response status: ${response.status} ${response.statusText}`);
        return parseResponse(response);
    } catch (error) {
        console.error(`Network error during ${method} request to ${fullUrl}:`, error);
        throw error;
    }
};

/**
 * Parse an HTTP response
 *
 * @param res the response to parse
 * @returns Resolves with the response body; Rejects on a non-2xx response code
 */
export const parseResponse = async <TResponse>(
    res: Response
): Promise<TResponse> => {
    try {
        const contentType = res.headers.get('content-type');
        console.log(`Response content-type: ${contentType}`);
        
        // 获取响应文本
        const text = await res.text();
        console.log(`Response text: ${text.substring(0, 200)}${text.length > 200 ? '...' : ''}`);
        
        // 检查是否为JSON
        let data: TResponse;
        if (contentType && contentType.includes('application/json') && text.length) {
            data = JSON.parse(text) as TResponse;
            console.log('Parsed JSON response:', data);
        } else if (text.length) {
            try {
                // 尝试解析为JSON，即使Content-Type不是application/json
                data = JSON.parse(text) as TResponse;
                console.log('Response was parsed as JSON despite content-type:', data);
            } catch (e) {
                // 如果不是JSON，则作为文本返回
                console.log('Response is not JSON, returning as-is');
                data = text as unknown as TResponse;
            }
        } else {
            // 空响应
            data = {} as TResponse;
            console.log('Empty response, returning empty object');
        }

        // 检查响应状态
        if (!res.ok) {
            const error = new Error(
                `Request failed with status ${res.status}: ${res.statusText}`
            );
            // @ts-ignore
            error.response = res;
            // @ts-ignore
            error.data = data;
            console.error('Request failed:', error);
            return Promise.reject(error);
        }

        return data;
    } catch (err) {
        console.error('Error parsing response:', err);
        return Promise.reject(err);
    }
};

const handleAuthHeader = async (headers: Headers, token: string): Promise<Headers> => {
    // 只在提供有效令牌时添加Authorization头
    if (token && token.trim() !== '') {
        console.log("Adding Authorization header with provided token");
        headers.append('Authorization', `Bearer ${token}`);
    } else {
        console.log("No token provided for Authorization header");
    }
    
    // 添加其他可能需要的头
    headers.append('Accept', 'application/json');
    return headers;
};

const setContentTypeJSON = (headers: Headers) => {
    headers.append("Content-Type", "application/json");
    return headers;
};

const dataURItoBlob = (dataURI: string) => {
    // convert base64/URLEncoded data component to raw binary data held in a string
    let byteString;
    if (dataURI.split(",")[0].indexOf("base64") >= 0)
        byteString = atob(dataURI.split(",")[1]);
    // this may be unused. Can't find a place where this else is called.
    else byteString = decodeURIComponent(dataURI.split(",")[1]);

    // separate out the mime component
    let mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];

    // write the bytes of the string to a typed array
    let ia = new Uint8Array(byteString.length);
    for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ia], { type: mimeString });
};

type QueryStringPrimitive = string | number | boolean;
type QueryStringSerializable =
    | QueryStringPrimitive
    | Array<QueryStringPrimitive>
    | undefined;

/**
 * Convert an object into a URL query string.
 *
 * @param queryParams Object containing params to be serialized into a URL query string
 * @returns URL query string of the form `'?key1=value1&key2=value2'`, or an empty string if `queryParams` is `undefined`.
 */
const toQueryString = (
    queryParams?: Record<string | number | symbol, QueryStringSerializable>
): string => {
    if (!queryParams) return "";

    // Instantiate new empty `URLSearchParams` object
    // Note: we cannot use the `new URLSearchParams(obj: Object)` constructor because it only supports
    // string values in the passed-in object.
    const urlSearchParams = new URLSearchParams();

    // Add each property of `queryParams` object to the `urlSearchParams`
    Object.entries(queryParams).forEach(([key, value]) => {
        // Do not serialize `undefined` values
        if (value === undefined) {
            return;
        }

        if (Array.isArray(value)) {
            // If `value` is an array, append each element of the array to the searchParams
            // This is *most* standard way of encoding arrays in a query string, and the only way
            // that the browser-native URLSearchParams API supports
            value.forEach((value) =>
                urlSearchParams.append(key, value.toString())
            );
        } else {
            // For all primitive values, append them directly
            urlSearchParams.append(key, value.toString());
        }
    });

    const queryString = urlSearchParams.toString();

    return queryString ? `?${queryString}` : "";
};

const apiBaseURLs = {
    api: "https://travel-tips-api-epe5bnd7hza6h9eg.westus2-01.azurewebsites.net",
};

const http = {
    del,
    get,
    patch,
    post,
    postImage,
    put,
    toQueryString,
    apiBaseURLs,
};

export default http;