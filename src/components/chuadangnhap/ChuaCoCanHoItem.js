import React, { Component } from 'react';
import {
    View,
    Text,

} from 'react-native'
import Modal from 'react-native-modalbox';
import ShowModal from "../modal/ShowModal";

import Dimensions from 'Dimensions';

const DEVICE_WIDTH = Dimensions.get('window').width;
export default class ChuaCoCanHoItem extends Component {
    constructor (props) {
        super (props)
        this.state = {
            isShow: false,
        }
        this.handlerModal = this.handlerModal.bind(this)
    }

    handlerModal() {
        this.setState({
            isShow: false
        }, () => console.log('isshow', this.state.isShow))

    }
    showModal() {
        const {navigation} = this.props
        // const isShow = this.state.isShow
        return (
            <Modal style={{
                height: DEVICE_WIDTH - 120,
                width: DEVICE_WIDTH - 50,
                borderRadius: 10,
                backgroundColor: '#E1F5FE'


            }}
                   swipeArea={20}
                   position={"center"} ref={"modal"} isDisabled={false}
            >
                <ShowModal
                    navigation={navigation}
                    handlerModal={this.handlerModal}/>
            </Modal>
        )
    }
    componentDidMount () {
        setTimeout(() => {
            this.setState({
                isShow: true
            })
            this.refs.modal.open()
        }, 2000)
    }

    render (){
        return (
            <View style = {{flex:1}}>
                {
                    this.state.isShow == true ? this.showModal() : null
                }
            </View>
        )
    }
}