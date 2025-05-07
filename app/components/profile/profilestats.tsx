import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ImageSourcePropType,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {
    FontFamily,
    Color,
    FontSize,
    Gap,
    Border,
    Padding,
  } from "../../(tabs)/GlobalStyles";


export interface StatsPage {
    posts?: number,
    followers?: number,
    following?:number
}

const ProfileStats: React.FC<StatsPage> = ({
  posts = 0,
  followers = 0,
  following = 0
}) => {

    const SimplifyNumber = (num: number): string => {
        if (num >= 1_000_000_000) return (num / 1_000_000_000).toFixed(1) + 'B';
        if (num >= 1_000_000) return (num / 1_000_000).toFixed(1) + 'M';
        if (num >= 1_000) return (num / 1_000).toFixed(1) + 'K';
        return num.toString();
      };

  return (
    <View style={styles.profileStats}>
    <View style={styles.post}>
      <Text style={styles.posts}>Posts</Text>
      <Text style={styles.text}>{SimplifyNumber(posts)}</Text>
    </View>
    <View style={styles.profileStatsChild} />
    <View style={styles.post}>
      <Text style={styles.posts}>Followers</Text>
      <Text style={styles.text}>{SimplifyNumber(followers)}</Text>
    </View>
    <View style={styles.profileStatsChild} />
    <View style={styles.post}>
      <Text style={styles.posts}>Following</Text>
      <Text style={styles.text}>{SimplifyNumber(following)}</Text>
    </View>
  </View>
  );
};

const styles = StyleSheet.create({
  profileStats: {
    alignSelf: "stretch",
    borderRadius: Border.br_xs,
    backgroundColor: Color.greyscale50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 12,
    paddingVertical: Padding.p_base,
    gap: Gap.gap_lg,
  },
  posts: {
    position: "relative",
    fontSize: FontSize.size_xs,
    lineHeight: 19,
    fontWeight: "500",
    fontFamily: FontFamily.interMedium,
    color: Color.colorLightslategray,
    textAlign: "left",
  },
  text: {
    position: "relative",
    fontSize: FontSize.size_base,
    letterSpacing: 0,
    lineHeight: 24,
    fontWeight: "600",
    fontFamily: FontFamily.interSemiBold,
    color: Color.greyscale900,
    textAlign: "left",
  },
  post: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: Gap.gap_sm,
  },
  profileStatsChild: {
    position: "relative",
    borderRadius: Border.br_8xs,
    backgroundColor: Color.greyscale200,
    width: 2,
    height: 42,
  }
});

export default ProfileStats;
