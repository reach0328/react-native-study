import { createTabNavigator } from "react-navigation";
import CameraScreen from "../screens/CameraScreen";
import LibararyScreen from "../screens/LibraryScreen";

const AddPhotoNavigations = createTabNavigator(
    {
        Camera: {
            screen: CameraScreen,
            navigationOptions: {
                tabBarLabel: "photo"
            }
        },
        Library: {
            screen: LibararyScreen,
            navigationOptions: {
                tabBarLabel: "libary"
            }
        }
    },
    {
        tabBarPosition: "top",
        swipeEnabled: true,
        animationEnabled: true,
        tabBarOptions: {
            showLabel: true,
            upperCaseLabel: true,
            activeTintColor: "black",
            inactiveTintColor: "#bbb",
            style: {
                backgroundColor: "white",
                alignItems: "center",

            },
            labelStyle: {
                fontSize: 14,
                fontWeight: "600",
            },
            showIcon: false
        }
    }
);

export default AddPhotoNavigations;