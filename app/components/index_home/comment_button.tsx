import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View, Modal } from "react-native";
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
import CommentSection from "./comment_section";

interface CommentButtonProps {
    comment_count: number;
    postId: string;
}

const CommentButton: React.FC<CommentButtonProps> = ({
    comment_count = 0,
    postId = "",
}) => {
    // const [commented, setCommented] = useState(false);
    const [showCommentSection, setShowCommentSection] = useState(false);

    const handlePress = () => {
        setShowCommentSection(true);
    };

    return (
        <>
            <Pressable style={[styles.buttonFlexBox]} onPress={handlePress}>
                <CommentIcon/>
                <MaskedView 
                    maskElement={
                        <Text style={[styles.suggested, styles.suggestedTypo]}>
                            {SimplifyNumber(comment_count)}
                        </Text>
                    }
                    style={styles.textContainer}>
                    <LinearGradient
                        start={{x:0.5, y:0}}
                        end={{x:0.5, y:1}}
                        colors={["#FFC166", "#FF9966"]}>
                        <Text style={[styles.suggested, styles.suggestedTypo, {opacity: 0}]}>
                            {SimplifyNumber(comment_count)}
                        </Text>
                    </LinearGradient>
                </MaskedView>
            </Pressable>

            <Modal
                visible={showCommentSection}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setShowCommentSection(false)}
            >
                <View style={styles.modalOverlay}>
                    <CommentSection
                        postId={postId}
                        onClose={() => setShowCommentSection(false)}
                    />
                </View>
            </Modal>
        </>
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

    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'flex-end',
    },
});

export default CommentButton;
