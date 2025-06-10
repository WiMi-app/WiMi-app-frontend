import React, { useState, useEffect } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
    FontFamily,
    FontSize,
    Gap,
} from "../../(tabs)/GlobalStyles";
import SimplifyNumber from "../../utils/simplify_num";
import { LinearGradient } from "expo-linear-gradient";
import MaskedView from '@react-native-masked-view/masked-view';
import { Like, unLike, getLike } from "@/app/fetch/likes";
import { getMyData } from "@/app/fetch/user";

const LikeButton = ({
    post_id = ""
}) => {
  const [liked, setLiked] = useState(false);
  const [Likes, setLikes] = useState([]);
  const [numLikes, setNumLikes] = useState(0);

  // Function to fetch and update like data
  const fetchLikeData = async () => {
    try {
      const data = await getMyData();
      const likes = await getLike(post_id);
      setNumLikes(likes.length);
      
      if (likes && data) {
        setLikes(likes);
        // Find the like object that matches the user id
        const matchingLike = likes.find((item) => item.id === data.id);
        
        if (matchingLike) {
          setLiked(true);
        } else {
          setLiked(false);
        }
      } else {
        setLikes([]);
        setLiked(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Only run on mount and when post_id changes
  useEffect(() => {
    fetchLikeData();
  }, [post_id]);

  async function Like_() {
    try {
      const newLikedState = !liked;
      
      // Optimistically update UI
      setLiked(newLikedState);
      setNumLikes(prev => newLikedState ? prev + 1 : prev - 1);
      
      if (newLikedState) {
        await Like(post_id);
      } else {
        await unLike(post_id);
      }
      
      // Optionally refetch to ensure accuracy
      // fetchLikeData();
      
    } catch (error) {
      console.log(error);
      // Revert optimistic updates on error
      setLiked(!newLikedState);
      setNumLikes(prev => newLikedState ? prev - 1 : prev + 1);
    }
  }

  return (
    <Pressable style={[styles.buttonFlexBox]} onPress={Like_}>
      <MaskedView
        maskElement={
          <MaterialCommunityIcons
            name={liked ? "heart" : "heart-outline"}
            size={20}
          />
        }
        style={styles.heart}
      >
        <LinearGradient
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          colors={liked ? ["#FF7854", "#FD267D"] : ["#FF7854", "#FD267D"]}
        >
          <MaterialCommunityIcons
            style={{ opacity: 0 }}
            name={liked ? "heart" : "heart-outline"}
            size={20}
          />
        </LinearGradient>
      </MaskedView>
      <MaskedView
        maskElement={
          <Text style={[styles.suggested, styles.suggestedTypo]}>
            {SimplifyNumber(numLikes)}
          </Text>
        }
        style={styles.textContainer}
      >
        <LinearGradient
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          colors={["#FF7854", "#FD267D"]}
        >
          <Text style={[styles.suggested, styles.suggestedTypo, { opacity: 0 }]}>
            {SimplifyNumber(numLikes)}
          </Text>
        </LinearGradient>
      </MaskedView>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  suggested: {
    fontFamily: FontFamily.poppinsSemiBold,
    fontWeight: "bold",
    textAlign: "center",
  },

  suggestedTypo: {
    textAlign: "center",
    fontSize: FontSize.size_base,
  },

  buttonFlexBox: {
    gap: Gap.gap_sm,
    height: 20,
    flexDirection: "row",
    alignItems: "center",
  },

  heart: {
    height: 20,
    width: 20,
    alignItems: "center",
    justifyContent: "center",
  },

  textContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
});

export default LikeButton;