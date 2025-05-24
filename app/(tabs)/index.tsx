import * as React from "react";
import { useRouter } from 'expo-router';
import { StyleSheet, Text, View, Image, Alert, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Post from "../components/index_home/post"
import { Color, Gap, FontSize, Padding, FontFamily } from "./GlobalStyles";
import {getToken} from "../store/token";
import apiClient from "../api/refresh";

type UserPostData = {
  id: string;
  username: string;
  profile_pic: string;
  elapsed_post_time: string;
  challenge: string;
  post_photo: string;
  description: string;
  likes: string[];
  comments: number;
}

// PLACE HOLDER FOR POST DATA
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
  <View style={[{paddingVertical:5}]}>
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

export default function HomeScreen() {
  const router = useRouter();

  async function token(){
  
  try{
  const access_token = await getToken('accessToken');
  const refresh_token = await getToken('refreshToken');
  console.log(access_token);
  console.log(refresh_token);
  const response = await apiClient.get('/api/v0/users/me',{
        headers: { Authorization: `Bearer ${access_token}` },
      });
  console.log(response.data);
  }catch(error){
    console.log(error);
  }
  }

  token();

  return (
    <SafeAreaView style={styles.homeScreen}>
      {/* <View style={styles.postList}> */}
        <View style={[styles.homeHeader, styles.postFlexBox]}>
          <View style={[styles.headerLayout, styles.homeTabsFlexBox]}>
            <Image
              style={styles.iconLayout1}
              // contentFit="cover"
              source={require("../../assets/wimi-logo.png")}
              width={48}
              height={48}
            />
            <View style={[styles.homeTabs, styles.homeTabsFlexBox]}>
              <Text style={[styles.suggested, styles.suggestedTypo]}>
                Suggested
              </Text>
              <Text style={[styles.following, styles.suggestedTypo]}>
                Following
              </Text>
            </View>
            <Image
              style={[styles.editIcon, styles.iconLayout1]}
              width={48}
              height={48}
              source={require("../../assets/edit button.png")}
            />
          </View>
        </View>
        <FlatList
          data={POSTDATA}
          renderItem={({item}) => <PostItem postItem={item}/>}
          keyExtractor={item => item.id}
          style={[{width:"100%"}]}
          showsVerticalScrollIndicator={false}
        />
      {/* </View> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  postFlexBox: {
    backgroundColor: Color.primaryWhite,
    alignSelf: "stretch",
    alignItems: "center",
  },
  homeTabsFlexBox: {
    gap: Gap.gap_0,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
  suggestedTypo: {
    textAlign: "center",
    lineHeight: 24,
    fontSize: FontSize.size_base,
  },
  iconLayout1: {},
  infoSpaceBlock: {
    paddingVertical: 0,
    paddingHorizontal: Padding.p_9xl,
    alignSelf: "stretch",
  },
  usernameFlexBox: {
    textAlign: "left",
    alignSelf: "stretch",
  },
  taskClr: {
    color: Color.gray1,
    fontFamily: FontFamily.poppinsRegular,
  },
  taskTypo: {
    fontSize: FontSize.size_sm,
    textAlign: "left",
    lineHeight: 24,
  },
  iconLayout: {
    maxWidth: "100%",
    overflow: "hidden",
    width: "100%",
  },
  buttonFlexBox: {
    gap: Gap.gap_md,
    height: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  suggested: {
    fontFamily: FontFamily.poppinsSemiBold,
    fontWeight: "600",
    textAlign: "center",
  },
  following: {
    fontWeight: "500",
    fontFamily: FontFamily.poppinsMedium,
    color: "#0b0b0b",
  },
  homeTabs: {
    flex: 1,
  },
  editIcon: {
    borderRadius: 50,
  },
  headerLayout: {
    paddingVertical: 0,
    paddingHorizontal: Padding.p_9xl,
    alignSelf: "stretch",
  },
  homeHeader: {
    height: 48,
    justifyContent: "flex-end",
    alignSelf: "stretch",
    alignItems: "center",
  },
  username: {
    color: Color.black,
    fontFamily: FontFamily.poppinsSemiBold,
    fontWeight: "600",
    lineHeight: 24,
    fontSize: FontSize.size_base,
    textAlign: "left",
  },
  postTime: {
    fontSize: 12,
    lineHeight: 20,
    textAlign: "left",
    alignSelf: "stretch",
  },
  userPostInfo: {
    gap: 4,
    flex: 1,
  },
  moreButton: {
    overflow: "hidden",
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
  taskInfo: {
    flexDirection: "row",
    paddingVertical: 0,
  },
  iceBucketPhoto1: {
    height: 500,
    alignSelf: "stretch",
  },
  seeMoreTypo: {
    color: Color.black,
    fontFamily: FontFamily.poppinsSemiBold,
    fontWeight: "600",
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
  icon: {
    position: "absolute",
    height: "95%",
    top: "4%",
    right: "0%",
    bottom: "1%",
    left: "0%",
    maxHeight: "100%",
  },
  heart: {

  },
  heartButton: {
    width: 49,
  },
  commentButton: {
    width: 40,
  },
  deadSpace: {
    height: 20,
    flex: 1,
  },
  shareButtonIcon: {},
  postButton: {
    paddingBottom: 20,
    gap: 24,
    paddingHorizontal: Padding.p_9xl,
    flexDirection: "row",
    alignSelf: "stretch",
    alignItems: "center",
  },
  divider: {
    borderStyle: "solid",
    borderColor: "#e5e7eb",
    borderTopWidth: 1,
    height: 1,
    alignSelf: "stretch",
  },
  postList: {
    alignSelf: "stretch",
    alignItems: "center",
  },
  homeScreen: {
    // height: 926,
    minWidth: 360,
    maxWidth: 500,
    alignItems: "center",
    overflow: "hidden",
    width: "100%",
    // flex: 1,
    backgroundColor: Color.primaryWhite,
  },
});
