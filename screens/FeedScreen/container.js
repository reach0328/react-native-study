import React,{ Component } from "react";
import FeedScreen from "./presenter";
import { Image,View } from "react-native";
import NavButton from "../../components/NavButton";
import PropTypes from "prop-types";

class Container extends Component{
    static propTypes = {
        feed: PropTypes.array,
        getFeed: PropTypes.func.isRequired
    };

    static navigationOptions = ({navigation}) => ({
        headerTitle: (
            <Image
                source={require("../../assets/images/logo.png")}
                style={{height:35}}
                resizeMode={"contain"}
            />
        ),
        headerLeft: (
            <NavButton
                iconName={"ios-camera-outline"}
                onPress={() => navigation.navigate("TakePhoto")}
            />
        ),
        headerTitleStyle: {
            alignSelf: 'center',
            flexGrow : 1
        },
        headerRight: (
            <View/>
        )
    });

    state = {
        isFetching: false
    };

    componentWillReceiveProps = (nextProps) => {
      if(nextProps.feed) {
          this.setState({
              isFetching: false
          })
      }
    };

    _refresh = () => {
        const { getFeed } = this.props;
        this.setState({
            isFetching: true
        })
        getFeed();
    };


    render() {
        return <FeedScreen
            {...this.props}
            {...this.state}
            refresh={this._refresh}
        />
    }
}

export default Container;