import React, {Component} from 'react';
import {
    View,
    Text,
    TextInput, Alert, AsyncStorage,
    TouchableOpacity

} from 'react-native';
import stylesContainer from "../../components/style";

class CreateGroup extends Component {

    static navigationOptions = ({navigation}) => {
        const {params = {}} = navigation.state

        return {
            headerRight: <TouchableOpacity style={{marginRight: 10}}
                                           onPress={() => params.actionCreate()}>
                <Text style={{color: "#1565C0", fontWeight: '600'}}>Xong</Text>
            </TouchableOpacity>,
            title: params.title,
            headerStyle: {backgroundColor: '#23b34c'},
            headerTitleStyle: {color: 'white'},
            headerTintColor: 'white',
        }
    }
    constructor(props){
        super(props)
        this.state = {
            TenGroup: '',
        }
    }

    componentWillMount() {
        this.props.navigation.setParams({actionCreate: this.actionCreate});
    }
    actionCreate = () => {
        if (this.fromEdit) {
            Alert.alert("Thông báo", "Chỉnh sửa click");
            return;
        }

        if (this.state.TenGroup === "") {
            Alert.alert("Thông báo", "Tên nhóm không được để trống");
            return;
        }
        // this.CreateGroup()
        this.props.navigation.navigate("AddMember")


    }

    render() {
        return (
            <View style={stylesContainer.container}>
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
                    defaultValue={this.groupnameOld}
                />


            </View>
        )
    }
}

export default CreateGroup