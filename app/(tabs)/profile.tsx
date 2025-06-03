import {useEffect,useState } from "react";
import ProfileStats from "../components/profile/profilestats";
import { StyleSheet, Text, View, Pressable, TextInput, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ProfilePhoto from "../components/profile/profilephoto";
import {
  FontFamily,
  Color,
  FontSize,
  Gap,
  Border,
  Padding,
} from "./GlobalStyles";
import { useNavigation } from "expo-router";
import { getMyData } from "../fetch/user";
import { UserData } from "../interfaces/user";
import { UserPostData } from '../interfaces/post';
import Post from '../components/index_home/post';

//POSTDATA
const POSTDATA = [
  {
    id: "1",
    username: "john_doe",
    profile_pic: "../../../assets/profile img.png",
    elapsed_post_time: "ignore for now...",
    challenge: "Ice Bucket Challenge",
    post_photo: "../../../assets/ice-bucket-photo.png", // IMG PLACEHOLDER
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt... ",
    likes: ["user", "user", "user", "user", "user", "user", "user", "user", "user", "user",
            "user", "user", "user", "user", "user", "user", "user", "user", "user", "user",
            "user", "user", "user", "user", "user", "user", "user", "user", "user", "user",
            "user", "user", "user", "user", "user", "user", "user", "user", "user", "user",
            "user", "user", "user", "user", "user", "user"],
    comments: 11,  // change to object/array of comments later...
  },
  {
    id: "2",
    username: "jill_martin",
    profile_pic: "../../../assets/profile img.png",
    elapsed_post_time: "ignore for now...",
    challenge: "Run a 5K",
    post_photo: "../../../assets/ice-bucket-photo.png",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt... ",
    likes: ["user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user",
            "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user",
            "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user",
            "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user",
            "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user",
            "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user",
            "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user",
            "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user"
          ],
    comments: 248,
  },
  {
    id: "3",
    username: "jerry_smith",
    profile_pic: "../../../assets/profile img.png",
    elapsed_post_time: "ignore for now...",
    challenge: "Take two strokes off your golf game",
    post_photo: "../../../assets/ice-bucket-photo.png",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt... ",
    likes: ["user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user",
            "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user",
            "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user",
            "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user",
            "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user",
            "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user",
            "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user",
            "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user",
            "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user",
            "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user",
            "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user",
            "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user",
            "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user",
            "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user",
            "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user",
            "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user",
            "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user",
            "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user", "user"
          ],
    comments: 316,
  },  
];

type UserPostProps = {
  postItem: UserPostData;
};

const PostItem = ({postItem}: UserPostProps) => (
  <View style={[{paddingVertical:0}]}>
    <Post 
      profile_name={postItem.username} 
      num_likes={postItem.likes.length} 
      num_comments={postItem.comments}
      profile_pic={postItem.profile_pic}
      post_pic={postItem.post_photo}
      challenge={postItem.challenge}
      post_description={postItem.description}/>
    <View style={styles.divider} />    
  </View>
);

const ProfileScreen = () => {
  const navigation = useNavigation();
  const [userData, setUserData] = useState<UserData | null>(null);
  const[error, setError] = useState<Boolean>(false);

  useEffect(() => {
    (async () => { 
      const data = await getMyData(); 
      data?setUserData(data):setError(true);
    })();
  }, []);

  return (
    <SafeAreaView style={styles.profileScreen} edges={['top', 'left', 'right']}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.content}>
          <View style={styles.profileInfoLayout}>
            <View style={styles.profilePicname}>

              <ProfilePhoto photo={require('../../assets/test/profile.png')} Status={1} size={60}/>

              <View style={styles.profileName}>
                <Text style={styles.name}>{userData?.full_name} </Text>
                <Text style={styles.username}>@{userData?.username}</Text>
              </View>

            </View>
            
            <ProfileStats posts = {0} followers={1_000_000} following={1_000}/>

            <View style={styles.profileButtons}>
              <Pressable style={styles.editProfileButton} onPress={() => navigation.navigate('(settings)')}>
                <Text style={styles.editProfile}>Edit Profile</Text>
              </Pressable>
              <Pressable style={styles.shareProfileButton}>
                <Text style={styles.shareProfile}>Share Profile</Text>
              </Pressable>
            </View>
            <Text style={styles.bio} > {userData?.bio} </Text>
          </View>
          <View style={styles.photos}>
            <View style={styles.title}>
              <Text style={styles.tittle}>Posts</Text>
              <Text style={styles.tittle1}>See All</Text>
            </View>
            {POSTDATA.map((item) => (
              <View key={item.id} style={{ padding: 0 }}>
                <PostItem postItem={item}/>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  profilePicIcon: {
    position: "relative",
    width: 96,
    height: 96,
  },
  name: {
    position: "relative",
    fontSize: 20,
    lineHeight: 25,
    fontWeight: "700",
    fontFamily: FontFamily.interBold,
    color: Color.greyscale900,
    textAlign: "center",
  },
  username: {
    position: "relative",
    fontSize: FontSize.size_sm,
    letterSpacing: 0,
    lineHeight: 22,
    fontWeight: "500",
    fontFamily: FontFamily.interMedium,
    color: Color.greyscale500,
    textAlign: "center",
  },
  profileName: {
    flex: 1,
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    gap: Gap.gap_sm,
  },
  profilePicname: {
    alignSelf: "stretch",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: Gap.gap_lg,
    padding: 1
  },
  editProfile: {
    alignSelf: "stretch",
    position: "relative",
    fontSize: FontSize.size_sm,
    lineHeight: 22,
    fontWeight: "700",
    fontFamily: FontFamily.interBold,
    color: Color.colorBlack,
    textAlign: "center",
  },
  editProfileButton: {
    flex: 0.6754,
    borderRadius: Border.br_8xs,
    borderStyle: "solid",
    borderColor: Color.colorBlack,
    borderWidth: 2,
    height: 30,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 37,
    paddingVertical: 0,
  },
  shareProfile: {
    position: "relative",
    fontSize: FontSize.size_sm,
    lineHeight: 22,
    fontWeight: "700",
    fontFamily: FontFamily.interBold,
    color: Color.colorBlack,
    textAlign: "center",
  },
  shareProfileButton: {
    flex: 1,
    borderRadius: Border.br_8xs,
    borderStyle: "solid",
    borderColor: Color.colorBlack,
    borderWidth: 2,
    height: 30,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  profileButtons: {
    alignSelf: "stretch",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: Gap.gap_lg,
  },
  bio: {
    alignSelf: "stretch",
    borderRadius: Border.br_xs,
    backgroundColor: Color.primaryWhite,
    height: 70,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    fontWeight: "500",
    fontFamily: FontFamily.interMedium,
    fontSize: FontSize.size_sm,
  },
  profileInfoLayout: {
    alignSelf: "stretch",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    gap: Gap.gap_lg,
  },
  tittle: {
    position: "relative",
    fontSize: FontSize.size_base,
    letterSpacing: 0,
    lineHeight: 26,
    fontWeight: "600",
    fontFamily: FontFamily.interSemiBold,
    color: Color.greyscale900,
    textAlign: "left",
  },
  tittle1: {
    position: "relative",
    fontSize: FontSize.size_xs,
    lineHeight: 19,
    fontFamily: FontFamily.interRegular,
    color: Color.primary600Base,
    textAlign: "right",
  },
  title: {
    width: 308,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 0,
  },
  imageIcon: {
    position: "relative",
    width: 100,
    height: 100,
  },
  rowPosts: {
    alignSelf: "stretch",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: Gap.gap_md,
  },
  gallery: {
    alignSelf: "stretch",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: Gap.gap_md,
  },
  photos: {
    alignSelf: "stretch",
    borderRadius: Border.br_xs,
    backgroundColor: Color.primaryWhite,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingHorizontal: Padding.p_base,
    paddingVertical: 20,
    gap: 0,
  },
  content: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingHorizontal: 10,
    gap: 10,
    paddingBottom: 20,
  },
  profileScreen: {
    flex: 1,
    width: "100%",
    backgroundColor: Color.primaryWhite,
    minWidth: 360,
    maxWidth: 500,
  },
  scrollContent: {
    flexGrow: 1,
  },
  divider: {
    borderStyle: "solid",
    borderColor: "#e5e7eb",
    borderTopWidth: 1,
    height: 1,
    alignSelf: "stretch",
  },
});

export default ProfileScreen;
