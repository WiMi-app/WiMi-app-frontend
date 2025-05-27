import { getToken } from "../store/token";
import apiClient from "../api/refresh";


export async function Like(postID : String): Promise<any> {
    try {
        const access_token = await getToken('accessToken');
        const response = await apiClient.post<any>('/likes', {postID}, {
            headers: { Authorization: `Bearer ${access_token}` },
        });
        console.log('User data:', response.data);
        return response.data;
    } catch (error: any) {
        console.error('Failed to fetch user data:', error.response?.status || error.message);
        return null;
    }
}

export async function unLike(likeID : string): Promise<any> {
    try {
        const access_token = await getToken('accessToken');
        const response = await apiClient.delete<any>('/likes', {
            params : { like_id : likeID},
            headers: { Authorization: `Bearer ${access_token}` },
        });
        console.log('User data:', response.data);
        return response.data;
    } catch (error: any) {
        console.error('Failed to fetch user data:', error.response?.status || error.message);
        return null;
    }
}