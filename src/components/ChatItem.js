import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image
} from 'react-native';
import Dimensions from 'Dimensions';
const DEVICE_WIDTH = Dimensions.get('window').width;

export default class ChatItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            a:'',
        }

    }


    // shouldComponentUpdate(nextProps, nextState) {
    //     if (JSON.stringify(nextProps.dataItem) === JSON.stringify(this.props.dataItem)) {
    //         return false;
    //     }
    //
    //     else
    //         return true;
    // }

    renderMsgForUser = () => {
        // console.log('myname', this.props.myName)
        // console.log('dataItem', this.props.dataItem.UserID)
        // console.log('data nhan ve', this.props.dataItem)
        if (this.props.myName == this.props.dataItem.UserID) {
            return (
                <View style={{flex: 1, flexDirection: 'row', marginTop: 10}}>

                    <Image style={myStyle.image_circle}

                           source={{
                               uri: 'https://znews-photo-td.zadn.vn/w820/Uploaded/kcwvouvs/2017_04_18/15624155_1264609093595675_8005514290339512320_n.jpg'
                           }}
                           resizeMode="cover"
                    >
                    </Image>
                    <View>
                        <View style={{marginRight: DEVICE_WIDTH / 3}}>
                            <Text style={{
                                borderRadius: 10,
                                backgroundColor: '#FAFAFA',
                                justifyContent: 'flex-start',
                                alignSelf: 'flex-start',
                                paddingLeft: 10,
                                paddingRight: 10,
                                paddingTop: 10,
                                paddingBottom: 10
                            }}>{this.props.dataItem.Content}</Text>

                        </View>
                        {/*<Text style={{flex: 1, justifyContent: 'flex-start'}}>{this.props.dataItem.createdAt}</Text>*/}
                    </View>

                </View>



            )
        }
        else {
            return (
                <View style={{
                    flex: 1,
                    marginLeft: DEVICE_WIDTH / 3,
                    // minHeight: 50,
                    justifyContent: 'flex-end',
                    marginTop: 10
                }}>

                    <Text style={{
                        borderRadius: 10,
                        alignSelf: 'flex-end',
                        backgroundColor: '#64B5F6',
                        justifyContent: 'flex-end',
                        paddingLeft: 10,
                        paddingRight: 10,
                        paddingTop: 10,
                        paddingBottom: 10,
                        marginRight: 10
                    }}>{this.props.dataItem.Content}</Text>
                </View>

            )
        }
    };


    render() {
        return (
            <View style={{flex: 1}}>
                {this.renderMsgForUser()}
            </View>
        )

    }


}
const myStyle = StyleSheet.create({
        image_circle: {
            height: DEVICE_WIDTH / 8,
            width: DEVICE_WIDTH / 8,
            borderRadius: DEVICE_WIDTH / 16,
            marginLeft: 10,
            marginRight: 10,

        }
    })