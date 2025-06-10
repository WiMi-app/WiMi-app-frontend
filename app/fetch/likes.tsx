import { getToken } from "../store/token";
import apiClient from "../api/refresh";


export async function Like(post_id : String): Promise<any> {
    try {
        const access_token = await getToken('accessToken');
        const response = await apiClient.post<any>('/likes/', {post_id}, {
            headers: { Authorization: `Bearer ${access_token}` },
        });
        console.log('User data:', response.data);
        return response.data;
    } catch (error: any) {
        console.error('Failed to fetch likes data:', error.response?.status || error.message);
        return null;
    }
}


export async function getLike(postID : String): Promise<any> {
    try {
        const access_token = await getToken('accessToken');
        const response = await apiClient.get<any>(`/likes/by-post/${postID}/users`, {
            headers: { Authorization: `Bearer ${access_token}` },
        });
        console.log('User data:', response.data);
        return response.data;
    } catch (error: any) {
        console.error('Failed to fetch likes data:', error.response?.status || error.message);
        return null;
    }
}

export async function unLike(like_id : string): Promise<any> {
    try {
        const access_token = await getToken('accessToken');
        const response = await apiClient.delete<any>(`/likes/${like_id}`, {
            headers: { Authorization: `Bearer ${access_token}` },
        });
        console.log('User data:', response.data);
        return response.data;
    } catch (error: any) {
        console.error('Failed to fetch likes data:', error.response?.status || error.message);
        return null;
    }
}