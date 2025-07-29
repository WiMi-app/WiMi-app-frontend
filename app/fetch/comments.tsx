import { getToken } from "../store/token";
import apiClient from "../api/refresh";


export async function createComment(data: any): Promise<any> {
    try {
        const access_token = await getToken('accessToken');
        console.log(data);
        const response = await apiClient.post<any>('/comments', data, {
            headers: { Authorization: `Bearer ${access_token}` },
        });
        console.log('comment data:', response.data);
        return response.data;
    } catch (error: any) {
        console.error('Failed to post comment data:', error.response?.status || error.message);
        return null;
    }
}

export async function getCommentList(): Promise<any> {
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

export async function updateComment(commentID : string, content : JSON): Promise<any> {
    try {
        const access_token = await getToken('accessToken');
        const response = await apiClient.put<any>('/comments', content, {
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

export async function deleteComment(commentID : string): Promise<any> {
    try {
        const access_token = await getToken('accessToken');
        const response = await apiClient.delete<any>('/comments', {
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