import React from "react";
import PropTypes from "prop-types";
import { View, Text, FlatList, RefreshControl, StyleSheet, ScrollView } from "react-native";
import Photo from "../../components/Photo"
import SquarePhoto from "../../components/SquarePhoto";

const SearchScreen = props => (
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
                props.search.length===0 && props.searchingBy.length > 1 ?
                    (<Text style={styles.notFound}>No Image</Text>) :
                    props.search.map(photo => <SquarePhoto key={photo.id} imageURL={photo.file}/>)
            }
        </View>
    </ScrollView>
);

const styles = StyleSheet.create({
    container: {
        flex:1,
        flexDirection: "row",
        flexWrap: "wrap"
    },
    notFound: {
        color:"#BBB",
        fontWeight: "600",
        alignItems: "center",
        textAlign: "center",
        width,
        marginTop: 20,

    }
});

SearchScreen.prototype = {
    isFetching: PropTypes.bool.isRequired,
    refresh: PropTypes.func.isRequired,
    search: PropTypes.array.isRequired
};


export default SearchScreen;

