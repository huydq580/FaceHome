import React, { Component } from 'react';
import {
    View,
    Text,
    ScrollView, AsyncStorage,
    TextInput, StyleSheet,
    TouchableOpacity,
    Image,
    FlatList,
    ActivityIndicator, Alert

} from 'react-native';
import AddMemberItem from "../../components/AddMemberItem";
import Dimensions from 'Dimensions';
import {callApiSearchDanCu} from "../../actions/actionsBQL/QLDanCuActions";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {MsgGroupID, URL_SOCKET} from "../../components/Api";
import ChatGroupBQL from "./ChatGroupBQL";
const DEVICE_WIDTH = Dimensions.get('window').width;

class AddMember extends Component {
    static navigationOptions = ({navigation}) => {
        const {params = {}} = navigation.state

        return {
            headerRight: <TouchableOpacity style={{marginRight: 10}}
                                           onPress={() => params.actionCreate()}>
                <Text style={{color: "#1565C0", fontWeight: '600'}}>Xong</Text>
            </TouchableOpacity>,
            title: "Thêm bạn bè",
            headerStyle: {backgroundColor: '#23b34c'},
            headerTitleStyle: {color: 'white'},
            headerTintColor: 'white',
        }
    }
    constructor(props) {
        super(props);


        this.state = {
            resultSearch: [],
            userGroup: [],
            isLoading: false,
            dataIdUser: [],
            dataCuDan:[],
            TenGroup:'',
        };

        this.timeout = 0;
        this.groupname = "";
        this.fromEdit = false;
        this.groupnameOld = "";


    }
    componentWillMount() {
        this.props.navigation.setParams({actionCreate: this.actionCreate});
    }
    actionCreate = () => {
        const { params } = this.props.navigation.state

        if (this.state.TenGroup === "") {
            Alert.alert("Thông báo", "Tên nhóm không được để trống");
            return;
        }

        if (this.state.userGroup.length < 2) {
            Alert.alert("Thông báo", "Nhóm phải có ít nhất 3 thành viên");
            return;
        }
        this.AddMember()
        // this.props.navigation.navigate("ChatGroup", { groupname: params.groupname, IdGroup: params.IdGroup})
        // Alert.alert("Thông báo","Tạo nhóm thành công");

    }
    AddMember = () => {
        const { InfoUser } = this.props;
        if (InfoUser.length <= 0) {
            return null;
        }
        fetch(URL_SOCKET + MsgGroupID, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            body: JSON.stringify({
                MsgGroupID: "",
                KDTID: InfoUser[0].KDTID,
                PartID: "",
                GroupMembers: JSON.stringify(this.state.dataIdUser),
                GroupName: this.state.TenGroup, //chưa push
                CreatedDate: "2017-11-10T00:00:00.000Z",
                DayFlag: 20171110,
                UserID: InfoUser[0].UserID,
                FullName: InfoUser[0].FullName,
                Avartar: null,
                Status: 1,
                LastMessage: null,
                // IsCreate: isCheck,
            })
        }).then((response) => {
            return response.json();
        }).then(dataRes => {
            this.props.navigation.navigate("ChatGroupBQL", { title : this.state.TenGroup, MsgGroupID: dataRes.ObjectResult[0].MsgGroupID
            })
        }).catch(e => {
            console.log('exception')
        })
    }


    shouldComponentUpdate() {
        return true;
    }

    renderSeparator = () => {
        return (
            <View
                style={{
                    height: 1,
                    width: "86%",
                    backgroundColor: "#CED0CE",
                    marginLeft: DEVICE_WIDTH / 5
                }}
            />
        );
    };

    debounce = (func, wait) => {
        var context = this,
            args = arguments;
        var executeFunction = function() {
            func.apply(context, args);
            this.timeout = 0;
        };

        if (this.timeout) {
            clearTimeout(this.timeout);
        }
        this.timeout = setTimeout(executeFunction, wait);
    };

    callApi = textSearch => {
        this.setState({ isLoading: true });
        if (textSearch === "") {
            this.setState({ dataCuDan: [], isLoading: false });
            return;
        }

        console.log("text", textSearch);
        const { InfoUser } = this.props;
        if (InfoUser.length <= 0) {
            return null;
        }

        const { callApiSearchDanCu } = this.props;
        callApiSearchDanCu(InfoUser[0].KDTID, textSearch).then(dataSearchDanCu => {
            dataSearchDanCu = JSON.parse(dataSearchDanCu)
            dataSearchDanCu = dataSearchDanCu.Value
            this.dataSearchDanCu = dataSearchDanCu
            this.setState({
                dataCuDan: dataSearchDanCu
            })
            console.log('dataSearchDanCu', dataSearchDanCu)
            Array.prototype.diff = function(a) {
                return this.filter(function(i) {return a.map(function(e) { return JSON.stringify(e); }).indexOf(JSON.stringify(i)) < 0;});
            };
            var fillter = dataSearchDanCu;
            if(this.state.userGroup.length > 0)
                fillter = dataSearchDanCu.diff(this.state.userGroup);

            console.log("fillter",fillter);
            this.setState({ dataCuDan: fillter });
        })
    };
    clickItemSearch = (userSelect,index)=>{
        console.log("user select",userSelect);
        let addID = this.state.dataIdUser;
        addID.push({
            UserID: userSelect.UserID,
            FullName: userSelect.FullName,
            Avartar: userSelect.Avartar,
            LinkProfile: "",
            LinkMsg: "",
            IntUserID: userSelect.IntUserID,

        })
        this.setState({
            dataIdUser: addID
        })
        console.log("user index",index);
        var addNew = [...this.state.userGroup,userSelect];
        this.setState({userGroup:addNew});
        // console.log("this.state.resultSearch.length",this.state.resultSearch.length);
        if(this.state.dataCuDan.length == 1){
            this.setState({dataCuDan:[]});
        }else{
            this.state.dataCuDan.splice(index,1);
            this.setState({dataCuDan:this.state.dataCuDan});
        }


    }


    render (){
        const {navigation} = this.props;
        // console.log('this.state.dataCuDa', this.state.dataCuDan)
        return (
            <ScrollView style={{ flex: 1, margin: 10 }}>
                <TextInput
                    style={{
                        marginTop: 10,
                        borderWidth: 1,
                        borderRadius: 4,
                        borderColor: "#000",
                        shadowColor: "#000",
                        paddingLeft: 5,
                        marginBottom: 10,
                        minHeight: 50

                    }}
                    placeholder="Nhập tên nhóm"
                    underlineColorAndroid="transparent"
                    onChangeText={(TenGroup) => this.setState({TenGroup})}
                    // defaultValue={this.groupnameOld}
                />

                <TextInput
                    style={{
                        borderWidth: 1,
                        borderRadius: 4,
                        borderColor: "#000",
                        shadowColor: "#000",
                        paddingLeft: 5,
                        marginBottom: 10,
                        minHeight:50
                    }}
                    onChangeText={(text)=>this.debounce(function(e){

                        this.callApi(text);
                    }.bind(this), 1000)}
                    underlineColorAndroid="transparent"
                    placeholder="Thêm thành viên"
                />
                <FlatList
                    showsHorizontalScrollIndicator={false}
                    showVerticalScrollIndicator={false}
                    contentContainerStyle={{margin:4}}
                    data={this.state.userGroup}
                    renderItem={({item}) => (
                        <View
                            style={{
                                borderRadius: 5,
                                padding:5,
                                margin:5,
                                borderWidth:1,
                                borderColor: "green",
                                shadowColor: "green",
                                backgroundColor:'green',
                                shadowOffset: { width: 0, height: 2 },
                                shadowOpacity: 0.8,
                                flexDirection:'row',
                                justifyContent:"center",
                                alignItems:'center',

                            }}
                        >
                            <Text style={{color:'white'}}>{item.FullName}</Text>
                            <View style={{flex:1}}/>
                            <TouchableOpacity
                                style={{alignSelf:'flex-end',justifyContent:"center",
                                    alignItems:'center'}}
                                onPress={()=>{
                                    this.state.userGroup.splice(item.index,1);
                                    this.setState({userGroup: this.state.userGroup});
                                }}

                            >
                                <Image
                                    source={require("../../images/close.png")}
                                    style={{ width: 20, height: 20,alignSelf:'center' }}
                                />
                            </TouchableOpacity>
                        </View>
                    )
                    }
                    numColumns={2}
                    keyExtractor={(item, index) => index.toString()}

                />
                <View style={{flex:1}}>
                    <FlatList
                        data={this.state.dataCuDan}
                        renderItem={(item) => {


                            return (
                                <AddMemberItem
                                    dataItem={item}
                                    navigation={navigation}
                                    fromSearch={true}
                                    sendDataClick={this.clickItemSearch}
                                    index={item.index} />
                            )
                        }}
                        keyExtractor={(item, index) => index.toString()}
                        ItemSeparatorComponent={this.renderSeparator}
                    />
                    {/*{this.state.isLoading ? (*/}
                        {/*<View*/}
                            {/*style={{*/}
                                {/*top: 100,*/}
                                {/*bottom: -10,*/}
                                {/*left: -10,*/}
                                {/*right: -10,*/}
                                {/*justifyContent: "center",*/}
                                {/*alignItems: "center",*/}
                                {/*position: "absolute",*/}
                                {/*zIndex: 1,*/}
                                {/*backgroundColor: 'rgba(52, 52, 52, 0.3)'*/}
                            {/*}}*/}
                        {/*>*/}
                            {/*<ActivityIndicator size="large" color="green" />*/}
                        {/*</View>*/}
                    {/*) : null}*/}

                </View>
            </ScrollView>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        InfoUser: state.GetProfileReducers,
        infoCuDan: state.QLDanCuReducers
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        callApiSearchDanCu: bindActionCreators(callApiSearchDanCu, dispatch),
        // callApiMsgGroupID: bindActionCreators(callApiMsgGroupID, dispatch),
    }
};

AddMember = connect(mapStateToProps, mapDispatchToProps)(AddMember);
export default AddMember;

const myStyle = StyleSheet.create({
    image_circle: {
        height: DEVICE_WIDTH / 6,
        width: DEVICE_WIDTH / 6,
        borderRadius: DEVICE_WIDTH / 12,
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 10,
        marginTop: 10
    }
});
