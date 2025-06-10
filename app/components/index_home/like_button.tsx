import React, { useState } from "react";
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
import { num_likes } from "../../interfaces/components";

const LikeButton = ({
    like_count = 0,
}) => {
    const [liked, setLiked] = useState(false);
  return (
    <Pressable style={[styles.buttonFlexBox]} 
    onPress={() => setLiked((isLiked) => !isLiked)}>
        <MaskedView maskElement={<MaterialCommunityIcons
            name={liked ? "heart" : "heart-outline"}
            size={20}/>
            } 
            style={styles.heart}>
            <LinearGradient
                start={{x:0.5, y:0}}
                end={{x:0.5, y:1}}
                colors={liked ? ["#FF7854", "#FD267D"] : ["#FF7854", "#FD267D"]}>
                <MaterialCommunityIcons
                    style={{opacity:0}}
                    name={liked ? "heart" : "heart-outline"}
                    size={20}
                />
            </LinearGradient>
        </MaskedView>
        <MaskedView 
            maskElement={
                <Text style={[styles.suggested, styles.suggestedTypo]}>
                    {liked ? SimplifyNumber(like_count+1) : SimplifyNumber(like_count)}
                </Text>
            }
            style={styles.textContainer}>
            <LinearGradient
                start={{x:0.5, y:0}}
                end={{x:0.5, y:1}}
                colors={["#FF7854", "#FD267D"]}>
                <Text style={[styles.suggested, styles.suggestedTypo, {opacity: 0}]}>
                    {liked ? SimplifyNumber(like_count+1) : SimplifyNumber(like_count)}
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
