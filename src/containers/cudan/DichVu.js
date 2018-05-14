import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    ScrollView,
    TouchableOpacity,
    WebView,
    ActivityIndicator
} from 'react-native';


import Modal from 'react-native-modalbox';
import Dimensions from 'Dimensions';
import ShowModal from "../../components/modal/ShowModal";
const DEVICE_WIDTH = Dimensions.get('window').width;

export default class DichVu extends Component {



    constructor(props) {
        super(props);

        this.state = {
            isDisabled:false,
            isLoading:false,
            isShow: false,
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        return true;
    }
    componentDidMount(){
        setTimeout(()=> {
            this.setState({
                isShow: true
            })
            this.refs.modal.open()
        }, 3000)

    }
    showModal(){
        return (
            <Modal style={{
                height: DEVICE_WIDTH-120,
                width: DEVICE_WIDTH-50,
                borderRadius:10,
                backgroundColor: '#E1F5FE'


            }}
                   swipeArea={20}
                   position={"center"} ref = {"modal"} isDisabled={false}
            >
                <ShowModal/>
            </Modal>
        )
    }


    render() {

        return (
            <View style={{flex:1}}>
                {
                    this.state.isShow ==true ? this.showModal() : null
                }
            </View>


        )
    }
};
