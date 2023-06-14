import { withLayoutContext } from 'expo-router';
import { createDrawerNavigator } from '@react-navigation/drawer';
const DrawerNavigation=createDrawerNavigator().Navigator
const Drawer=withLayoutContext(DrawerNavigation)
export default () => {
    return <Drawer/>
}