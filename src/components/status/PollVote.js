import React, { Component } from 'react';
import {
    View,
    Text, Alert,

} from 'react-native';
import CheckBox from 'react-native-check-box'
import {URL, Vote} from "../Api";
import {callApiSearchCmt} from "../../actions/SearchCmtActions";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";

class PollVote extends Component {
    constructor(props){
        super(props)
        this.countCheck = this.props.dataItem.item.TotalVote;
        this.state = {
            countCheck: this.countCheck
        }
    }
    youChecked = (PostID, PollID) => {
        const {InfoUser} = this.props;
        if (InfoUser.length <= 0) {
            return null
        }
        fetch(URL + Vote, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                PostID: PostID,
                PollID: PollID,
                IntUser: InfoUser[0].IntUserID,
                IsLike: 1,
                isLog: 0,
                lang_name: "vi_VN"


            })
        }).then(response => {
            return response.json()
        }).then(data => {
            console.log('data', data)
            if (data.ErrorCode === "00") {
                let currentCheck = this.state.countCheck;
                currentCheck++;

                this.setState({countCheck: currentCheck});
            }
            else {
                Alert.alert("Thông báo", "có lỗi sảy ra");
            }
        }).catch(e => {
            console.log("exception", e);
            Alert.alert("Thông báo", "Có lỗi khi like");
        });
    }
    youUnChecked = (PostID, PollID) => {
            const {InfoUser} = this.props;
            if (InfoUser.length <= 0) {
                return null
            }
            fetch(URL + Vote, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    PostID: PostID,
                    PollID: PollID,
                    IntUser: InfoUser[0].IntUserID,
                    IsLike: 0,
                    isLog: 0,
                    lang_name: "vi_VN"


                })
            }).then(response => {
                return response.json()
            }).then(data => {
                console.log('data', data)
                if (data.ErrorCode === "00") {
                    let currentCheck = this.state.countCheck;
                    currentCheck--;

                    this.setState({countCheck: currentCheck});
                }
                else {
                    Alert.alert("Thông báo", "có lỗi sảy ra");
                }
            }).catch(e => {
                console.log("exception", e);
                Alert.alert("Thông báo", "Có lỗi khi like");
            });
        }

    render () {

        const {item} = this.props.dataItem;
        console.log('itempollvote', item)
        return (
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 5,
                flexDirection: 'row'
            }}>
                <View style={{
                    marginLeft: 15,
                    flexDirection: 'row',
                    borderColor: '#E0E0E0',
                    borderWidth: 1, width: "80%",
                    backgroundColor: '#EEEEEE',
                    alignItems: 'center'
                }}>
                    <CheckBox
                        style={{marginLeft: 2}}
                        onClick={() => {this.youUnChecked(item.PostID, item.OptionID)}}
                        isChecked={data.checked}
                        // leftText={leftText}
                    />
                    <Text style={{marginLeft: 10}}>{item.OptionContent}</Text>

                </View>

                <Text style={{marginLeft: 15, color: 'black'}}>{this.state.countCheck}</Text>


            </View>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        InfoUser: state.GetProfileReducers,
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        // callApiSearchCmt: bindActionCreators(callApiSearchCmt, dispatch),
    }
};

PollVote = connect(mapStateToProps, mapDispatchToProps)(PollVote);
export default PollVote