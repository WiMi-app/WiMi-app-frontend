import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable
} from 'react-native';
import {
    FontFamily,
    Color,
    FontSize,
    Gap,
    Border,
    Padding,
  } from "../../(tabs)/GlobalStyles";


interface PostElements {
    profile_name?: string,
    profile_pic?: string,
    num_likes?: number,
    num_comments?: number,
    post_pic?: string,
    posts?: number,
    followers?: number,
    following?:number
}

const Post: React.FC<PostElements> = ({
    profile_name = "",
    num_likes = 0,
    num_comments = 0,
    profile_pic = "",
    post_pic = "",
}) => {

    const images = {
      'default_profile_pic': require('../../../assets/profile img.png'),
      'default_post_pic': require('../../../assets/ice-bucket-photo.png'),
    };

    const SimplifyNumber = (num: number): string => {
        if (num >= 1_000_000_000) return (num / 1_000_000_000).toFixed(1) + 'B';
        if (num >= 1_000_000) return (num / 1_000_000).toFixed(1) + 'M';
        if (num >= 1_000) return (num / 1_000).toFixed(1) + 'K';
        return num.toString();
      };

  return (
        <View style={[styles.post, styles.postFlexBox]}>
          <View style={[styles.postInfo, styles.infoSpaceBlock]}>
            <Image 
              style={styles.iconLayout1} 
              width={48} 
              height={48} 
              source={require("../../../assets/profile img.png")}
            />
           {/* if (profile_pic) {
                <Image 
                    style={styles.iconLayout1} 
                    width={48} 
                    height={48} 
                    source={require("../../../assets/profile img.png")}
                />
            }
            else {
                <Image 
                style={styles.iconLayout1} 
                width={48} 
                height={48} 
                source={images["default_post_pic"]}
                />
            } */}
            <Pressable style={styles.userPostInfo}>
              <Text style={[styles.username, styles.usernameFlexBox]}>
                {profile_name}
              </Text>
              <Text style={[styles.postTime, styles.taskClr]}>1 hr ago</Text>
            </Pressable>
            <Image 
              style={styles.moreButton} 
              width={24} 
              height={24} 
              source={require("../../../assets/more--button.png")}
            />
          </View>
          <View style={[styles.taskInfo, styles.infoSpaceBlock]}>
            <Image
              style={styles.wimiLogoIcon1}
              // contentFit="cover"
              source={require("../../../assets/wimi-logo.png")}
            />
            <Text style={[styles.task, styles.taskTypo]}>Run a 5K</Text>
          </View>
          <Image
            style={[styles.iceBucketPhoto1, styles.iconLayout]}
            // contentFit="cover"
            source={require("../../../assets/ice-bucket-photo.png")}
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
                  source={require("../../../assets/heart button.png")}
                />
              </View>
              <Text style={[styles.suggested, styles.suggestedTypo]}>{SimplifyNumber(num_likes)}</Text>
            </Pressable>
            <Pressable style={[styles.commentButton, styles.buttonFlexBox]}>
              <Image 
                style={styles.heart} 
                width={20} 
                height={20}
                resizeMode="cover"
                source={require("../../../assets/comment button.png")} 
              />
              <Text style={[styles.suggested, styles.suggestedTypo]}>{SimplifyNumber(num_comments)}</Text>
            </Pressable>
            <View style={styles.deadSpace} />
            <Image
              style={styles.shareButtonIcon}
              width={20}
              height={20}
              source={require("../../../assets/share button.png")}
            />
          </View>
        </View>
  );
};

const styles = StyleSheet.create({
    postFlexBox: {
        backgroundColor: Color.primaryWhite,
        alignSelf: "stretch",
        alignItems: "center",
    },

    post: {
        gap: 5,
        alignSelf: "stretch",
        alignItems: "center",
    },

    postInfo: {
        height: 52,
        gap: 12,
        flexDirection: "row",
        paddingVertical: 0,
        alignItems: "center",
    },

    infoSpaceBlock: {
        paddingVertical: 0,
        paddingHorizontal: Padding.p_9xl,
        alignSelf: "stretch",
    },
      
    iconLayout1: {},

    userPostInfo: {
        gap: 4,
        flex: 1,
    },

    username: {
        color: Color.black,
        fontFamily: FontFamily.poppinsSemiBold,
        fontWeight: "600",
        lineHeight: 24,
        fontSize: FontSize.size_base,
        textAlign: "left",
    },

    usernameFlexBox: {
        textAlign: "left",
        alignSelf: "stretch",
    },

    postTime: {
        fontSize: 12,
        lineHeight: 20,
        textAlign: "left",
        alignSelf: "stretch",
    },

    taskClr: {
        color: Color.gray1,
        fontFamily: FontFamily.poppinsRegular,
    },

    moreButton: {
        overflow: "hidden",
    },

    taskInfo: {
        flexDirection: "row",
        paddingVertical: 0,
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

    taskTypo: {
        fontSize: FontSize.size_sm,
        textAlign: "left",
        lineHeight: 24,
    },

    iceBucketPhoto1: {
        height: 500,
        alignSelf: "stretch",
    },

    iconLayout: {
        maxWidth: "100%",
        overflow: "hidden",
        width: "100%",
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

    seeMoreTypo: {
        color: Color.black,
        fontFamily: FontFamily.poppinsSemiBold,
        fontWeight: "600",
    },

    postButton: {
        paddingBottom: 20,
        gap: 24,
        paddingHorizontal: Padding.p_9xl,
        flexDirection: "row",
        alignSelf: "stretch",
        alignItems: "center",
    },

    heartButton: {
        width: 49,
    },

    buttonFlexBox: {
        gap: Gap.gap_md,
        height: 20,
        flexDirection: "row",
        alignItems: "center",
    },

    heart: {

    },

    suggested: {
        fontFamily: FontFamily.poppinsSemiBold,
        fontWeight: "600",
        textAlign: "center",
    },

    suggestedTypo: {
        textAlign: "center",
        lineHeight: 24,
        fontSize: FontSize.size_base,
    },

    commentButton: {
        width: 40,
    },

    deadSpace: {
        height: 20,
        flex: 1,
    },

    shareButtonIcon: {

    },
});

export default Post;
