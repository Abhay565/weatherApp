import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {
  responsiveWidth as W,
  responsiveHeight as H,
  responsiveFontSize as S,
} from 'react-native-responsive-dimensions';
import Feather from 'react-native-vector-icons/Feather';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import {debounce, flatMap} from 'lodash';
import {fetchLocations, fetchWeatherForecast} from './Api';

const HomeScreen = () => {
  const [showSearch, toggleSearch] = useState(false);
  const [loc, setLocation] = useState([]);
  const [ weather, setWeather ] = useState({})
  const [ loading, setLoading] = useState(false)

  const handleLocation = loc => {
    console.log('location----', loc);
    setLocation([]);
    toggleSearch(false);
    fetchWeatherForecast({
      cityName: loc.name,
      days: "7" 
    }).then( data=>{
      setWeather(data);
      console.log("got forcast data--",data);
      
    } )
  };

  const handleSearch = value => {
    // fetch Location

    if (value.length > 2) {
      fetchLocations({cityName: value}).then(data => {
        console.log('got location---', data);
        setLocation(data);
      });
    }
  };

// useEffect(()=>{
//  fetchMyWeatherData();
// },[]);

// const fetchMyWeatherData = async ()=>{
//   fetchWeatherForecast({
//     cityName: "harayana",
//     days: "7"
//   }).then( data=>{
//     setWeather(data)
//   })
// }


  const handleTextDebounce = useCallback(debounce(handleSearch, 500), []);


 const { current, location } = weather;

  return (
    <ImageBackground
      style={styles.backImage}
      source={require('../images/back2.jpg')}>
    

        {showSearch ? (
           <View style={styles.inputContainer}>
          <TextInput
            placeholder="search..."
            style={styles.input}
            onChangeText={handleTextDebounce}
          />
            <TouchableOpacity style={{flexDirection:"row"}} onPress={() => toggleSearch(!showSearch)}>
          <Feather
            name="search"
            size={24}
            color={'black'}
          />
        </TouchableOpacity>
           </View>
        ) : <View style={{marginHorizontal: W(8),
          marginVertical: W(8),
          borderRadius: 25,
          backgroundColor: 'transparent',
          flexDirection: 'row',
          justifyContent: 'flex-end',
          alignItems: 'center',
          gap: W(50),
          height:50,width:300,
        
          }}>
        
          <TouchableOpacity style={{flexDirection:"row",backgroundColor:'white',height:50,width:50,borderRadius:25,justifyContent:'center',alignItems:'center'}} onPress={() => toggleSearch(!showSearch)}>
        <Feather
          name="search"
          size={24}
          color={'black'}
        />
      </TouchableOpacity>
         </View> }

        
     

      { showSearch && (loc.length > 0 ? (
        <View style={styles.View}>
          {loc.map((loc, index) => {
            return (
              <TouchableOpacity
                key={index}
                style={styles.content}
                onPress={() => handleLocation(loc)}>
                <View style={styles.div}>
                  <EvilIcons name="location" size={S(2.5)} />
                  <Text style={styles.cityText}>
                    {loc?.name},{loc?.country}
                  </Text>
                </View>
                <View style={styles.line}></View>
              </TouchableOpacity>
            );
          })}
        </View>
      ) : null) }



      <View style={{ justifyContent: "space-around", alignItems: 'center',marginTop:W(20)}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{fontSize: 18, color: '#fff'}}>{location?.name},</Text>
          <Text style={{fontSize: 14, color: 'rgba(255,255,255,0.5)'}}>
            {" "+location?.country}
          </Text>
        </View>
        <View>
          <Image
            source={{ uri: "https:"+current?.condition?.icon}}
            style={styles.image}
          />
        </View>

        <View style={{marginTop: W(2)}}>
          <Text style={{fontSize: S(6), color: '#fff'}}> {current?.temp_c}&#176;</Text>
          <Text style={{fontSize: S(2), color: '#fff'}}> {current?.condition?.text}</Text>
        </View>

        <View style={styles.row}>
          <View style={styles.rowContent}>
            <Feather name="wind" size={S(3)} color={'#fff'} />
            <Text style={styles.wind}>{current?.wind_kph}km</Text>
          </View>
          <View style={styles.rowContent}>
            <Entypo name="drop" size={S(3)} color={'#fff'} />
            <Text style={styles.wind}>{current?.humidity}%</Text>
          </View>
          <View style={styles.rowContent}>
            <Feather name="sun" size={S(3)} color={'#fff'} />
            <Text style={styles.wind}>06:05 Am</Text>
          </View>
        </View>

        <View style={{flexDirection: 'row', marginTop: W(6), gap: W(2)}}>
          <Feather name="calendar" size={S(2.8)} color={'#fff'} />
          <Text style={styles.wind}>Daily forcast</Text>
        </View>
        <ScrollView horizontal contentContainerStyle={styles.scroll}>
        


{ weather?.forecast?.forecastday?.map((item,index)=>{

let date = new Date(item.date);
let options = { weekday: "long" };
let dayName = date.toLocaleDateString('en-US',options);
dayName = dayName.split(','[0]);

  return(
    <View key={index} style={styles.card}>
            <Image
              source={require('../images/cloudly.png')}
              style={{height: W(20), width: W(20), resizeMode: 'contain'}}
            />
            <Text style={styles.wind}>{dayName}</Text>
            <Text style={styles.wind}>{item?.day?.avgtemp_c}&#176; </Text>
          </View>
  )

}  ) }

</ScrollView>

        
        {/* <ScrollView horizontal contentContainerStyle={styles.scroll}>
          <View style={styles.card}>
            <Image
              source={require('../images/cloudly.png')}
              style={{height: W(20), width: W(20), resizeMode: 'contain'}}
            />
            <Text style={styles.wind}>Monday</Text>
            <Text style={styles.wind}>13&#176; </Text>
          </View>

          <View style={styles.card}>
            <Image
              source={require('../images/cloudly.png')}
              style={{height: W(20), width: W(20), resizeMode: 'contain'}}
            />
            <Text style={styles.wind}>Monday</Text>
            <Text style={styles.wind}>13&#176; </Text>
          </View>

          <View style={styles.card}>
            <Image
              source={require('../images/cloudly.png')}
              style={{height: W(20), width: W(20), resizeMode: 'contain'}}
            />
            <Text style={styles.wind}>Monday</Text>
            <Text style={styles.wind}>13&#176; </Text>
          </View>

          <View style={styles.card}>
            <Image
              source={require('../images/cloudly.png')}
              style={{height: W(20), width: W(20), resizeMode: 'contain'}}
            />
            <Text style={styles.wind}>Monday</Text>
            <Text style={styles.wind}>13&#176; </Text>
          </View>
        </ScrollView> */}
      </View>


    </ImageBackground>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  backImage: {
    height: '100%',
    resizeMode: 'contain',
  },
  inputContainer: {
    marginHorizontal: W(8),
    marginVertical: W(8),
    borderRadius: W(10),
    backgroundColor: 'rgba(255,255,255,.9)',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: W(50),
    height:50,width:300
  },
  input: {
    color: '#000',
    marginLeft: W(6),
  },

  View: {
    backgroundColor: 'rgba(255,255,255,0.8)',
    marginHorizontal: W(8),
    borderRadius: W(4),
  },
  content: {
    zIndex: 2,
    // position:"absolute",
    paddingVertical: W(4),
    paddingHorizontal: W(6),
  },
  line: {
    backgroundColor: '#808080',
    marginTop: W(2),
    height: H(0.2),
  },
  div: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: W(2),
  },
  cityText: {
    fontSize: S(2),
    color: '#000',
  },
  image: {
    resizeMode: 'contain',
    height: W(36),
    width: W(36),
  },
  wind: {
    fontSize: 14,
    color: '#fff',
  },
  row: {
    marginTop: W(8),
    flexDirection: 'row',
    gap: W(6),
  },
  rowContent: {
    flexDirection: 'row',
    gap: W(2),
  },
  scroll: {
    paddingHorizontal: 15,
  },
  card: {
    height: H(20),
    width: W(30),
    borderRadius: W(6),
    backgroundColor: 'rgba(255,255,255,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: W(2),
    marginVertical: W(4),
  },
});
