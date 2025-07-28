import { StyleSheet, Text, View, Pressable, TextInput, ScrollView, FlatList } from "react-native"
import {useEffect,useState } from "react";
import ProfileStats from "../components/profile/profilestats";
import { SafeAreaView } from "react-native-safe-area-context";
import ProfilePhoto from "../components/profile/profilephoto";
import {
  FontFamily,
  Color,
  FontSize,
  Gap,
  Border,
  Padding,
} from "../(tabs)/GlobalStyles";
import { useNavigation } from "expo-router";
import { UserData } from "../interfaces/user";
import { UserPostData } from "../interfaces/post";
import Post from "../components/index_home/post";
import { getChallenge } from "../fetch/challenges";
import { getListPosts } from "../fetch/posts";
import { getUserDataByUsername } from "../fetch/user";
import { useLocalSearchParams } from "expo-router";
import handleShareProfile from "../components/profile/shareprofile";

type UserPostProps = {
  postItem: UserPostData;
};

const PostItem = ({postItem}: UserPostProps) => (
  <View style={[{paddingVertical:5}]}>
    <Post
      postId={postItem.id}
      profile_name={postItem.username} 
      num_comments={postItem.comments}
      profile_pic={postItem.profile_pic}
      post_pic={postItem.post_photo}
      challenge={postItem.challenge}
      post_description={postItem.description}/>
    <View style={styles.divider} />    
  </View>
);


