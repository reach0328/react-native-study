import React from "react";
import PropTypes from "prop-types";
import { View, Text, FlatList, RefreshControl, StyleSheet, ScrollView } from "react-native";
import Photo from "../../components/Photo"
import Notification from "../../components/Notification";

const NotificaionsScreen = props => (
    <ScrollView
        refreshControl={
            <RefreshControl
                refreshing={props.isFetching}
                onRefresh={props.refresh}
                tintColor={"black"}
            />
        }
    >
        <View style={styles.container}>
            {
                props.notifications.length===0 && props.notifications.length > 1 ?
                    (<Text style={styles.notFound}>No</Text>) :
                    props.notifications.map(notification =>
                        <Notification key={notification.id} {...notification}/>
                    )
            }
        </View>
    </ScrollView>
);

const styles = StyleSheet.create({
    container: {
        flex:1
    },
    notFound: {
        color:"#BBB",
        fontWeight: "600",
        alignItems: "center",
        textAlign: "center",
        marginTop: 20,

    }
});

NotificaionsScreen.prototype = {
    isFetching: PropTypes.bool.isRequired,
    refresh: PropTypes.func.isRequired,
    notifications: PropTypes.array.isRequired
};


export default NotificaionsScreen;

