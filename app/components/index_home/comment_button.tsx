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
import CommentIcon from "../icons/comment_icon";
import { comment } from "../../interfaces/components";
import { getCommentList } from "@/app/fetch/comments";

const CommentButton = ({
    comment_count = 0,
}) => {
    const [commented, setCommented] = useState(false);

  return (
    <Pressable style={[styles.buttonFlexBox]} 
        onPress={() => {setCommented((isCommented) => !isCommented);
            // let test = getCommentList();
            // console.log("This is Test: ", test);
        }}>
        <CommentIcon/>
        <MaskedView 
            maskElement={
                <Text style={[styles.suggested, styles.suggestedTypo]}>
                    {commented ? SimplifyNumber(comment_count+1) : SimplifyNumber(comment_count)}
                </Text>
            }
            style={styles.textContainer}>
            <LinearGradient
                start={{x:0.5, y:0}}
                end={{x:0.5, y:1}}
                colors={["#FFC166", "#FF9966"]}>
                <Text style={[styles.suggested, styles.suggestedTypo, {opacity: 0}]}>
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

    textContainer: {
        alignItems: "center",
        justifyContent: "center",
    },

});

export default CommentButton;
