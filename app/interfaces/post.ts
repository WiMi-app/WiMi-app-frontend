export type PostData = {
  "id": "string",
  "user_id": "string",
  "content": "string",
  "media_urls": [
    "string"
  ],
  "location": "string",
  "is_private": true,
  "created_at": "string",
  "updated_at": "string",
  "edited": true,
  "challenge_id": "string",
  "is_endorsed": false,
  "endorsement_info": {
    "is_endorsed": false,
    "endorsement_count": 0,
    "pending_endorsement_count": 0,
    "endorser_ids": []
  }
}; 


export type postPush = {
  content : string,
  media_urls : string[],
  location : string,
  is_private : boolean,
  challenge_id : string | string[],
}

export type UserPostData = {
  id: string;
  username: string;
  profile_pic: string;
  elapsed_post_time: string;
  challenge: string;
  post_photo: string;
  description: string;
  likes: string[];
  comments: number;
};