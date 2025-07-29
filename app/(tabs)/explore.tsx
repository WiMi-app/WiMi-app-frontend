import * as React from "react";
import {
  StyleSheet,
  TextInput,
  View,
  Image,
  FlatList
} from "react-native";
// import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
// import Iconlinearsearchnormal from "../../assets/iconlinearsearchnormal.svg";
// import Iconlinearsearchnormal from "../../assets/iconlinearsearchnormal.png";
// import Iconlinearsetting4 from "../../assets/iconlinearsetting4.png";
// import Ellipse1 from "../../assets/ellipse-1.png";
// import Flamevector from "../../assets/flame-vector.png";
import { SearchUsers } from "../fetch/user";


import {
  FontFamily,
  FontSize,
  Border,
  Color,
  Padding,
  Gap,
} from "./GlobalStyles";

import renderMessageItem from '../components/notifications/notifcard';

const ExploreScreen = () => {
  const [searchTerm, setSearchTerm] = React.useState(''); // controlled input state
  // Define UserData type if not already imported
  // type UserData = { id: string; name: string; username: string; ... };
  
  const [searchResults, setSearchResults] = React.useState<any[]>([]); // state for search results
  React.useEffect(() => {
    if (searchTerm.length > 0) {
      console.log('Searching for:', searchTerm);
      (async () => {
        const data = await SearchUsers(searchTerm);
        const messages: React.SetStateAction<null> | { id: string; name: string; username: string; time: string; notificationCount: null; avatar: string; }[] = [];
        data?.forEach(element => {
          messages.push({
            id: element.id,
            name: element.full_name,
            username: element.username,
            time: '',
            notificationCount: null,
            avatar: element.avatar_url,
          });
          console.log(element.id);
        });
        setSearchResults(messages);
      })();
      // TODO: Call your autocomplete function here (e.g., fetch from API)
    }
  }, [searchTerm]);
  

  return (
    <SafeAreaView style={styles.exploreScreen}>
      <View style={styles.content}>
        <View style={[styles.searchBar, styles.wrapperFlexBox]}>
          <Image
            style={[styles.iconlinearsearchNormal, {width:24, height:24}]}
            source={require("../../assets/iconlinearsearchnormal.png")}
          />
          <TextInput
            style={styles.searchHere}
            placeholder="Search here. . ."
            placeholderTextColor="#808080"
            value={searchTerm}                     // controlled input value
            onChangeText={text => {
              setSearchTerm(text);                // update state on each keystroke
              console.log('User typed:', text);   // optional: trigger fetch/autocomplete
            }}
          />
          <Image
            style={[styles.iconlinearsetting4, {width:20, height:20}]}
            source={require("../../assets/iconlinearsetting4.png")}
          />

        </View>
        <FlatList
        data={searchTerm.length > 0 ? searchResults : []} // Show results only when searchTerm is not empty
        renderItem={renderMessageItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.messagesList}
        />
        {/* Daily Challenge and Explore headers commented temporarily... */}
        {/* <Pressable style={styles.dailyChallenge}>
          <View style={styles.heading}>
            <Text style={[styles.dailyChallenge1, styles.exploreTypo]}>{`Daily
              Challenge`}
            </Text>
            <Text style={styles.challengeDdlBefore}>
              Challenge DDL: Before 10 AM
            </Text>
            <View style={styles.usersCount}>
              <Image
                style={[styles.usersCountChild, styles.usersLayout]}
                // contentFit="cover"
                source={require("../../assets/frame-2.png")}
              />
              <Image
                style={[styles.usersCountItem, styles.wrapperSpaceBlock]}
                // contentFit="cover"
                source={require("../../assets/frame-3.png")}
              />
              <Image
                style={[styles.usersCountItem, styles.wrapperSpaceBlock]}
                // contentFit="cover"
                source={require("../../assets/frame-4.png")}
              />
              <View style={[styles.wrapper, styles.wrapperSpaceBlock]}>
                <Text style={styles.text}>+5</Text>
              </View>
            </View>
          </View>
          <ImageBackground
            style={styles.trophyIcon}
            resizeMode="cover"
            source={require("../../assets/trophy.png")}
          >
            <Image 
              style={[styles.trophyChild, {width:80, height:27}]}
              source={require("../../assets/ellipse-1.png")}
            />
          </ImageBackground>
        </Pressable>
        <Text style={[styles.explore, styles.exploreTypo]}>Explore</Text> */}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    messagesList: {
    paddingHorizontal: 16,
  },
  exploreTopicsScrollViewContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 8,
  },
  wrapperFlexBox: {
    alignItems: "center",
    borderStyle: "solid",
  },
  exploreTypo: {
    fontFamily: FontFamily.interBold,
    fontSize: FontSize.size_5xl_6,
    textAlign: "left",
    fontWeight: "700",
    alignSelf: "stretch",
  },
  usersLayout: {
    width: 37,
    height: 37,
  },
  wrapperSpaceBlock: {
    marginLeft: -11,
    borderRadius: Border.br_lg_5,
    overflow: "hidden",
  },
  challengeTypo: {
    textAlign: "center",
    fontFamily: FontFamily.sFPro,
    fontSize: FontSize.size_sm,
  },
  topicBorder: {
    borderWidth: 0.6,
    borderColor: Color.colorGray_100,
    paddingVertical: Padding.p_4xs,
    paddingHorizontal: Padding.p_mini,
    alignItems: "center",
    flexDirection: "row",
    borderStyle: "solid",
    backgroundColor: Color.primaryWhite,
    borderRadius: Border.br_21xl,
  },
  exploreLayout: {
    height: 142,
    width: 159,
    top: 0,
    position: "absolute",
  },
  rectangleIconPosition: {
    top: 143,
    height: 141,
    width: 159,
    position: "absolute",
  },
  exploreChildPosition1: {
    top: 286,
    width: 159,
    position: "absolute",
  },
  exploreChildPosition: {
    top: 429,
    height: 142,
    width: 159,
    position: "absolute",
  },
  iconlinearsearchNormal: {},
  searchHere: {
    fontFamily: FontFamily.plusJakartaSansMedium,
    fontSize: FontSize.size_xs,
    fontWeight: "500",
    width: "100%",
    flex: 1,
  },
  iconlinearsetting4: {},
  searchBar: {
    borderRadius: 14,
    backgroundColor: "#fbfbfb",
    borderColor: "#ededed",
    borderWidth: 1,
    height: 48,
    paddingHorizontal: Padding.p_base,
    paddingVertical: Padding.p_xs,
    flexDirection: "row",
    alignItems: "center",
    borderStyle: "solid",
    gap: Gap.gap_lg,
    alignSelf: "stretch",
  },
  dailyChallenge1: {
    textAlign: "left",
    color: Color.primaryWhite,
  },
  challengeDdlBefore: {
    fontSize: 13,
    fontWeight: "600",
    fontFamily: FontFamily.interSemiBold,
    textAlign: "left",
    color: Color.primaryWhite,
    alignSelf: "stretch",
  },
  usersCountChild: {
    borderRadius: Border.br_lg_5,
    width: 37,
    overflow: "hidden",
  },
  usersCountItem: {
    width: 37,
    height: 37,
  },
  text: {
    fontSize: 15,
    fontFamily: FontFamily.cabinBold,
    color: Color.colorMediumpurple,
    textAlign: "left",
    fontWeight: "700",
  },
  wrapper: {
    borderColor: Color.primaryWhite,
    borderWidth: 0.9,
    width: 38,
    height: 38,
    justifyContent: "center",
    alignItems: "center",
    borderStyle: "solid",
    marginLeft: -11,
    backgroundColor: Color.primaryWhite,
  },
  usersCount: {
    width: 118,
    height: 37,
    alignItems: "center",
    flexDirection: "row",
  },
  heading: {
    width: 196,
    gap: 8,
  },
  trophyChild: {},
  trophyIcon: {
    width: 100,
    height: 130,
    alignItems: "flex-end",
    justifyContent: "flex-end",
    paddingLeft: 10,
    paddingTop: Padding.p_mid_9,
    paddingRight: 9,
    paddingBottom: Padding.p_mid_9,
  },
  dailyChallenge: {
    borderRadius: 21,
    backgroundColor: Color.colorMediumpurple,
    paddingVertical: Padding.p_3xs,
    gap: Gap.gap_0,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    alignSelf: "stretch",
    paddingHorizontal: Padding.p_xs,
    overflow: "hidden",
  },
  explore: {
    color: Color.colorBlack,
    textAlign: "left",
  },
  flameVectorIcon: {},
  iceBucketChallenge: {
    color: Color.primaryWhite,
    fontWeight: "700",
  },
  pressable: {
    backgroundColor: "transparent",
    paddingVertical: Padding.p_4xs,
    paddingHorizontal: Padding.p_mini,
    gap: Gap.gap_0,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    borderRadius: Border.br_21xl,
  },
  golfChallenge: {
    color: Color.colorBlack,
    fontWeight: "500",
  },
  golfChallengeTopic: {
    justifyContent: "space-between",
    borderColor: Color.colorGray_100,
  },
  financialTopic: {
    height: 36,
    justifyContent: "center",
  },
  exploreTopics: {
    maxHeight: 36,
    height: 36,
    width: "100%",
  },
  exploreGalleryChild: {
    zIndex: 0,
    left: 0,
  },
  exploreGalleryItem: {
    zIndex: 1,
    left: 159,
  },
  exploreGalleryInner: {
    zIndex: 2,
    height: 285,
    left: 317,
    width: 159,
    top: 0,
    position: "absolute",
  },
  rectangleIcon: {
    zIndex: 3,
    height: 141,
    left: 0,
  },
  exploreGalleryChild1: {
    zIndex: 4,
    height: 141,
    left: 159,
  },
  exploreGalleryChild2: {
    zIndex: 5,
    height: 285,
    left: 0,
  },
  exploreGalleryChild3: {
    zIndex: 6,
    height: 141,
    left: 159,
  },
  exploreGalleryChild4: {
    zIndex: 7,
    height: 141,
    left: 317,
  },
  exploreGalleryChild5: {
    zIndex: 8,
    left: 159,
  },
  exploreGalleryChild6: {
    zIndex: 9,
    left: 317,
  },
  exploreGallery: {
    height: 572,
    gap: Gap.gap_md,
    alignSelf: "stretch",
  },
  content: {
    // paddingTop: Padding.p_34xl,
    gap: Gap.gap_lg,
    alignSelf: "stretch",
  },
  exploreScreen: {
    // height: 926,
    paddingVertical: 0,
    minWidth: 360,
    maxWidth: 500,
    paddingHorizontal: Padding.p_xs,
    overflow: "hidden",
    backgroundColor: Color.primaryWhite,
    borderRadius: Border.br_21xl,
    width: "100%",
    // flex: 1,
  },
});

export default ExploreScreen;
