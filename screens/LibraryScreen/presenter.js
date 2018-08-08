import React from "react";
import PropTypes from "prop-types";
import {View, Text, StyleSheet, Dimensions, ScrollView, TouchableOpacity, Image, StatusBar} from "react-native";
import FitImage from "react-native-fit-image";
import { MaterialIcons } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

const LibraryScreen = props => (
    <View style={styles.container}>
        <StatusBar hidden={true}/>
        {props.photos &&(
            <View style={styles.pictureContainer}>
                <FitImage
                    source={{uri: props.pickedPhoto.node.image.uri}}
                />
                <TouchableOpacity onPressOut={props.approvePhoto}>
                    <View style={styles.action}>
                        <MaterialIcons name={"check-circle"} color={"white"} size={40}/>
                    </View>
                </TouchableOpacity>
            </View>
        )}
        {props.photos && (
            <View style={styles.photos}>
                <ScrollView
                    contentContainerStyle={styles.scrollViewContainer}
                >
                    {
                        props.photos.map(photo =>(
                            <TouchableOpacity  onPressOut={() => props.pickPhoto(photo)}>
                                <Image
                                    source={{uri :photo.node.image.uri}}
                                    style={styles.smallPhoto}
                                />

                            </TouchableOpacity>
                        ))
                    }
                </ScrollView>
            </View>
        )}
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex:1
    },
    pictureContainer: {
        flex:2,
        justifyContent: "center",

    },
    photos: {
        flex:1
    },
    scrollViewContainer: {
        flexDirection: "row",
        flexWrap: "wrap"
    },
    smallPhoto: {
        width: width/3,
        height: width/3
    },
    action : {
        backgroundColor:"transparent",
        height: 40,
        width: 40,
        alignSelf: "flex-end",
        bottom:10,
        right:10,

    }
});


LibraryScreen.prototype = {
    pickedPhoto: PropTypes.object,
    photo: PropTypes.array,
    approvePhoto : PropTypes.func,
    position: "absolute",

};

export default LibraryScreen;

