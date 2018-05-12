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
const DEVICE_WIDTH = Dimensions.get('window').width;

export default class DichVu extends Component {



    constructor(props) {
        super(props);

        this.state = {
            isDisabled:false,
            isLoading:false
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        return true;
    }
    componentDidMount(){

    }

    childCloseModal = ()=>{
        this.refs.modal.close();
        this.setState({isLoading:true});
    }

    render() {

        return (
            <View style={{flex:1}}>



                <Modal  style={{
                    height: DEVICE_WIDTH-120,
                    width: DEVICE_WIDTH-50,
                    borderRadius:10,
                    backgroundColor: '#E1F5FE'


                }}
                        swipeArea={20}
                        position={"center"} ref={"modal"} isDisabled={false}
                >
                    <View style = {{flex:1, marginHorizontal: 10, borderRadius:5}}>
                        <Text style = {{marginTop: 20, color: "black"}}>Chào mừng bạn đến với Cộng đồng chung cư Facehome.</Text>
                        <Text style = {{marginTop: 5, color: 'black'}}>Bạn chưa sở hữu căn hộ nào, để sử dụng đầy đủ các tính năng của sản phẩm và kết nối với cộng đồng khu đô thị bạn đang sống vui lòng thêm căn hộ của bạn. Hoặc bạn có thể thêm căn hộ sau bằng cách vào mục tài khoản cá nhân và thêm căn hộ. </Text>
                        <View style = {{flexDirection:'row', marginTop: 15, justifyContent: 'center'}}>
                            <View style = {{backgroundColor:'#FFA726', borderWidth:1, height: 30, width: 90, borderRadius: 4, justifyContent:'center', alignItems:'center'}}>
                                <Text>Thêm ngay</Text>
                            </View>
                            <View style = {{backgroundColor:'#FFA726', marginLeft: 20, borderWidth:1, height: 30, width: 90, borderRadius: 4, justifyContent:'center', alignItems:'center'}}>
                                <Text>Để sau</Text>
                            </View>
                        </View>
                    </View>
                </Modal>
                <TouchableOpacity onPress={()=>this.refs.modal.open()}>
                    <Text>
                        Show modal
                    </Text>
                </TouchableOpacity>


                {/*<View style ={{flex:1}}>*/}
                    {/*<Image style={{height: Dimention.DEVICE_WIDTH*(450/800), width: "100%", alignSelf: 'stretch',}}*/}
                           {/*resizeMode="cover"*/}
                           {/*source={{uri: item.imageUrl}}/>*/}

                    {/*<View style={{*/}
                        {/*flexDirection: 'row',*/}
                        {/*padding: 10,*/}
                        {/*alignItems: 'center',*/}
                        {/*justifyContent: 'center'*/}
                    {/*}}>*/}
                        {/*<Text style={{*/}
                            {/*textAlign: 'left',*/}
                            {/*fontWeight: 'bold',*/}
                            {/*fontSize: 20,*/}
                            {/*color: 'black'*/}
                        {/*}}> {item.serviceName}</Text>*/}
                        {/*<View style={{flex: 1, alignItems: 'flex-end', justifyContent: 'flex-end'}}>*/}
                            {/*<TouchableOpacity*/}
                                {/*onPress={()=>this.refs.modal.open()}*/}
                                {/*style={{borderRadius: 5,*/}
                                    {/*borderWidth: 0.5,*/}
                                    {/*borderColor: '#fc9b03',*/}
                                    {/*backgroundColor: '#fc9b03',}}*/}

                            {/*>*/}
                                {/*<Text style={{*/}
                                    {/*textAlign: 'center',*/}

                                    {/*color: '#ffffff',*/}
                                    {/*padding: 10,*/}

                                {/*}}>Đặt lịch ngay</Text>*/}
                            {/*</TouchableOpacity>*/}
                        {/*</View>*/}

                    {/*</View>*/}

                    {/*<WebView*/}
                        {/*source={{ html: item.content,baseUrl:'' }}*/}
                        {/*style = {{flex:1}}*/}
                    {/*/>*/}


                {/*</View>*/}

                {/*{this.state.isLoading?*/}
                    {/*<View style={{top:-10,bottom:-10,left:-10,right:-10, justifyContent: 'center', alignItems: 'center',position:'absolute',zIndex:1,backgroundColor: 'rgba(52, 52, 52, 0.3)'}}>*/}
                        {/*<ActivityIndicator size="large" color="green"/>*/}
                    {/*</View>:null*/}
                {/*}*/}



            </View>


        )
    }
};
