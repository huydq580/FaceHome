import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Button,
    Image
} from 'react-native';
import stylesContainer from "../../components/style";
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import Dimensions from 'Dimensions';

class BanDangTin extends Component {
    constructor(props) {
        super(props)
        this.state = {
            types1: [{label: 'param1', value: 0}, {label: 'param2', value: 1}],
            value1: 0,
            value1Index: 0,
            value1_1: 0,
            value1_1Index: 0,
            types2: [{label: 'param1', value: 0}, {label: 'param2', value: 1}, {label: 'param3', value: 2},],
            value2: 0,
            value2Index: 0,
            types3: [{label: 'param1', value: 0}, {label: 'param2', value: 1}, {label: 'param3', value: 2},],
            value3: 0,
            value3Index: 0,
        }
    }
    TiepTucRaoVat =()=> {
        const { params } = this.props.navigation.state
        this.props.navigation.navigate('KhuVucRaoVat',
            {
                danhMuc:params.danhMuc,
                name: params.name
            })
    }
    render (){
        return (
            <View style={[stylesContainer.container, {justifyContent: 'space-between'}]}>
                {/*<View style = {{ flexDirection:'column'}}>*/}
                    {/*<View style = {{marginHorizontal:10, marginTop: 10, flexDirection:'row',*/}
                        {/*height:  DEVICE_HEIGHT/12, borderWidth:1, borderColor:'#BDBDBD', alignItems:'center'}}>*/}
                        {/*<Image*/}
                            {/*source={require('../../images/button.png')}*/}
                            {/*style={styles.image_circle}*/}
                            {/*resizeMode="cover">*/}
                        {/*</Image>*/}
                        {/*<Text stytle = {{fontSize:16, marginLeft: 30}}>Cần bán</Text>*/}

                    {/*</View>*/}
                    {/*<View style = {{ marginHorizontal:10, flexDirection:'row',*/}
                        {/*height:  DEVICE_HEIGHT/12, borderWidth:1, borderColor:'#BDBDBD', alignItems:'center'}}>*/}
                        {/*<Image*/}
                            {/*source={require('../../images/button.png')}*/}
                            {/*style={styles.image_circle}*/}
                            {/*resizeMode="cover">*/}
                        {/*</Image>*/}
                        {/*<Text  stytle = {{fontSize:16, marginLeft: 30}}>Cần Mua</Text>*/}

                    {/*</View>*/}
                {/*</View>*/}

                <RadioForm formHorizontal={true} animation={true} >
                    {this.state.types3.map((obj, i) => {
                        var onPress = (value, index) => {
                            this.setState({
                                value3: value,
                                value3Index: index
                            })
                        }
                        return (
                            <RadioButton labelHorizontal={true} key={i} >
                                {/*  You can set RadioButtonLabel before RadioButtonInput */}
                                <RadioButtonInput
                                    obj={obj}
                                    index={i}
                                    isSelected={this.state.value3Index === i}
                                    onPress={onPress}
                                    buttonInnerColor={'#f39c12'}
                                    buttonOuterColor={this.state.value3Index === i ? '#2196f3' : '#000'}
                                    buttonSize={30}
                                    buttonStyle={{}}
                                    buttonWrapStyle={{marginLeft: 10}}
                                />
                                <RadioButtonLabel
                                    obj={obj}
                                    index={i}
                                    onPress={onPress}
                                    labelStyle={{fontWeight: 'bold', color: '#2ecc71'}}
                                    labelWrapStyle={{}}
                                />
                            </RadioButton>
                        )
                    })}
                </RadioForm>
                <Text>selected: {this.state.types1[this.state.value1Index].label}</Text>

                {/*<Button*/}
                    {/*title="Learn More"*/}
                    {/*style={{fontSize: 20, borderColor: '#2196f3', borderWidth: 2}}*/}
                    {/*onPress={() => this.refs.radioForm.updateIsActiveIndex(0)}/>*/}
                <View style = {styles.TiepTucView}>
                    <TouchableOpacity onPress = {this.TiepTucRaoVat}>
                        <Text style = {styles.TiepTucText}>TIẾP TỤC</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}
export default BanDangTin
const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;
const styles = StyleSheet.create({
    TiepTucView: {
        height: DEVICE_HEIGHT/11,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#FF9800'

    },
    TiepTucText: {
        fontWeight:'bold',
        color: 'white'
    },
    image_circle: {
        height: 30,
        width: 30,
        marginLeft: 15,
        // marginTop: 10

    },
})