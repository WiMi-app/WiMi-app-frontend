import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
    FontFamily,
    FontSize,
    Gap,
  } from "../../(tabs)/GlobalStyles";
import SimplifyNumber from "../simplify_num";
import { LinearGradient } from "expo-linear-gradient";
import MaskedView from '@react-native-masked-view/masked-view';
import CommentIcon from "../icons/comment_icon";

interface comment {
    comment_count?: number
}

const CommentButton = ({
    comment_count = 0,
}) => {
    const [commented, setCommented] = useState(false);

  return (
    <Pressable style={[styles.commentButton, styles.buttonFlexBox]} 
        onPress={() => setCommented((isCommented) => !isCommented)}>
        <CommentIcon/>
        <MaskedView maskElement={
            <Text style={[styles.suggested, styles.suggestedTypo]}>
                {commented ? SimplifyNumber(comment_count+1) : SimplifyNumber(comment_count)}
            </Text>
            } 
            style={styles.heart}>
            <LinearGradient
                start={{x:0.5, y:0}}
                end={{x:0.5, y:1}}
                colors={commented ? ["#FFC166", "#FF9966"] : ["#FFC166", "#FF9966"]}>
                <Text style={[styles.suggested, styles.suggestedTypo, {opacity:0}]}>
                    {commented ? SimplifyNumber(comment_count+1) : SimplifyNumber(comment_count)}
                </Text>
            </LinearGradient>
        </MaskedView>
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

    commentButton: {
        width: 40,
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

export default CommentButton;
