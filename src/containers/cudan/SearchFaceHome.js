import React, { Component } from 'react';
import {
    View,
    Text,
    ScrollView,
    StyleSheet
} from 'react-native';
import ScrollableTabView, { DefaultTabBar, } from 'react-native-scrollable-tab-view';
import Icon from 'react-native-vector-icons/Ionicons';

class SearchFaceHome extends Component {
    render () {
        return (
            <ScrollableTabView
                style={styles.container}
                renderTabBar={() => <DefaultTabBar backgroundColor='rgba(255, 255, 255, 0.7)'/>}
                tabBarPosition='overlayTop'
            >
                <ScrollView tabLabel='Bài viết'>
                    <Icon name='logo-apple' color='black' size={300} style={styles.icon}/>
                    <Icon name='ios-phone-portrait' color='black' size={300} style={styles.icon}/>
                    <Icon name='logo-apple' color='#DBDDDE' size={300} style={styles.icon}/>
                    <Icon name='ios-phone-portrait' color='#DBDDDE' size={300} style={styles.icon}/>
                </ScrollView>
                <ScrollView tabLabel='Đô thị'>
                    <Icon name='logo-android' color='#A4C639' size={300} style={styles.icon}/>
                    <Icon name='logo-android' color='black' size={300} style={styles.icon}/>
                    <Icon name='logo-android' color='brown' size={300} style={styles.icon}/>
                </ScrollView>
                <ScrollView tabLabel='Dân cư'>
                    <Icon name='logo-apple' color='black' size={300} style={styles.icon}/>
                    <Icon name='ios-phone-portrait' color='black' size={300} style={styles.icon}/>
                    <Icon name='logo-apple' color='#DBDDDE' size={300} style={styles.icon}/>
                    <Icon name='ios-phone-portrait' color='#DBDDDE' size={300} style={styles.icon}/>
                </ScrollView>
                <ScrollView tabLabel='Dịch vụ'>
                    <Icon name='logo-android' color='#A4C639' size={300} style={styles.icon}/>
                    <Icon name='logo-android' color='black' size={300} style={styles.icon}/>
                    <Icon name='logo-android' color='brown' size={300} style={styles.icon}/>
                </ScrollView>
                <ScrollView tabLabel='Rao vặt'>
                    <Icon name='logo-android' color='#A4C639' size={300} style={styles.icon}/>
                    <Icon name='logo-android' color='black' size={300} style={styles.icon}/>
                    <Icon name='logo-android' color='brown' size={300} style={styles.icon}/>
                </ScrollView>
            </ScrollableTabView>
        )
    }
}
export default SearchFaceHome

    const styles = StyleSheet.create({
    container: {
        marginTop: 30,
    },
    icon: {
        width: 300,
        height: 300,
        alignSelf: 'center',
    },
});