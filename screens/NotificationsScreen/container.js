import React,{ Component } from "react";
import NotificaionsScreen from "./presenter";
import { Image,View } from "react-native";
import PropTypes from "prop-types";

class Container extends Component{
    static propTypes = {
        notifications: PropTypes.array,
        getNotifications: PropTypes.func.isRequired
    };
    state = {
        isFetching: false
    };

    static navigationOptions = ({navigation}) => ({
        headerTitle: (
            <Image
                source={require("../../assets/images/logo.png")}
                style={{height:35}}
                resizeMode={"contain"}
            />
        ),
        headerLeft: (null),
        headerTitleStyle: {
            alignSelf: 'center',
            flexGrow : 1
        },
        headerRight: (
            <View/>
        )
    });



    componentWillReceiveProps = (nextProps) => {
        if(nextProps.feed) {
            this.setState({
                isFetching: false
            })
        }
    };

    _refresh = () => {
        const { getNotifications } = this.props;
        this.setState({
            isFetching: true
        })
        getNotifications();
    };


    render() {
        return <NotificaionsScreen
            {...this.props}
            {...this.state}
            refresh={this._refresh}
        />
    }
}

export default Container;