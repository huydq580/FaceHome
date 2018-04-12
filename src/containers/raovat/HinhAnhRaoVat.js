import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image
} from 'react-native';
import stylesContainer from "../../components/style";
import Dimensions from 'Dimensions';
import PickerImage from '../../components/PickerImage'
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {callApiUploadImage} from "../../actions/SoanTinActions";
import {LINKIMG} from "../../components/Api";

class HinhAnhRaoVat extends Component {
    constructor(props) {
        super(props)
        var i1 = require('../../images/camera.png');
        this.state = {
            image1: i1,
            dataImage1: null,
            image2: i1,
            dataImage2: null,
            image3: i1,
            dataImage3: null,
            linkImg: '',

        }
    }

    TiepTucRaoVat = () => {
        const {params} = this.props.navigation.state
        console.log('params', params)
        this.props.navigation.navigate('GiaRaoVat',
            {
                danhMuc: params.danhMuc,
                name: params.name,
                tenVung: params.tenVung,
                maVung: params.maVung,
                Tinh: params.Tinh,
                BanDangTin: params.BanDangTin,
                BanLa: params.BanLa,
                linkImg: this.state.linkImg

            })
    }
    showPicker = (type) => {
        //console.log("click button type",type);
        PickerImage((source, data) => {
            if (type == 1) {
                this.setState({image1: source, dataImage1: data}, () => {
                    // console.log('image', this.state.dataImage1)
                    this.upload()
                })
            }
            else if (type == 2) {
                this.setState({image2: source, dataImage2: data})
            } else {
                this.setState({image3: source, dataImage3: data})
            }
        }, true)

    }

    upload() {
        const {InfoUser, callApiUploadImage} = this.props;
        if (InfoUser.length <= 0) {
            return null
        }
        callApiUploadImage(InfoUser[0].UserID, this.state.dataImage1).then(dataImg => {
            dataImg = JSON.parse(dataImg)
            dataImg = dataImg.Value
            // console.log('dataImage1', dataImg)
            this.setState({
                linkImg: LINKIMG + dataImg
            })
        })
    }

    render() {
        return (
            <View style={[stylesContainer.container, {justifyContent: 'space-between'}]}>
                <View>
                    <Text style={{marginTop: 10, marginLeft: 10, fontSize: 16, fontWeight: '600'}}>Thêm ảnh mô tả</Text>
                    <View style={{marginTop: 10, flexDirection: 'row', justifyContent: 'center'}}>
                        <TouchableOpacity
                            style={{
                                marginLeft: 10,
                                borderColor: 'grey', borderRadius: 4, borderWidth: 2,
                            }}

                            onPress={() => this.showPicker(1)}
                        >
                            <Image
                                source={this.state.image1}
                                ref="image1"
                                style={styles.ImagePick}

                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{
                                marginLeft: 10,
                                borderColor: 'grey', borderRadius: 4, borderWidth: 2,
                            }}
                            onPress={() => this.showPicker(2)}
                        >
                            <Image
                                source={this.state.image2}
                                ref="image2"
                                style={styles.ImagePick}

                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{
                                marginLeft: 10, marginRight: 10,
                                borderColor: 'grey', borderRadius: 4, borderWidth: 2,
                            }}
                            onPress={() => this.showPicker(3)}

                        >
                            <Image
                                source={this.state.image3}
                                ref={"image3"}
                                style={styles.ImagePick}

                            />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.TiepTucView}>
                    <TouchableOpacity onPress={this.TiepTucRaoVat}>
                        <Text style={styles.TiepTucText}>TIẾP TỤC</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        InfoUser: state.GetProfileReducers
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        callApiUploadImage: bindActionCreators(callApiUploadImage, dispatch),
    }
};

HinhAnhRaoVat = connect(mapStateToProps, mapDispatchToProps)(HinhAnhRaoVat);
export default HinhAnhRaoVat
const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;
const styles = StyleSheet.create({
    TiepTucView: {
        height: DEVICE_HEIGHT / 11,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FF9800'

    },
    TiepTucText: {
        fontWeight: 'bold',
        color: 'white'
    },
    ImagePick: {
        width: (DEVICE_WIDTH - 100) / 3,
        height: (DEVICE_WIDTH - 100) / 3
    }
})