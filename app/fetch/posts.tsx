import { getToken } from "../store/token";
import apiClient from "../api/refresh";
import { PostData } from "../interfaces/post";

/**
 * GET USER
 * @returns Promise<JSON>
 * @async 
 */
export async function getListPosts(): Promise<PostData | null> {
    try {
        const access_token = await getToken('accessToken');
        const response = await apiClient.get<PostData>('/posts', {
            headers: { Authorization: `Bearer ${access_token}` },
        });
        console.log('User data:', response.data);
        return response.data;
    } catch (error: any) {
        console.error('Failed to fetch user data:', error.response?.status || error.message);
        return null;
    }
}

export async function getPost(postID : String) : Promise<PostData | null> {
    try {
        const access_token = await getToken('accessToken');
        const response = await apiClient.get<any>('/posts', {
            params : { user_id : postID },
            headers: { Authorization: `Bearer ${access_token}` },
        });
        return response.data;
    } catch (error: any) {
        console.error('Failed to fetch user data:', error.response?.status || error.message);
        return null;
    }
}
//should probably not be used.
export async function createPost(data : JSON) : Promise<any> {
    try {
        const access_token = await getToken('accessToken');
        const response = await apiClient.post<any>('/post/', data , {
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
export async function deletePost(postID : String): Promise<any> {
    try {
        const access_token = await getToken('accessToken');
        const response = await apiClient.delete<PostData>(`/post/${postID}`, {
            headers: { Authorization: `Bearer ${access_token}` },
        });
        console.log('User data:', response.data);
        return response.data;
    } catch (error: any) {
        console.error('Failed to fetch user data:', error.response?.status || error.message);
        return null;
    }
}

export async function updatePosts(data : JSON, postID : String): Promise<any> {
    try {
        const access_token = await getToken('accessToken');

        const response = await apiClient.put<PostData>('/users/', data , {
            params : {post_id : postID},
            headers: { Authorization: `Bearer ${access_token}` },
        });
        console.log('User data:', response.data);
        return response.data;
    } catch (error: any) {
        console.error('Failed to fetch user data:', error.response?.status || error.message);
        return null;
    }
}


