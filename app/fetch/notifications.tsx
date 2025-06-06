import { getToken } from "../store/token";
import apiClient from "../api/refresh";



export async function getNotifications(): Promise<any> {
    try {
        const access_token = await getToken('accessToken');
        const response = await apiClient.get<any>('/comments', {
            headers: { Authorization: `Bearer ${access_token}` },
        });
        console.log('User data:', response.data);
        return response.data;
    } catch (error: any) {
        console.error('Failed to fetch user data:', error.response?.status || error.message);
        return null;
    }
}

export async function getComment(commentID : string): Promise<any> {
    try {
        const access_token = await getToken('accessToken');
        const response = await apiClient.get<any>('/comments', {
            params : { comment_id : commentID},
            headers: { Authorization: `Bearer ${access_token}` },
        });
        console.log('User data:', response.data);
        return response.data;
    } catch (error: any) {
        console.error('Failed to fetch user data:', error.response?.status || error.message);
        return null;
    }
}
