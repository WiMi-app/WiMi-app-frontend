import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from 'react-native';
import {
  FontFamily,
  Color,
  FontSize,
  Gap,
  Padding,
} from "../../(tabs)/GlobalStyles";
import { getCommentList, createComment } from '@/app/fetch/comments';
import ProfilePhoto from '../profile/profilephoto';
import { getMyData } from '@/app/fetch/user';
import { LinearGradient } from 'expo-linear-gradient'

interface CommentSectionProps {
  postId: string;
  onClose: () => void;
}

const CommentSection: React.FC<CommentSectionProps> = ({ postId, onClose }) => {
  const [comments, setComments] = useState<any[]>([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    fetchComments();
    fetchCurrentUser();
  }, [postId]);

  const fetchCurrentUser = async () => {
    const userData = await getMyData();
    setCurrentUser(userData);
  };

  const fetchComments = async () => {
    try {
      const commentsData = await getCommentList();
      if (commentsData) {
        setComments(commentsData.filter((comment: any) => comment.post_id === postId));
      }
    } catch (error) {
      console.error('Failed to fetch comments:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddComment = async () => {
    if (!newComment.trim()) return;

    try {
      const commentData = {
        post_id: postId,
        content: newComment.trim()
      };

      await createComment(commentData as any);
      setNewComment('');
      Keyboard.dismiss();
      fetchComments(); // Refresh comments after adding
    } catch (error) {
      console.error('Failed to add comment:', error);
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
    >
      <View style={styles.header}>
        <Text style={styles.title}>Comments</Text>
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <Text style={styles.closeButtonText}>✕</Text>
        </TouchableOpacity>
      </View>

      <ScrollView 
        style={styles.commentsList}
        keyboardShouldPersistTaps="handled"
      >
        {loading ? (
          <ActivityIndicator size="large" color={Color.colorMediumpurple} />
        ) : comments.length === 0 ? (
          <Text style={styles.noComments}>No comments yet</Text>
        ) : (
          comments.map((comment) => (
            <View key={comment.id} style={styles.commentItem}>
              <ProfilePhoto
                photo={comment.user?.profile_pic ? { uri: comment.user.profile_pic[0] } : require('../../../assets/images/defaultprofile.jpg')}
                Status={1}
                width={32}
                height={32}
              />
              <View style={styles.commentContent}>
                <Text style={styles.commentUsername}>{comment.user?.username || 'Anonymous'}</Text>
                <Text style={styles.commentText}>{comment.content}</Text>
              </View>
            </View>
          ))
        )}
      </ScrollView>

      <View style={styles.inputContainer}>
        <ProfilePhoto
          photo={currentUser?.profile_pic ? { uri: currentUser.profile_pic[0] } : require('../../../assets/images/defaultprofile.jpg')}
          Status={1}
          width={32}
          height={32}
        />
        <TextInput
          style={styles.input}
          placeholder="Add a comment..."
          placeholderTextColor={"#777"}
          value={newComment}
          onChangeText={setNewComment}
          multiline
          maxLength={500}
        />
        <TouchableOpacity
          onPress={handleAddComment}
          disabled={!newComment.trim()}
        >
            <LinearGradient
            colors={!newComment.trim() ? ['#e2e8f0', '#e2e8f0'] : ['#FFC166', '#FF9966']}
            style={[styles.postButton, !newComment.trim() && styles.postButtonDisabled]}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
          >
            <Text style={[styles.postButtonText, !newComment.trim() && styles.postButtonTextDisabled]}>
                Post
            </Text>
           </LinearGradient>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.primaryWhite,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: '80%',
    padding: Padding.p_base,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: Color.greyscale200,
  },
  title: {
    fontSize: FontSize.size_base,
    fontFamily: FontFamily.poppinsSemiBold,
    color: Color.black,
  },
  closeButton: {
    padding: 8,
  },
  closeButtonText: {
    fontSize: FontSize.size_base,
    color: Color.gray1,
  },
  commentsList: {
    flex: 1,
    marginTop: 16,
  },
  noComments: {
    textAlign: 'center',
    color: Color.gray1,
    fontFamily: FontFamily.poppinsRegular,
    marginTop: 32,
  },
  commentItem: {
    flexDirection: 'row',
    marginBottom: 16,
    gap: Gap.gap_sm,
  },
  commentContent: {
    flex: 1,
    backgroundColor: Color.greyscale200,
    padding: 12,
    borderRadius: 12,
  },
  commentUsername: {
    fontFamily: FontFamily.poppinsSemiBold,
    fontSize: FontSize.size_sm,
    color: Color.black,
    marginBottom: 4,
  },
  commentText: {
    fontFamily: FontFamily.poppinsRegular,
    fontSize: FontSize.size_sm,
    color: Color.gray1,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Gap.gap_sm,
    paddingTop: 16,
    paddingBottom: 16,
    borderTopWidth: 1,
    borderTopColor: Color.greyscale200,
    backgroundColor: Color.primaryWhite,
  },
  input: {
    flex: 1,
    backgroundColor: Color.greyscale200,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    fontFamily: FontFamily.poppinsRegular,
    fontSize: FontSize.size_sm,
    maxHeight: 100,
    color: Color.black,
  },
  postButton: {
    // backgroundColor: '#FFC166',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  postButtonDisabled: {
    backgroundColor: Color.greyscale200,
  },
  postButtonText: {
    color: Color.primaryWhite,
    fontFamily: FontFamily.poppinsSemiBold,
    fontSize: FontSize.size_sm,
  },
  postButtonTextDisabled: {
    color: Color.gray1,
  },
});

export default CommentSection; 