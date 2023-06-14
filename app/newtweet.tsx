import { View,Text,StyleSheet, Pressable,Image,TextInput,SafeAreaView } from "react-native"
import {useState} from 'react'
import {Link,useRouter} from 'expo-router'
const user={
    id: 'u1',
    username: 'elonmusk',
    name: 'Elon Musk',
    image:'https://pbs.twimg.com/profile_images/1590968738358079488/IY9Gx6Ok.jpg'
}
export default ()=>{
    const [text,setText]=useState('')
    const router=useRouter()
    const tweetsubmit=()=>{
        console.warn("Posting the Tweet: "+text)
        setText('')
        router.back()
    }
    return(
        <SafeAreaView style={{flex:1,backgroundColor:'white'}}>
            <View style={styles.container}>
                <View style={styles.buttonContainer}>
                    <Link href={'../'}>
                        <Text style={{fontSize:20}}>Cancel</Text>
                    </Link>
                    <Pressable onPress={tweetsubmit} style={styles.tweetButton}>
                        <Text style={styles.tweetText}>Tweet</Text>
                    </Pressable>
                </View>
                <View style={styles.tweetContainer}>
                    <Image source={{uri:user.image}} style={styles.image}/>
                    <TextInput
                        value={text}
                        onChangeText={setText}
                        placeholder="What's happening?"
                        multiline
                        numberOfLines={5}
                        style={styles.input}
                    />
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles=StyleSheet.create({
    container:{
        paddingTop:30,
        padding:15,
        flex:1
    },
    buttonContainer:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        marginVertical:10
    },
    tweetButton:{
        backgroundColor:'#1D9AF1',
        padding:10,
        paddingHorizontal:20,
        borderRadius:50
    },
    tweetText:{
        color:'white',
        fontWeight:'600',
        fontSize:16
    },
    tweetContainer:{
        flexDirection:'row'
    },
    image:{
        width:50,
        aspectRatio:1,
        borderRadius:50,
        marginRight:10
    },
    input:{
        flex:1,
        textAlignVertical:'top'
    }
})