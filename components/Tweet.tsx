import { View,Text,Image,StyleSheet } from "react-native"
import tweets from "../assets/data/tweets";
const Tweet=({tweet}:{tweet:any})=>{
    return (
        <View style={styles.container}>
            <Image source={{uri:tweet.user.image}} style={styles.imagestyle}/>
            <View style={styles.maincontainer}>
                <Text style={styles.name}>{tweet.user.name}</Text>
                <Text style={styles.content}>{tweet.content}</Text>
            </View>
        </View>
    )
}
const styles=StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: 10,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor:'lightgrey'
      },
      imagestyle: {
        width:50,
        height:50,
        borderRadius:50
      },
      maincontainer: {
        flex:1,
        marginLeft:10
      },
      name: {
        fontWeight:"600"
      },
      content: {
        lineHeight: 20,
        marginTop: 5
      }
})
export default Tweet