import { getToken } from "../store/token";
import apiClient from "../api/refresh";
import { ChallengePush } from "../interfaces/challenge";


export async function createChallenge(content : ChallengePush): Promise<any> {
    try {
        const access_token = await getToken('accessToken');
        console.log(content);
        const response = await apiClient.post<any>('/challenges/', content, {
            headers: { Authorization: `Bearer ${access_token}` },
        });
        return response.data;
    } catch (error: any) {
        console.error('Failed to fetch challenge data:', error.response?.status || error.message);
        return null;
    }
}

export async function getChallengeList(): Promise<any> {
    try {
        const access_token = await getToken('accessToken');
        const response = await apiClient.get<any>('/challenges', {
            headers: { Authorization: `Bearer ${access_token}` },
        });
        return response.data;
    } catch (error: any) {
        console.error('Failed to fetch challenge data:', error.response?.status || error.message);
        return null;
    }
}

export async function getChallenge(challengeID : string): Promise<any> {
    try {
        const access_token = await getToken('accessToken');
        const response = await apiClient.get<any>(`/challenges/${challengeID}`,{
            headers: { Authorization: `Bearer ${access_token}` },
        });
        return response.data;
    } catch (error: any) {
        console.error('Failed to fetch challenge data:', error.response?.status || error.message);
        return null;
    }
}

export async function updateChallenge(challengeID : string, content : JSON): Promise<any> {
    try {
        const access_token = await getToken('accessToken');
        const response = await apiClient.put<any>('/challenges/', content,  {
            headers: { Authorization: `Bearer ${access_token}` },
        });
        return response.data;
    } catch (error: any) {
        console.error('Failed to fetch challenge data:', error.response?.status || error.message);
        return null;
    }
}

export async function deleteChallenge(challengeID : string): Promise<any> {
    try {
        const access_token = await getToken('accessToken');
        const response = await apiClient.delete<any>(`/challenges/${challengeID}`, {
            headers: { Authorization: `Bearer ${access_token}` },
        });
        return response.data;
    } catch (error: any) {
        console.error('Failed to fetch challenge data:', error.response?.status || error.message);
        return null;
    }
}

export async function joinChallenge(challengeID : string): Promise<any> {
    try {
        const access_token = await getToken('accessToken');
        const response = await apiClient.delete<any>(`/challenges/${challengeID}`, {
            headers: { Authorization: `Bearer ${access_token}` },
        });
        return response.data;
    } catch (error: any) {
        console.error('Failed to fetch challenge data:', error.response?.status || error.message);
        return null;
    }
}

export async function leaveChallenge(challengeID : string): Promise<any> {
    try {
        const access_token = await getToken('accessToken');
        const response = await apiClient.delete<any>(`/challenges/${challengeID}`, {
            headers: { Authorization: `Bearer ${access_token}` },
        });
        return response.data;
    } catch (error: any) {
        console.error('Failed to fetch challenge data:', error.response?.status || error.message);
        return null;
    }
}

export async function getChallengeParticipants(  challengeID : string): Promise<any> {
    try {
        const access_token = await getToken('accessToken');
        const response = await apiClient.delete<any>(`/challenges/${challengeID}`, {
            headers: { Authorization: `Bearer ${access_token}` },
        });
        return response.data;
    } catch (error: any) {
        console.error('Failed to fetch challenge data:', error.response?.status || error.message);
        return null;
    }
}

export async function updateChallengeParticipants( challengeID : string, content : JSON ): Promise<any> {
    try {
        const access_token = await getToken('accessToken');
        const response = await apiClient.delete<any>(`/challenges/${challengeID}`, {
            headers: { Authorization: `Bearer ${access_token}` },
        });
        return response.data;
    } catch (error: any) {
        console.error('Failed to fetch challenge data:', error.response?.status || error.message);
        return null;
    }
}

export async function getMyChallenges(followID : string): Promise<any> {
    try {
        const access_token = await getToken('accessToken');
        const response = await apiClient.delete<any>(`/challenges/${followID}`, {
            headers: { Authorization: `Bearer ${access_token}` },
        });
        return response.data;
    } catch (error: any) {
        console.error('Failed to fetch challenge data:', error.response?.status || error.message);
        return null;
    }
}

export async function uploadChallengePhoto(base64_images: (string | null)[]): Promise<any> {
    try {
        const access_token = await getToken('accessToken');
        const response = await apiClient.post<any>('challenges/media/base64', {base64_images}, {
            headers: { Authorization: `Bearer ${access_token}` },
        });
        return response.data;
    } catch (error: any) {
        console.error('Failed to fetch challenge data:', error.response?.data || error.message);
        return null;
    }
}


