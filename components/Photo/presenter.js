import React from "react";
import PropTypes from "prop-types";
import { View, Text, TouchableOpacity,Image, Dimensions,StyleSheet } from "react-native";
import FadeIn from "react-native-fade-in-image";
import PhotoActions from "../PhotoActions"
import { withNavigation } from "react-navigation";


const { width, height } = Dimensions.get("window");

const Photo = props => (
    <View style={styles.photo}>
        <TouchableOpacity>
            <View style={styles.header}>
                <FadeIn>
                    <Image
                        source={
                            props.creator.profile_image ? {
                                uri: props.creator.profile_image
                            } : require("../../assets/images/noPhoto.jpg")
                        }
                        style={styles.avatar}
                    />
                </FadeIn>
                <View >
                    <Text style={styles.author}>{props.creator.username}</Text>
                    {props.location && <Text style={styles.location}>{props.location}</Text>}
                </View>
            </View>
        </TouchableOpacity>
        <FadeIn>
            <Image style={{width, height: props.is_vertical ? 600 : 300}} source={{uri: props.file}}/>
        </FadeIn>
        <View style={styles.photoMeta}>
            <PhotoActions
                isLiked={props.isLiked}
                likeCount={props.likeCount}
                handlePress={props.handlePress}
            />
            <View style={styles.comment}>
                <Text style={styles.commentAuthor}>
                    {props.creator.username}
                    <Text style={styles.message}>{props.caption}</Text>
                </Text>
            </View>
            {props.comment.length > 0 && (
                <View style={styles.commentLink}>
                    <TouchableOpacity onPressOut={() => props.navigation.navigate("Comments")}>
                        {props.comments.length ===1 ? (
                            <Text style={styles.linkText}>View 1 comment</Text>
                        ): (<Text style={styles.linkText}> View all {props.comments.length} comment</Text>)}
                    </TouchableOpacity>
                </View>
            )}
            <Text style={styles.dateText}>{props.natural_time.toUpperCase()}</Text>
        </View>
    </View>
);


const styles = StyleSheet.create({
    photo:{
        width,
        marginTop: 10
    },
    header:{
        paddingHorizontal:15,
        flexDirection:"row",
        paddingVertical:15,
        alignItems:"center",
        borderBottomColor: "#bbb",
        borderWidth: StyleSheet.hairlineWidth,
        flex:1,

    },
    avatar:{
        width:40,
        height:40,
        borderRadius: 20,
        marginRight: 10
    },
    author:{
        fontWeight: "600",
        marginBottom: 3,
        fontSize: 15
    },
    location:{
        fontSize:13
    },
    photoMeta:{
        paddingHorizontal: 15
    },
    comment:{
        marginTop:5
    },
    commentAuthor:{
        fontWeight: "600",
        marginRight:5,
        fontSize:14,
    },
    message:{
        fontWeight:"400",
        fontSize:15,
    },
    commentLink:{
        marginTop:5
    },
    linkText:{
        fontSize:15,
        color:"#999"
    },
    dateText:{
        marginTop: 10,
        fontSize: 12,
        color: "#999"
    }
});

Photo.proptype = {
    id: PropTypes.number.isRequired,
    creator: PropTypes.shape({
        propfile_image: PropTypes.string,
        username: PropTypes.string.isRequired,
    }).isRequired,
    location: PropTypes.string.isRequired,
    file: PropTypes.string.isRequired,
    like_count: PropTypes.number.isRequired,
    caption: PropTypes.string.isRequired,
    comments: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            message: PropTypes.string.isRequired,
            creator: PropTypes.shape({
                propfile_image: PropTypes.string,
                username: PropTypes.string.isRequired,
            }).isRequired
        })
    ).isRequired,
    natural_time: PropTypes.number.isRequired,
    is_liked: PropTypes.is_liked,
    is_vertical: PropTypes.bool.isRequired,
    handlePress : PropTypes.func.isRequired
};

export default withNavigation(Photo);
