import { getToken } from "../store/token";
import apiClient from "../api/refresh";
import { UserData } from "../interfaces/user";
/**
 * GET USER
 * @returns Promise<JSON>
 * @async 
 */
export async function getMyData(): Promise<UserData | null> {
    try {
        const access_token = await getToken('accessToken');
        const response = await apiClient.get<UserData>('/users/me', {
            headers: { Authorization: `Bearer ${access_token}` },
        });
        return response.data;
    } catch (error: any) {

        console.error('Failed to fetch user data:', error.response?.status || error.message);
        return null;
    }
}

export async function editMyData(data : JSON) : Promise<any> {
    try {
        const access_token = await getToken('accessToken');
        const response = await apiClient.put<any>('/users/me', data, {
            headers: { Authorization: `Bearer ${access_token}` },
        });
        return response.data;
    } catch (error: any) {
        console.error('Failed to fetch user data:', error.response?.status || error.message);
        return null;
    }
}
//should probably not be used.
export async function deleteMyData(userID : String) : Promise<any> {
    try {
        const access_token = await getToken('accessToken');
        const response = await apiClient.delete<any>(`/users/${userID}`,{
            headers: { Authorization: `Bearer ${access_token}` },
        });
        return response.data;
    } catch (error: any) {
        console.error('Failed to fetch user data:', error.response?.status || error.message);
        return null;
    }
}
/**
 * 
 * @param userID 
 * @param type activate this bit if you want to find by username
 * @returns 
 */
export async function getUserData(userID : String): Promise<UserData | null> {
    try {
        const access_token = await getToken('accessToken');
        const response = await apiClient.get<UserData>(`/users/${userID}`, {
            headers: { Authorization: `Bearer ${access_token}` },
        });
        return response.data;
    } catch (error: any) {
        console.error('Failed to fetch user data:', error.response?.status || error.message);
        return null;
    }
}

/**
 * 
 * @param userID 
 * @param type activate this bit if you want to find by username
 * @returns 
 */
export async function getUserDataByUsername(username : String | null): Promise<UserData | null> {
    try {
        console.log(username);
        const access_token = await getToken('accessToken');
        const response = await apiClient.get<UserData>(`/users/by-username/${username}`, {
            headers: { Authorization: `Bearer ${access_token}` },
        });
        return response.data;
    } catch (error: any) {
        console.error('Failed to fetch user data:', error.response?.status || error.message);
        return null;
    }
}

export async function SearchUsers(query:string): Promise<UserData[] | null> {
    try {
        const access_token = await getToken('accessToken');
        const response = await apiClient.get<UserData[]>('/users/search', {
            headers: { Authorization: `Bearer ${access_token}` },
            params: {query}
        });
        return response.data;
    } catch (error: any) {
        console.error('Failed to search users:', error.response?.status || error.message);
        return null;
    }
}

