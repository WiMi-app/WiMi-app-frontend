import {useEffect,useState } from "react";
import ProfileStats from "../components/profile/profilestats";
import { StyleSheet, Text, View, Pressable, TextInput } from "react-native";
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
import { getMyData } from "../fetch/user";
import { UserData } from "../interfaces/user";


const ProfileScreen = () => {
  const navigation = useNavigation();
  const [userData, setUserData] = useState<UserData | null>(null);
  const[error, setError] = useState<Boolean>(false);

  useEffect(() => {
    (async () => { 
      const data = await getMyData(); 
      data?setUserData(data):setError(true);
    })();
  }, []);

  return (
    <SafeAreaView style={styles.profileScreen}>
      <View style={styles.content}>
        <View style={styles.profileInfoLayout}>
          <View style={styles.profilePicname}>

            <ProfilePhoto photo={require('../../assets/test/profile.png')} Status={1} size={60}/>

            <View style={styles.profileName}>
              <Text style={styles.name}>{userData?.full_name} </Text>
              <Text style={styles.username}>@{userData?.username}</Text>
            </View>

          </View>
          
          <ProfileStats posts = {0} followers={1_000_000} following={1_000}/>

          <View style={styles.profileButtons}>
            <Pressable style={styles.inviteProfileButton} onPress={() => navigation.navigate('(settings)')}> {/*Change navigate?*/}
              <Text style={styles.inviteProfile} numberOfLines={2}>Invite To Challenge</Text>
            </Pressable>
            <Pressable style={styles.shareProfileButton}>
              <Text style={styles.shareProfile}>Share Profile</Text>
            </Pressable>
          </View>
          <Text style={styles.bio} > {userData?.bio} </Text>
        </View>
        <View style={styles.photos}>
          <View style={styles.title}>
            <Text style={styles.tittle}>Posts</Text>
            <Text style={styles.tittle1}>See All</Text>
          </View>
        </View>
      </View>
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
  inviteProfile: {
    /*alignSelf: "stretch",
    position: "relative",
    fontSize: FontSize.size_sm,
    lineHeight: 22,
    fontWeight: "700",
    fontFamily: FontFamily.interBold,
    color: Color.colorBlack,
    textAlign: "center"*/
    alignSelf: "stretch",
    position: "relative",
    fontSize: FontSize.size_sm,
    lineHeight: 22,
    fontWeight: "700",
    fontFamily: FontFamily.interBold,
    color: Color.colorBlack,
    textAlign: "center",
    flexWrap: "wrap", // allow wrapping
    maxWidth: "100%", // prevent overflow
  },
  inviteProfileButton: {
    flex: 0.6754,
    //flexWrap: "wrap",
    borderRadius: Border.br_8xs,
    borderStyle: "solid",
    borderColor: Color.colorBlack,
    borderWidth: 2,
    height: 30,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 37,
    paddingVertical: 0
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
    gap: Gap.gap_lg,
  },
  content: {
    alignSelf: "stretch",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingHorizontal: 10,
    paddingTop: 53,
    gap: 10,
  },
  profileScreen: {
    position: "relative",
    borderRadius: 40,
    backgroundColor: Color.primaryWhite,
    flex: 1,
    width: "100%",
    height: 926,
    overflow: "hidden",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    minWidth: 360,
    maxWidth: 500,
    padding: 20
  },
});

export default ProfileScreen;
