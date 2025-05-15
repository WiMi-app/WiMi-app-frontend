import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
    FontFamily,
    FontSize,
    Gap,
  } from "../../(tabs)/GlobalStyles";
import SimplifyNumber from "../simplify_num";

interface num_likes {
    like_count?: number
}

const LikeButton = ({
    like_count = 0,
}) => {
    const [liked, setLiked] = useState(false);

  return (
    <Pressable style={[styles.heartButton, styles.buttonFlexBox]} 
    onPress={() => setLiked((isLiked) => !isLiked)}>
        <View style={styles.heart}>
            <MaterialCommunityIcons
                name={liked ? "heart" : "heart-outline"}
                size={20}
                color={liked ? "red" : "black"}
            />
        </View>
        <Text style={[styles.suggested, styles.suggestedTypo]}>
            {liked ? SimplifyNumber(like_count+1) : SimplifyNumber(like_count)}
        </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
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

});

export default LikeButton;
