import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Button,
    Image,
    FlatList
} from 'react-native';
import stylesContainer from "../../components/style";
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from '../../components/ButtonRadio/SimpleRadioButton';
import Dimensions from 'Dimensions';

class BanDangTin extends Component {
    constructor(props) {
        super(props)
        this.state = {
            types1: [{label: 'Cần bán', value: 1}, {label: 'Cần mua', value: 2}, {label: 'Cho thuê', value: 3}, {label: 'Khác', value: 4}],
            value1: 1,
            value1Index: 0,
        }
    }

    TiepTucRaoVat =()=> {
        const { params } = this.props.navigation.state
        this.props.navigation.navigate("BanLa",
            {
                danhMuc:params.danhMuc,
                name: params.name,
                BanDangTin: this.state.value1
            })
    }
    render (){
        return (
            <View style={[stylesContainer.container, {justifyContent: 'space-between'}]}>
                <View style={styles.component}>
                    <RadioForm
                        ref="radioForm"
                        radio_props={this.state.types1}
                        initial={0}
                        formHorizontal={false}
                        labelHorizontal={true}
                        buttonColor={'#2196f3'}
                        labelColor={'#000'}
                        animation={true}
                        onPress={(value, index) => {
                            this.setState({
                                value1:value,
                                value1Index:index
                            })
                        }}
                    />
                </View>

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
    component: {
        alignItems: 'center',
        marginBottom: 50,
    },

})