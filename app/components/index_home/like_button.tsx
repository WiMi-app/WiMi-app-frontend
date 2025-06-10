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
  const [likeD , setLikeID] = useState("");
  const [Likes, setLikes] = useState([]);
  useEffect(()=>{
    try{
        (async () => {
            const data = await getMyData();
            const likes = await getLike(post_id);

            if (likes && data) {
              setLikes(likes);
            
              // Find the like object that matches the user id
              const matchingLike = likes.find((item: { id: string }) => item.id === data.id);
            
              if (matchingLike) {
                setLiked(true);
                setLikeID(matchingLike.id); // Set likeD to the matching like's id
                console.log(matchingLike);
              } else {
                setLiked(false);
                setLikeID(""); // No match found — clear likeD
              }
            } else {
              setLikes([]);
              setLiked(false);
              setLikeID("");
            }
        })()
    }catch(error){
        console.log(error);
    }
  },[]);

  async function Like_(){
    try{
        setLiked((isLiked) => !isLiked);
        console.log(liked);
        if(!liked){
            const like = await Like(post_id);
            setLikeID(like.id);
        } else{
            await unLike(likeD);
        }
    } catch (error){
        console.log(error);
    }
  }

  return (
    <Pressable style={[styles.buttonFlexBox]} 
    onPress={Like_}>
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
                    {SimplifyNumber(Likes.length)}
                </Text>
            }
            style={styles.textContainer}>
            <LinearGradient
                start={{x:0.5, y:0}}
                end={{x:0.5, y:1}}
                colors={["#FF7854", "#FD267D"]}>
                <Text style={[styles.suggested, styles.suggestedTypo, {opacity: 0}]}>
                    {SimplifyNumber(Likes.length)}
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
