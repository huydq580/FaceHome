import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    TextInput,
    TouchableOpacity
} from 'react-native';
import stylesContainer from "../../components/style";
import PickerImage from "../../components/PickerImage"
import ImageResizer from 'react-native-image-resizer';

export default class SoanTin extends Component {
    static navigationOptions = ({navigation}) => {
        const {state} = navigation;
        return {

            headerRight: <TouchableOpacity style = {{marginRight:10}}>
                <Text style = {{color: "#1565C0"}}>Chia sẻ</Text>
            </TouchableOpacity>
        }


    }
    constructor(props){
        super (props)
        this.state = {
            Status:'',
            avatarSource: null,
            dataImage: null,
            resizedImageUri: '',
        }
    }
    show(){
        PickerImage((source, data) => this.setState({avatarSource: source, dataImage: data}));
    }
    // upload(){
    //     uploadFile([
    //         { name : 'info', data : 'KhoaPham'},
    //         { name: 'avatar', filename: 'avatar.png', data: this.state.data }
    //     ])
    //         .then(res => console.log(res))
    //         .catch(err => console.log(err))
    // }
    upload (){
        // console.log('dataImage', this.state.dataImage)
    }
    resize() {
        ImageResizer.createResizedImage(this.state.dataImage.uri, 800, 600, 'JPEG', 80)
            .then(({uri}) => {
                this.setState({
                    resizedImageUri: uri,
                });
            }).catch((err) => {
            console.log(err);
            return Alert.alert('Unable to resize the photo',
                'Check the console for full the error message');
        });
    }
    LogResize(){
        console.log('resize', this.state.resizedImageUri)
    }
    render () {
        let img = this.state.avatarSource == null? null:
            <Image
                source={this.state.avatarSource}
                style={{height: 200, width: 200}}
            />
        return (
            <View style = {stylesContainer.container}>
                <View>
                    <View style  = {{flexDirection:'row', marginTop: 15}}>
                        <Image source={require('../../images/chieu-cao-va-tieu-su-cua-phuong-ly-12-e1482887471940.jpg')}
                               style = {{ resizeMode: 'cover',height: 40, width:30, marginLeft:10}}>
                        </Image>
                        <View style = {{marginLeft: 10}}>
                            <Text style = {{color: 'black'}}>Nguyễn Văn A</Text>
                            <Text>Mọi người</Text>
                        </View>
                    </View>
                    <View style = {{marginHorizontal: 10, marginTop:10}}>
                        <TextInput placeholder = 'Soạn tin mới'
                                   underlineColorAndroid="transparent"
                                   onChangeText ={(Status)=> this.setState({Status})}
                                   placeholderTextSize = "20"/>
                    </View>
                </View>
                <TouchableOpacity onPress={this.show.bind(this)}>
                    <Text  style = {{fontSize: 30}}>Show Image Picker</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.upload.bind(this)}>
                    <Text style = {{fontSize: 30}}>Upload</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.resize.bind(this)}>
                    <Text style = {{fontSize: 30}}>resize</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.LogResize.bind(this)}>
                    <Text style = {{fontSize: 30}}>resizeLog</Text>
                </TouchableOpacity>
                <Text>hihi</Text>
                {img}
            </View>
        );
    }

}
