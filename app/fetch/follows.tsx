import { getToken } from "../store/token";
import apiClient from "../api/refresh";


export async function Follow(UserID : String): Promise<any> {
    try {
        const access_token = await getToken('accessToken');
        const response = await apiClient.post<any>('/follows', {UserID}, {
            headers: { Authorization: `Bearer ${access_token}` },
        });
        console.log('User data:', response.data);
        return response.data;
    } catch (error: any) {
        console.error('Failed to fetch user data:', error.response?.status || error.message);
        return null;
    }
}

export async function unFollow(followID : string): Promise<any> {
    try {
        const access_token = await getToken('accessToken');
        const response = await apiClient.delete<any>(`/follows/${followID}`, {
            headers: { Authorization: `Bearer ${access_token}` },
        });
        console.log('User data:', response.data);
        return response.data;
    } catch (error: any) {
        console.error('Failed to fetch user data:', error.response?.status || error.message);
        return null;
    }
}