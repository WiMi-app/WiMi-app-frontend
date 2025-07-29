import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  TouchableOpacity
} from 'react-native';
import {
    FontFamily,
    Color,
    FontSize,
    Gap,
    Border,
    Padding,
  } from "../../(tabs)/GlobalStyles";
import LikeButton from "./like_button";
import SimplifyNumber from '../../utils/simplify_num';
import CommentButton from './comment_button';
import ShareButton from './share_button';
import { PostElements } from '../../interfaces/components';
import ProfilePhoto from '../profile/profilephoto';
import { useNavigation } from '@react-navigation/native';
import { router } from 'expo-router';

const Post: React.FC<PostElements> = ({
    postId = "",
    profile_name = "",
    num_comments = 0,
    profile_pic = "",
    post_pic = "",
    post_description = "",
    elapsed_post_time = "",
    challenge = ""
}) => {
  const navigation = useNavigation();
  const [expanded, setExpanded] = useState(false);
  const isLong = post_description.length > 100;

  return (
        <View style={[styles.post, styles.postFlexBox]}>
          <View style={[styles.postInfo, styles.infoSpaceBlock]}>
            <Pressable onPress={() => {router.push({
  pathname: '(otherProfile)',
  params: { username: profile_name },
});}}>
              <ProfilePhoto  photo={profile_pic ? { uri: profile_pic[0] } :require('../../../assets/images/defaultprofile.jpg')} Status={1} width={48} height={48}/>              
            </Pressable>
            <Pressable style={styles.userPostInfo} onPress={() => {router.push({
  pathname: '(otherProfile)',
  params: { username: profile_name },
});}}>
              <Text style={[styles.username, styles.usernameFlexBox]}>
                {profile_name}
              </Text>
              <Text style={[styles.postTime, styles.taskClr]}>1 hr ago</Text>
            </Pressable>
          </View>
          <View style={[styles.taskInfo, styles.infoSpaceBlock]}>
            <Image
              style={styles.wimiLogoIcon1}
              // contentFit="cover"
              source={require("../../../assets/wimi-logo.png")}
            />
            <Text style={[styles.task, styles.taskTypo]}>{challenge}</Text>
          </View>
          <Image
            style={[styles.iceBucketPhoto1, styles.iconLayout]}
            // contentFit="cover"
          source={
         { uri: post_pic }
        }
          />
          <View style={[styles.descriptionLayout, styles.infoSpaceBlock]}>
            <Text style={[styles.description, styles.taskTypo]}>

            <View>
              <Text style={styles.taskClr}>
                {isLong && !expanded
                  ? post_description.substring(0, 99) + '...'
                  : post_description}
              </Text>
                
              {isLong && (
                <TouchableOpacity onPress={() => setExpanded(prev => !prev)}>
                  <Text style={styles.seeMoreTypo}>
                    {expanded ? ' See less' : ' See more'}
                  </Text>
                </TouchableOpacity>
              )}
            </View>

            </Text>
          </View>
          <View style={styles.postButton}>
            <LikeButton post_id={postId}/>
            <CommentButton comment_count={num_comments} postId={postId}/>
            <View style={styles.deadSpace} />
            <ShareButton message="IGNORE THIS TEST FOR HOME SHARE BUTTON"/>
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
        gap: 12,
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
