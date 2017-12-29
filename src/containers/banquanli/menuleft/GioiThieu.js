import React, {Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
} from 'react-native';
import MapView from 'react-native-maps';
const DELTA = 0.005;


export default class GioiThieu extends Component{
    constructor(props) {
        super(props)
        this.state = {
            region: {
                latitude: 21.052505,
                longitude: 105.7803091,
                latitudeDelta: DELTA,
                longitudeDelta: DELTA,
            },
            listRegion: [
                {
                    title: 'Bạn',
                    region: {
                        latitude: 21.052403,
                        longitude: 105.779456,
                        latitudeDelta: DELTA,
                        longitudeDelta: DELTA,
                    }
                },
                {
                    title: 'Bạn',
                    region: {
                        latitude: 21.051924,
                        longitude: 105.779346,
                        latitudeDelta: DELTA,
                        longitudeDelta: DELTA,
                    }
                },
                {
                    title: 'Bạn',
                    region: {
                        latitude: 21.052615,
                        longitude: 105.782093,
                        latitudeDelta: DELTA,
                        longitudeDelta: DELTA,
                    }
                }
            ]

        }

    }

    watchID: number = null

    componentWillMount() {
        navigator.geolocation.getCurrentPosition((position) => {
                var lat = parseFloat(position.coords.latitude);
                var long = parseFloat(position.coords.longitude);

                var initalRegion = {
                    latitude: lat,
                    longitude: long,
                    latitudeDelta: DELTA,
                    longitudeDelta: DELTA,
                }
                this.setState({region: initalRegion})
            },
            (error) => console.log("error"),
            {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000})

        this.watchID = navigator.geolocation.watchPosition((position) => {
            var lat = parseFloat(position.coords.latitude);
            var long = parseFloat(position.coords.longitude);

            var lastRegion = {
                latitude: lat,
                longitude: long,
                latitudeDelta: DELTA,
                longitudeDelta: DELTA,
            }
            this.setState({region: lastRegion})
        })
    }

    componentWillUnmount() {
        navigator.geolocation.clearWatch(this.watchID)
    }


    render() {

        return (
            <View style={styles.container}>
                <MapView style={{flex: 1}}
                         region={this.state.region}>
                    <MapView.Marker onPress={() => {
                    }}
                                    title="Vị trí của tôi"
                                    coordinate={this.state.region}>
                    </MapView.Marker>

                    {this.state.listRegion.map(marker => (
                        <MapView.Marker pinColor='#0091ea'
                                        title={marker.title}
                                        key={marker.title}
                                        coordinate={marker.region}/>
                    ))}

                    <MapView.Circle center={this.state.region}
                                    radius={150}
                                    strokeWidth={1.5}
                                    strokeColor={"#000, rgba(52, 52, 52, 0.2)"}
                                    fillColor={"#000, rgba(52, 52, 52, 0.2)"}
                    />

                </MapView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});