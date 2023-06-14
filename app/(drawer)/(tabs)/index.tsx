import { StyleSheet,View,FlatList } from 'react-native';
import {Link} from 'expo-router';
import tweets from '../../../assets/data/tweets';
import Tweet from '../../../components/Tweet';
import { Entypo } from '@expo/vector-icons';
export default function TabOneScreen() {
  return (
    <View style={styles.page}>
      <FlatList data={tweets} renderItem={({item})=><Tweet tweet={item} /*a={"111"}*//>}/>
      <Link href={'/newtweet'} asChild>
        <Entypo 
          name="plus" 
          size={24} 
          color="white"
          style={styles.floatingplus}
          />
      </Link>
    </View>
  );
}
const styles = StyleSheet.create({
  page: {
    flex:1,
    backgroundColor:'white'
  },
  floatingplus:{
    backgroundColor: '#1D9AF1',
    borderRadius:25,
    padding:15,
    position:'absolute',
    right:15,
    bottom:15,
    shadowOpacity: 0.25,
    ShadowRadius: 3.84,
    ShadowOffset: {width: 0, height: 2},
    elevation:5
  }
});
