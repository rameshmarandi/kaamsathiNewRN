

// import axios from 'axios';
// import {fetch} from 'react-native-ssl-pinning';
// import StorageKeys from '../Config/StorageKeys';
// import {getToken, refreshAccessToken} from './AuthService';

// const axiosWithSsl = async config => {
//   try {
//     const {url, method, headers, data, timeout} = config;

//     // Validate URL
//     if (!url || typeof url !== 'string') {
//       throw new Error('Invalid or missing URL for SSL Pinning');
//     }

//     // Construct full URL
//     // const fullURL = `https://esourcing.icicibank.com/ERSystemAPI2/${url}`;
//     const fullURL = `${StorageKeys.API_BASE_URL}${url}`;
//     console.log('SSL Pinning Request Config:', {
//       url,
//       method,
//       headers,
//       data,
//       fullURL,
//     });

//     // Prepare the body content
//     let bodyContent;

//     if (data) {
//       // Check if data is an object (excluding FormData)
//       if (data instanceof FormData) {
//         bodyContent = data; // Directly use FormData as body content
//       } else if (typeof data === 'object') {
//         bodyContent = JSON.stringify(data); // Stringify the object
//       } else if (typeof data === 'string') {
//         bodyContent = data; // Handle stringified or encoded payload
//       }
//     }

//     // If POST request, ensure there is body content
//     if (method.toUpperCase() === 'POST' && !bodyContent) {
//       throw new Error('POST requests must have a request body');
//     }

//     // Perform the fetch request with SSL Pinning
//     const response = await fetch(fullURL, {
//       method: method?.toUpperCase() || 'GET', // Default to GET if method is undefined
//       headers: {
//         ...headers,
//         ...(data instanceof FormData
//           ? {} // Do not set Content-Type for FormData, fetch handles it
//           : {'Content-Type': 'application/json'}), // Default Content-Type for JSON
//       },
//       body: bodyContent, // Attach the body content
//       sslPinning: {
//         // certs: ['ServerCertificate', 'Intermediate', 'Root'],

//         certs: ['cert'], // Replace 'cert' with the actual certificate name (no extension)
//       },
//       timeoutInterval: timeout || 15000, // Default timeout 15s
//     });

//     // Parse response data if available
//     let responseData = null;
//     if (response.bodyString) {
//       try {
//         responseData = JSON.parse(response.bodyString);
//       } catch (error) {
//         console.warn('Failed to parse response body:', error);
//       }
//     }

//     console.log('SSL Pinning Response:', {
//       status: response.status,
//       statusText: response.statusText,
//       headers: response.headers,
//       data: responseData,
//     });

//     return {
//       data: responseData,
//       status: response.status,
//       statusText: response.statusText,
//       headers: response.headers,
//       config,
//     };
//   } catch (error) {
//     console.error('SSL Pinning Error:', error);
//     throw new Error(
//       `SSL Pinning request failed for URL: ${config.url || 'Unknown'}. ${
//         error.message
//       }`,
//     );
//   }
// };

// // Create Axios instances for public and authenticated API requests
// const publicAxiosInstance = axios.create({
//   baseURL: StorageKeys.API_BASE_URL,
//   headers: {'Content-Type': 'application/json'},
// });

// const authAxiosInstance = axios.create({
//   baseURL: StorageKeys.API_BASE_URL,
//   headers: {'Content-Type': 'application/json'},
// });

// // Add custom adapter for SSL pinning for both public and authenticated instances
// publicAxiosInstance.defaults.adapter = config => axiosWithSsl(config);
// authAxiosInstance.defaults.adapter = config => axiosWithSsl(config);

// // Add request interceptors for public and authenticated instances
// publicAxiosInstance.interceptors.request.use(
//   config => {
//     const fullURL = `${config.baseURL}${config.url}`;
//     console.log('Public Request URL:', fullURL);
//     return config;
//   },
//   error => Promise.reject(error),
// );

// authAxiosInstance.interceptors.request.use(
//   async config => {
//     const token = await getToken(); // Get the access token
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`; // Attach token if available
//     }
//     return config;
//   },
//   error => Promise.reject(error),
// );

// // Export the API service with public and private methods
// const apiService = {
//   // Public API requests
//   getPublic: (endpoint, params = {}) =>
//     publicAxiosInstance.get(endpoint, {params}),

//   postPublic: (endpoint, data, headers = {}) =>
//     publicAxiosInstance.post(endpoint, data, {headers}),

//   postPublicFormData: (endpoint, formData) =>
//     publicAxiosInstance.post(endpoint, formData, {
//       headers: {'Content-Type': 'multipart/form-data'},
//     }),

//   // Authenticated API requests
//   getProtected: (endpoint, params = {}) =>
//     authAxiosInstance.get(endpoint, {params}),

//   postProtected: (endpoint, data, headers = {}) =>
//     authAxiosInstance.post(endpoint, data, {headers}),

//   postProtectedFormData: (endpoint, formData) =>
//     authAxiosInstance.post(endpoint, formData, {
//       headers: {'Content-Type': 'multipart/form-data'},
//     }),

//   putProtected: (endpoint, data, headers = {}) =>
//     authAxiosInstance.put(endpoint, data, {headers}),

//   deleteProtected: (endpoint, headers = {}) =>
//     authAxiosInstance.delete(endpoint, {headers}),
// };

// export default apiService;