const OtherProfileScreen = () => {

  const navigation = useNavigation();
  const [userData, setUserData] = useState<UserData | null>(null);
  const[error, setError] = useState<Boolean>(false);
  const [postData, setPostData] = useState<UserPostData[]>([]);
  const [refreshing, setRefreshing] = useState(false); // new state
  const { username } = useLocalSearchParams();
  useEffect(() => {
    (async () => { 
      console.log(username);
      const data = await getUserDataByUsername(username);
      setUserData(data);
    })();
  }, []);

  const fetchPosts = async () => {
    setRefreshing(true);
    const postData = await getListPosts();
    if (!postData) {
      setRefreshing(false);
      return;
    }

    const posts = await Promise.all(
      postData.map(async (post) => {
        const user = await getUserData(post.user_id);
        const challenge = await getChallenge(post.challenge_id);
        if (user && post && challenge) {
          const userPost: UserPostData = {
            id: post.id,
            user_id: post.user_id,
            username: user.username,
            profile_pic: user.avatar_url,
            elapsed_post_time: post.created_at,
            challenge: challenge.title,
            post_photo: post.media_urls[0],
            description: post.content,
            likes: ["1"], // placeholder
            comments: 4,  // placeholder
          };
          return userPost;
        }
        return null;
      })
    );

    setPostData(posts.filter((p): p is UserPostData => p !== null));
    setRefreshing(false);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <SafeAreaView style={styles.profileScreen} edges={['top', 'left', 'right']}>
        <FlatList
              data={postData}
              renderItem={({ item }) => <PostItem postItem={item} />}
              keyExtractor={(item) => item.id}
              style={{ width: "100%" }}
              showsVerticalScrollIndicator={false}
              refreshing={refreshing}
              onRefresh={fetchPosts}
              ListHeaderComponent={
                <View style={styles.content}>
                  <View style={styles.profileInfoLayout}>
                    <View style={styles.profilePicname}>

                      <ProfilePhoto photo={userData?.avatar_url ? { uri: userData?.avatar_url[0] } :require('../../assets/images/defaultprofile.jpg')} Status={1} size={60}/>

                      <View style={styles.profileName}>
                        <Text style={styles.name}>{userData?.full_name} </Text>
                        <Text style={styles.username}>@{userData?.username}</Text>
                      </View>

                    </View>
                    
                    <ProfileStats posts = {0} followers={1_000_000} following={1_000}/>

                    <View style={styles.profileButtons}>
                      <Pressable style={styles.shareProfileButton} onPress={handleShareProfile}>
                        <Text style={styles.shareProfile}>Share Profile</Text>
                      </Pressable>
                    </View>
                    {userData?.bio ? <Text style={styles.bio} > {userData?.bio} </Text> : null}
                  </View>
                  <View style={styles.photos}>
                    <View style={styles.title}>
                      <Text style={styles.tittle}>My Posts</Text>
                    </View>
                  </View>
                </View>
              }
        />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  profilePicIcon: {
    position: "relative",
    width: 96,
    height: 96,
  },
  name: {
    position: "relative",
    fontSize: 20,
    lineHeight: 25,
    fontWeight: "700",
    fontFamily: FontFamily.interBold,
    color: Color.greyscale900,
    textAlign: "center",
  },
  username: {
    position: "relative",
    fontSize: FontSize.size_sm,
    letterSpacing: 0,
    lineHeight: 22,
    fontWeight: "500",
    fontFamily: FontFamily.interMedium,
    color: Color.greyscale500,
    textAlign: "center",
  },
  profileName: {
    flex: 1,
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    gap: Gap.gap_sm,
  },
  profilePicname: {
    alignSelf: "stretch",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: Gap.gap_lg,
    padding: 1
  },
  editProfile: {
    alignSelf: "stretch",
    position: "relative",
    fontSize: FontSize.size_sm,
    lineHeight: 22,
    fontWeight: "700",
    fontFamily: FontFamily.interBold,
    color: Color.colorBlack,
    textAlign: "center",
  },
  editProfileButton: {
    flex: 0.6754,
    borderRadius: Border.br_8xs,
    borderStyle: "solid",
    borderColor: Color.colorBlack,
    borderWidth: 2,
    height: 30,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 37,
    paddingVertical: 0,
  },
  shareProfile: {
    position: "relative",
    fontSize: FontSize.size_sm,
    lineHeight: 22,
    fontWeight: "700",
    fontFamily: FontFamily.interBold,
    color: Color.colorBlack,
    textAlign: "center",
  },
  shareProfileButton: {
    flex: 1,
    borderRadius: Border.br_8xs,
    borderStyle: "solid",
    borderColor: Color.colorBlack,
    borderWidth: 2,
    height: 30,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  profileButtons: {
    alignSelf: "stretch",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: Gap.gap_lg,
  },
  bio: {
    alignSelf: "stretch",
    borderRadius: Border.br_xs,
    backgroundColor: Color.primaryWhite,
    height: 70,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    fontWeight: "500",
    fontFamily: FontFamily.interMedium,
    fontSize: FontSize.size_sm,
  },
  profileInfoLayout: {
    alignSelf: "stretch",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    gap: Gap.gap_lg,
    padding: 20
  },
  tittle: {
    position: "relative",
    fontSize: FontSize.size_base,
    letterSpacing: 0,
    lineHeight: 26,
    fontWeight: "600",
    fontFamily: FontFamily.interSemiBold,
    color: Color.greyscale900,
    textAlign: "left",
  },
  tittle1: {
    position: "relative",
    fontSize: FontSize.size_xs,
    lineHeight: 19,
    fontFamily: FontFamily.interRegular,
    color: Color.primary600Base,
    textAlign: "right",
  },
  title: {
    width: 308,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 0,
  },
  imageIcon: {
    position: "relative",
    width: 100,
    height: 100,
  },
  rowPosts: {
    alignSelf: "stretch",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: Gap.gap_md,
  },
  gallery: {
    alignSelf: "stretch",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: Gap.gap_md,
  },
  photos: {
    alignSelf: "stretch",
    borderRadius: Border.br_xs,
    backgroundColor: Color.primaryWhite,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingHorizontal: Padding.p_base,
    paddingVertical: 20,
  },
  content: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  profileScreen: {
    backgroundColor: Color.primaryWhite,
    flex: 1,
    width: "100%",
    minWidth: 360,
    maxWidth: 500,
  },
  divider: {
    borderStyle: "solid",
    borderColor: "#e5e7eb",
    borderTopWidth: 1,
    height: 1,
    alignSelf: "stretch",
  },
});

export default OtherProfileScreen;
