// import { View, Text, StyleSheet } from "react-native"
// import { useRouter } from 'expo-router';
// import { Button } from 'react-native';

// export default function HomeScreen() {
//   const router = useRouter();

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Home</Text>
//       <Text style={styles.subtitle}>Welcome to your new app!</Text>
//       <Button title="Go to Login" onPress={() => router.push('(auth)/logi')} />
//     </View>
//   )
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center",
//     padding: 20,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: "bold",
//     marginBottom: 10,
//   },
//   subtitle: {
//     fontSize: 16,
//     color: "#777",
//   },
// })


import * as React from "react";
import { useRouter } from 'expo-router';
// import { Image } from "expo-image";
import { StyleSheet, Pressable, Text, View, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
// import Edit from "../../assets/";
// import Img from "../assets/img.svg";
// import Morebutton from "../assets/more--button.svg"; //profile img
// import Icon from "../assets/icon.svg"; // heart
// import Vector from "../assets/vector.svg"; // comment
// import Sharebutton from "../assets/share-button.svg";
import { Color, Gap, FontSize, Padding, FontFamily } from "./GlobalStyles";


export default function HomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.homeScreen}>
      <View style={styles.postList}>
        <View style={[styles.homeHeader, styles.postFlexBox]}>
          <View style={[styles.headerLayout, styles.homeTabsFlexBox]}>
            <Image
              style={styles.iconLayout1}
              // contentFit="cover"
              source={require("../../assets/wimi-logo.png")}
              width={48}
              height={48}
            />
            <View style={[styles.homeTabs, styles.homeTabsFlexBox]}>
              <Text style={[styles.suggested, styles.suggestedTypo]}>
                Suggested
              </Text>
              <Text style={[styles.following, styles.suggestedTypo]}>
                Following
              </Text>
            </View>
            <Image
              style={[styles.editIcon, styles.iconLayout1]}
              width={48}
              height={48}
              source={require("../../assets/edit button.png")}
            />
          </View>
        </View>
        <View style={[styles.post, styles.postFlexBox]}>
          <View style={[styles.postInfo, styles.infoSpaceBlock]}>
            <Image 
              style={styles.iconLayout1} 
              width={48} 
              height={48} 
              source={require("../../assets/profile img.png")}
            />
            <Pressable style={styles.userPostInfo}>
              <Text style={[styles.username, styles.usernameFlexBox]}>
                john_doe
              </Text>
              <Text style={[styles.postTime, styles.taskClr]}>1 hr ago</Text>
            </Pressable>
            <Image 
              style={styles.moreButton} 
              width={24} 
              height={24} 
              source={require("../../assets/more--button.png")}
            />
          </View>
          <View style={[styles.taskInfo, styles.infoSpaceBlock]}>
            <Image
              style={styles.wimiLogoIcon1}
              // contentFit="cover"
              source={require("../../assets/wimi-logo.png")}
            />
            <Text style={[styles.task, styles.taskTypo]}>Run a 5K</Text>
          </View>
          <Image
            style={[styles.iceBucketPhoto1, styles.iconLayout]}
            // contentFit="cover"
            source={require("../../assets/ice-bucket-photo.png")}
          />
          <View style={[styles.descriptionLayout, styles.infoSpaceBlock]}>
            <Text style={[styles.description, styles.taskTypo]}>
              <Text
                style={styles.taskClr}
              >{`Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt... `}</Text>
              <Text style={styles.seeMoreTypo}>See more</Text>
            </Text>
          </View>
          <View style={styles.postButton}>
            <Pressable style={[styles.heartButton, styles.buttonFlexBox]}>
              <View style={styles.heart}>
                <Image 
                  width={20} 
                  height={20}
                  source={require("../../assets/heart button.png")}
                />
              </View>
              <Text style={[styles.suggested, styles.suggestedTypo]}>46</Text>
            </Pressable>
            <Pressable style={[styles.commentButton, styles.buttonFlexBox]}>
              <Image 
                style={styles.heart} 
                width={20} 
                height={20}
                resizeMode="cover"
                source={require("../../assets/comment button.png")} 
              />
              <Text style={[styles.suggested, styles.suggestedTypo]}>11</Text>
            </Pressable>
            <View style={styles.deadSpace} />
            <Image
              style={styles.shareButtonIcon}
              width={20}
              height={20}
              source={require("../../assets/share button.png")}
            />
          </View>
        </View>
        <View style={styles.divider} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  postFlexBox: {
    backgroundColor: Color.primaryWhite,
    alignSelf: "stretch",
    alignItems: "center",
  },
  homeTabsFlexBox: {
    gap: Gap.gap_0,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
  suggestedTypo: {
    textAlign: "center",
    lineHeight: 24,
    fontSize: FontSize.size_base,
  },
  iconLayout1: {},
  infoSpaceBlock: {
    paddingVertical: 0,
    paddingHorizontal: Padding.p_9xl,
    alignSelf: "stretch",
  },
  usernameFlexBox: {
    textAlign: "left",
    alignSelf: "stretch",
  },
  taskClr: {
    color: Color.gray1,
    fontFamily: FontFamily.poppinsRegular,
  },
  taskTypo: {
    fontSize: FontSize.size_sm,
    textAlign: "left",
    lineHeight: 24,
  },
  iconLayout: {
    maxWidth: "100%",
    overflow: "hidden",
    width: "100%",
  },
  buttonFlexBox: {
    gap: Gap.gap_md,
    height: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  suggested: {
    fontFamily: FontFamily.poppinsSemiBold,
    fontWeight: "600",
    textAlign: "center",
  },
  following: {
    fontWeight: "500",
    fontFamily: FontFamily.poppinsMedium,
    color: "#0b0b0b",
  },
  homeTabs: {
    flex: 1,
  },
  editIcon: {
    borderRadius: 50,
  },
  headerLayout: {
    paddingVertical: 0,
    paddingHorizontal: Padding.p_9xl,
    alignSelf: "stretch",
  },
  homeHeader: {
    height: 48,
    justifyContent: "flex-end",
    alignSelf: "stretch",
    alignItems: "center",
  },
  username: {
    color: Color.black,
    fontFamily: FontFamily.poppinsSemiBold,
    fontWeight: "600",
    lineHeight: 24,
    fontSize: FontSize.size_base,
    textAlign: "left",
  },
  postTime: {
    fontSize: 12,
    lineHeight: 20,
    textAlign: "left",
    alignSelf: "stretch",
  },
  userPostInfo: {
    gap: 4,
    flex: 1,
  },
  moreButton: {
    overflow: "hidden",
  },
  postInfo: {
    height: 52,
    gap: 12,
    flexDirection: "row",
    paddingVertical: 0,
    alignItems: "center",
  },
  wimiLogoIcon1: {
    width: 25,
    height: 25,
  },
  task: {
    width: 347,
    color: Color.gray1,
    fontFamily: FontFamily.poppinsRegular,
    alignSelf: "stretch",
  },
  taskInfo: {
    flexDirection: "row",
    paddingVertical: 0,
  },
  iceBucketPhoto1: {
    height: 500,
    alignSelf: "stretch",
  },
  seeMoreTypo: {
    color: Color.black,
    fontFamily: FontFamily.poppinsSemiBold,
    fontWeight: "600",
  },
  description: {
    flex: 1,
  },
  descriptionLayout: {
    justifyContent: "center",
    flexDirection: "row",
    paddingVertical: 0,
    alignItems: "center",
  },
  icon: {
    position: "absolute",
    height: "95%",
    top: "4%",
    right: "0%",
    bottom: "1%",
    left: "0%",
    maxHeight: "100%",
  },
  heart: {

  },
  heartButton: {
    width: 49,
  },
  commentButton: {
    width: 40,
  },
  deadSpace: {
    height: 20,
    flex: 1,
  },
  shareButtonIcon: {},
  postButton: {
    paddingBottom: 20,
    gap: 24,
    paddingHorizontal: Padding.p_9xl,
    flexDirection: "row",
    alignSelf: "stretch",
    alignItems: "center",
  },
  post: {
    gap: 5,
    alignSelf: "stretch",
    alignItems: "center",
  },
  divider: {
    borderStyle: "solid",
    borderColor: "#e5e7eb",
    borderTopWidth: 1,
    height: 1,
    alignSelf: "stretch",
  },
  postList: {
    alignSelf: "stretch",
    alignItems: "center",
  },
  homeScreen: {
    borderRadius: 40,
    height: 926,
    minWidth: 360,
    maxWidth: 500,
    alignItems: "center",
    overflow: "hidden",
    width: "100%",
    flex: 1,
    backgroundColor: Color.primaryWhite,
  },
});
