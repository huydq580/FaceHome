import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    TextInput

} from 'react-native';
import Dimensions from 'Dimensions';
import ChatSuCoItem from "../../../components/chatItem/ChatSuCoItem";

class ChiTietSuCo extends Component {
    constructor(props){
        super(props)
        this.state = {
            dataItem: [
                {
                    MessageID: "A1AB7696-EC30-4F91-8A2F-5BFAC42CED5C",
                    MsgGroupID: "09559E9C-4782-49D0-BD07-BDF736E37476",
                    UserID: "115CCFA3-E03D-4A9A-B8DB-F57A3A5D4F3C",
                    FullName: "Nguy?n Tr?ng Ð?i",
                    Avartar: "",
                    RefUserID: "",
                    RefName: "",
                    RefAvartar: "",
                    Content: "Chúng tôi đã tiếp nhận sự cố từ Anh",
                    CreatedDate: "2018-02-27T17:43:43.737Z",
                    DayFlag: 20180227,
                    KDTID: 50
                },
                {
                    MessageID: "1F209B79-C8AF-4CB3-B7B2-A438688BA88B",
                    MsgGroupID: "09559E9C-4782-49D0-BD07-BDF736E37476",
                    UserID: "115CCFA3-E03D-4A9A-B8DB-F57A3A5D4Fdfds",
                    FullName: "Nguy?n Tr?ng Ð?i",
                    Avartar: "",
                    RefUserID: "",
                    RefName: "",
                    RefAvartar: "",
                    Content: "Tại sao chưa sửa cho tôi",
                    CreatedDate: "2018-02-27T17:43:50.730Z",
                    DayFlag: 20180227,
                    KDTID: 50
                },

            ],
        }
    }
    render (){
        return(
            <View  style={{flex: 1 , backgroundColor:'white'}}>
                <View style = {{flexDirection:'row'}}>
                    <View style = {{flex:1, borderWidth:1, borderColor:'#9E9E9E', marginLeft:10,marginRight:10, marginTop:20}}>
                        <Text>Nội dung sự cố</Text>

                    </View>
                    <View style = {{flexDirection:'column', flex:1, marginTop:20}}>
                            <Image style={styles.image_circle}

                                   source={{
                                       uri: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxITEhUSExIVFhUVFRcXGBgXFxUXFhgYFxgXFhcXFRcYHSggGBolHRUXITEhJSkrLi4uFx8zODMtNygtLisBCgoKDg0OGhAQFy0dHR0rLSsrLS0tLSstLSstLSstLSstLS0tLS0tKy0tLS0tLS0tLS0tLS0tLS0tLS0tKy0tLf/AABEIAMIBAwMBIgACEQEDEQH/xAAcAAABBQEBAQAAAAAAAAAAAAAAAwQFBgcBAgj/xABJEAABAwIDBAQICQsEAwEBAAABAAIRAyEEEjEFIkFRBhMyYSNCcYGRobHRByQzYnKTwdLwFBdDUlNUgpKisuE0c4PxFWPCZBb/xAAZAQEBAQEBAQAAAAAAAAAAAAAAAQIDBAX/xAAjEQEBAAICAgMAAwEBAAAAAAAAAQIRAxIhQQQxYRNRcSIF/9oADAMBAAIRAxEAPwDDULf/AM2uzP3c/W1fvLv5tdmfu5+tq/eWutZ7R8/oX0B+bTZn7ufrav3l382my/3c/W1fvJ1p2j5+QvoH82my/wB3P1tX7y7+bTZf7ufrav3k607R8+oX0F+bPZf7ufrav3kfmz2X+7n62r95OtO0fPqF9Bfmz2X+7n62t95H5s9l/u5+trfeTrTtHz6hfQX5s9l/u5+tq/eR+bPZf7ufra33k607R8+oX0F+bTZf7ufra33kifg72V+7n62r95OtO0YGhbB0l6IbMpM8HRIdf9JUPtcqr/4DDZZymfpO96liy7UlCuFHYNEnsH+Z3vUi3ojRIB6s3+c73qKz5C0Sj0QoXBb/AFOEetOh0NwoEdWSeeZ/vQZihaPieh9Bv6M/zP8AemR6M0f2Z/md70FFQrx//OUP1D/M73pfD9FqDj2D/M73q6NqAharR6EYSN6kf53+9PMJ0FwJsaJ+sqfeTSbjHkLb2/B7s79ifrKv3knV+D/AD9CfrKn3letTtGKIWx1OguAH6E/WVPvJNnQfAn9CfrKn3k607RkCFt+E+DzZ7taJj/cq/eTw/Bvsz9gfrav3k607RgiFvX5uNmfsD9bV+8up1p2i5BelxdW2Auri6EAuri6gEIQgF4r1msa57jDWgk+QL2onpNWAolnF+mnAgmZ9yCMwnSSq6rvMYKZMBvjttbM6YJ14e9RmN6ZYkVXBmHHV0yQ6TcwYkGw9qgsRjxRJMgknM4CJBjS2lsouRo5RZ6Rudm8EcpvObmZ5WWdrpfML0xbUaZYWOmwJm3lskK+2ZOqorNpg6iD6U4o42UtamKa2jisxKhnmbALjiSnOAwLnmFzuTtMCuysGXGDxVrw2DAELzs3Zgp8bqTyKxnIyGz2TMJR1EDQBLEpOrWa3tOaPKQPatMEKlMHVN34Jp4J4b3Fx3LtJl0S1GU9jQZOidYTZ7WqYpU7XuumiFWdmLY0XRTg2S1WjeV471UOqbl4qWXKDgksTPAqhGs5cohL4fBl2qftwKBbCtslCusZCCEHhC7CEC66uLqAXVxdQC6uLoQCEIQcdpbX0+pZbtjHVqjn9a8uDC7dbuNEWNhJiwmSVqTtFlWIjLXdx01/WfwPOyh7V3awflZmYWNIloiAQdCOJFjdRMx7v+lP43NUoGs57czXNYBMWDGgBre4RpYKEPE8o9eq5bvt2sk+naLZUpg6UAJhRubKw7MwwIC58mfWPT8fh705wOBLhMK0bMwADBzUj0YwQ6lxLZkiO5OWYWCV4OH5Nz5Li9/PxY44+PRBrV7LUuWKJ2ltAMOUEyQYMWBAJuTYaL6Ur5WekX0m2q9kUaM53CSQJLWnSO8+r0KAwWw6lV+/mZIzZnAkm4tfjdPau3xTLRnYS9xDniXlu6YMgQ6IAjvKkdmbYZUJptL3OaQC4tAkuDnA2MAQ0j0LfbUcLN1zC7E6gh1Gq8OmSHQabu5zIt5RcKwYZwd3fjgeKr/S7/SVfoH2hVzoxt51OaIJktlpndBAEANOpJOiSjTmO4JKpINky2ZjTUbcjMAM0cDFwRwUqyDrqtBCs45VF3J4qfyiIXMgGgCIjaeFcRyStLDninq9saqPeHpwEqvLV1VAuFdXklBxC5K4gcBC4iVFekLkrqDqFxCD0hcRKBpteqW0iQYPPT18FQMbs9wpVQ2SXuAgWFnA3nWx9Su3SY+APeWj0mFW8bPHmdXTwby08nvWcrpZPKn7ZqdXh6eHIGYnO+7iRqGTNhumwAuMp4qCYwxorJ0t2Zly4gdiq0ZbtuWBrHm1gMwdAmeargcco82i4YWWbejOWWQvRhjlbdkUMxBI4KtYClLgSr/sSiAAvD83l6x9b/wA/D3V02FQ6vDvDrZhaefck3iVP0KLTh7gaTzULUA4LzfCxsu77m3DPk73K/pm5qzLpdiXnEup5txrmENk2Nz2dCe/yLUSFlHS4/G334s0Ev0PZ5/5X2sHz+ZC7YFmWJ3vsU10NbFaoIcL07NMjSpZx4t+2FXtoAloJa7tkS52sE2jh/hWHoc3w1S37OzDYdvXmOfet5Vwk0sfSsfFav+272LONmnwv8P2DVaT0pHxWr/tv/tWZYR3hBEzl4a6BSFaN0Bruca7ODchHO8iPJuiBwVwDVSPg3fNTEcZZTPLQu4edXxoWkjyuhqVDUAKq8hq6AjMEAoFAuryESqjpSZXorxKAQuShRS4K7K8AroKo9LsrzKAoPcoleZXHPA1KBREpGniGuMBwJ5AiUpKCL6SHwQH/ALGf3BU3pQ6KAji/g2G9nvuTb8Qrh0j7DB/7GepwKpfS0+CbzzcXS7R2sWA/6Wcifav9IMSSyizOSG0xlaWwW5jLpsJOfP6BcqEaZHo+z/KkukkZ8jXS2m1jGmREHfsQBIlxUVRvx4hccJqPRld1PbHZcFaDsaLKibKtE6K5bHrcjb2r5fzse0fb+FZMGmCtGGBAngoV5Unh74Qd/f3lRNRX4c8yfkfPy8TL/aTcVlXS13xt4l2rLAbxseyeX+VqiyvpYfjbxLu1Ts0XNjcHhy9K+xHz8ldx1OGA5fHNy6SbmxCsHRBvhqlp+Ssww0dq55gcVAY+mAwbn6Q3LpOp3Y4aayp7okPD1LA2pHcMAQTfvjirWVp6Rj4tV/23/wBpWXYX5RvHd0FjpwK1Pb4+L1P9t/8AaVlmFvUYDJkaCx04FZhV/wDg2Phq1z8kzXWx/wArQQFnfwbH4xUEkzQBvbiz1closraAlMNp7QFNroIzhsidB9LknWJq5Wl3If8ASpuNrB7Khlplp8Uz/MlWEqeIa87z+sc43OonXkYCcDDN/ACrOzXHKPpDjlGh1KsmFrh7Q4EGeVxIsY86zVT+zdpsa0MeSCBqZMxqpeVQNpEZmAxo/tEgdk6kXVl6J4zPQDZaTT3d12YZfFub6WvyWpfDKaJXkolcJVHlC6hApK6CkpXqUHuV2UnKZ7YrZaRMkXaLRO84N4+VQReI2nVLgzMADPZuRBjzjnyTfNJALpg6EyP6V5Jmo0G9p1B8YcG+3T1qt4HEl+IxLHQWQIBBIEuywALgR7Aom0vj64YHPDyyHatBJuBbKYHHh7VJYLaT2OYX1XFkS60g+TlMqu9In+C/5Oc6A+jTRSFUxGlmgXDuJHEIRYdt4kOZTc0gtcSZMjTvkd9uKpXSh00mGRBMiAcsHNcRxv8AiVM4raDn0QCJDHPYMsRLaTiQ6TOh4DgoPpH8jhxfsDQzwbw4a68bJVhDEbKY7Csqi76jn6cmgZQG6iSZ86rNBsHn7fJZaF1x/wDGBgJlxzGRBjdianPf4c4VGZSDXx6uC83Hlu5T+nrzx8Y1KUyQG2Fz9kqe2K/S6gGvmLaKV2U8S0EwCQDHLjC4c+O4+h8fPVa3gcS1uFY0kcx5NbpjWrhxtZV/A4huWA7xoE/aU6oVb6rz/Fw/78s8+Exxt/tIyss6W/6t43jJp7o42jXgeHpWnNKzHpX/AKt9nXNOwMA2N54HhrwX13yclex9M5JyADrCJJkmJse7v7lPdExNd9gd2kdwwBDtfNxHFQOPZudkDwhGsnU2Pd3qd6KN8O/dB3aZhhgCHtv5tSOMFKyuG2x4Cp9B39pWUYa76Ygm2mk+QrWdrDwL/oO/tKyTDdunx7tOfFSC9fBu74y4X+QOv0qenctJlZn8HzvjfH5B2v0mady0mVuJEV0lr5aUDNLjG6JPKw88+ZV6mHmi+eu7Lu0WDnqBwT7pnUvSbaLm7+rHK5FzxsonAZDTqR1Gr9HucZ9/cs2t2eIgdnvERaxabidZGnEqb2ZVMkHOQRIJYGNtwaB+LKAwLyDaeGgBNnRb0qSpjK9ri2CDrUr35HdFvMlJ9U/xjz1jNbGLAHUcJ110Up0QrEVHNJO809qmGGWnjFjYlQmKI6yYEda0dq3AX/V0Uh0dOWu2NJcLVM4uCONxqtRzq7SiV4lEor0hJyhB3Mu5klmRmVC2ZR23neDaOdWmP6p+xPMyjNvOtSHOqO/Rjzpx0QRzJ6xvCGi1hysMvG2mnJVXYDprYh0xekJkt1fzHHu46cVaWiHnhDRwDdA7+YW04Kq9E7urHnVpixA0knXXyarCeyvSyuRTZFyarhqD+sNR7OGimcTUhx/4xq4avjUW83psVA9KD/pxe9U6xN3AcLcVN4h++d6L0x2iOJOml+7VFIUX/FnEBpBq4kzJkHIQYHkBCZdKiMuHFux5OFPU8krgifyEHNY/lJiGnx3DWJGsWSXTB0GiJ0b4wkaMnKOI5pSJXEYkswFJrTE0zxBaWuDJDRedO7Sbql1asOF9D5VaNtV2jCUGRvGiCSI5tif1RAmBzCptR115uKecr+vXyZeMZ+JBtfvunmz+03U6f5UPTcp/o9hnOLnxZrb30ndB9JHpU5bJN124N2xLYKqZ46n7FYMC+9404qC2dQM+d59Bb71P4HC5iQSG2mSRw4CVjiuMu3Tn7WaS1IWWZdK2/G32cZNOwMA24ngVpxWZ9KWzin2Jk07NNjwueDpsva+ZVex9OGdho8IRrJ1Nj3d/cFNdFW+HeMs7lOzLRD238g1I4wVEY+gcvyYHhcsk3mTunuHPuUv0WZ8YcMv6Nhhh5PYZ9/dKVF22kPBO+i72FZFh+1T492k68eC17aA8G76J9hWP4c71LjpbnrxUgunQExjALjwL9fK3TustKzLMegzoxjLEeDqWPkOno9S0rMtpFS6bVWirTLnMG5bMzOdT2RwTXZWNaW1B1pMOcPkmtGgt366pL4RvlKP0Xe1RmxTHWfTn0tCzYZZeNIzDVgLkHQ6GNHtSp2gA5sUaQl3FmY6xMk62TYeP3Z/7mn7Eye7eHc8f3FXRbdaWZuKzGSGiKgMhvJx1A1Utsas38obDqZ3xpTLDf2quMd2u5xPtT3ZDoxTf9xnthaY206UErwXLzmRspKEnmQg5mQHJHMu5lU2WzKK246TSHznnidKbhoLntcFIZlE7Xf4WkJ8WqdSP2bdR9JKG1Qwax5Nkw3k12pOvlHKOBVb6HC1U/wD6OQOjSbzprqPtU7i3bld1rMqDxj4o4mzddP8AKgeiDR1ZNr4h50J0pgWOg14rn6PZLpB8rg2xG/PZLfHpm7eHkU7Xfvm/jAdofqkxlOnk1Oqr+1ROJwTbaN0mNWm034cVN4lxzO1jOf1TA6s+cX8/mKimeEZ8RpmTBp1Z3jEmtu7sxN3cF46ZPirTFxDQbGTyt+rpp51yjTb+RUTAJ6gg2dO/WpuF4giBz4jmm/TCoDXG6bMHzCe1rN5t6laRK9JaYGDwzwe00tdE3gyA4HjYz3yqNVN+46f9K4bee04anB35AjcJAa1wAGUk+rkqpVygi/D8BccMdbd88t6/x7oMlXHYtJ1NgEQKlz5AbD0j2Kp4KZkFXrDVXGpSw9Qshm6CM0bzs17WP2LzfIt+nu+LJJsvgXPZvB2gJlpsDuQJ4EAkebuT/GVKWSmWuOfxxe0OBHqUNVpCmXNlpgvFiCCcwgjnxXivV3teXFw4dyvDh7Tnz14WN20TUhlEgVHua1peN3ecBeD3rxt3oBVYx1Z1SkTDnvhrh2GOeSCOO7HnVe/LS2CHAEGRLyLi41atG6R9KMNUpNDX/KDxg5gh0AySLbpd6F67XzmRbU6P1BTL8hDJzBxZU05F0Lz0cZGIcII8GyzNflKd/Jz7pWwdMtqD/wAM6prno0R3HrHU22/mWP8AR93xh3ab4JvYuflKfqPHulVLF3xo3D5D7Csco60+NxbznitkxXYWNs1p8bjy681YizdGcQaeJpug2DxBk23pjyXWnFyyfZFqzO1q/X+LSFqYK3EUz4SDvUD81/taojYzrv8AKD/SFLfCR+gP+5/8KD2Q7ff/AA+xKzTRxvU/5Pf9ijq3E/OB9ZKf1O3UHe/+1yj6mjvN+PWotTdQ/KfjknOGdGIDvnNPocm1NsvjmW+vKFOVcLRHXZGvDqLm3LpBkjT16wlukk3F7lclJh6My3pdlJXUlmXE0PGZGZI514668KsnWZRmOPh2d1J3EDWpT5/RT4OUZVeHYh0EbtNgMQYJe435aD0qZfSwz2g7wOIvwcO1Jg5BoLR7NFDdE4/Jwbdqse1GkDTj5eClNsEjDVtbnk0DtgaDjb8GVG9GWn8lbGbs1jYMNy61nankNNZ4Ln6X2a7QvjsKOTRqZPjceOmqlMaLPN9Xnsj9mRYzby8dFFYu+06I5N/+KqksYAWvFhIq3yuEWieXn48FFI0SPySgD+zoi5dqajNBMRf0hRvSgjryIYAMwvYWe8XjXTXuUpjSDSw4AgEYKB3OquPsaoXb9SaxvEl/Cf0lT3rQs9Vxy4Sf27p8gzgeqPQqG9sxbxQrdtrEGkzDVIktdUMTqDPvVRBv5llqH2FMQdY1Gk+dTOy601DFhPMkjU6+bVQmDw73ua1okkgADiTYKawOFfSqljxDmugjvGYEepccuu3rw7a/D7D1N3+Y/wBQS9R9/wDLuXcmNCpu+Z394TwnUz6zy7lcdRnPdIV8UA3tR/yOb6y0pl0gxjhWLLEZGOF7AmmZn5xsf4Ql61UmwcZJgeEcO7WCldtYQRiH9Y2eoaMls0tygEye0Rb+ILp9vPUPtTa1R+HYwtIaHxOYHMRws0QARbVL9GXxiCZczwQuLn5Sn5ddPOp3FUKL8OaTqzWjJTLoF2/JkEm+sR/Eo+jgxhq7S2od+kd50EDfpxYjijO1zxPZWMjxPpefVbG58tVO6O7HpuoUq/Vl1QVXaOIAy1HNzEEwRDRZIIfZhHXM17T9Z+dyvK0+nUsPIFXq7KbgMtSiSIMggGzspi9pMjyqZwmzqWIqU6VZzxTMh4a6MwLTZ0yCJhblZVn4R+zRPe/2N9yr2y3b7vos9hVm+ErZLcO2mGVqlRjnvcA/K4tkuFngCRDRqqns12+fotSoKrfCOvq53l7B96jH6HyD7FIuPhz3uHraoybH6I9gUjVT2zjNWn3mn7QrzjWA06kAS5ru68WlUTYl61Dy0/UVoIPCFnO+Y1hPFPKL5a08wPYveZMqFXLSaTNmDS5sOA5pSjWDmhwkAjQiCO4jmuzmcZkJLMhVFebtd0mWwbakcdOKUw+OzVBukCD5jY68lT2tfqbTBvqZlSuyM0k9Y1oa2XFzhLpIhrWi7jblFjJXOZbb0t9LEBea228H12HaKDKRouBqPY1rC9xuCXMgm7Qb8XKGfinZmMtlL4L23DQDdwbYutNkyxzvCNdTOYuFQumWxlIa0wTvSzK62meNWqZXZj4PeleJY6lWdSblY59gc0x1jyJc4yeccCSovZdRow7Q4tB6p/aaTZzjOni2uE1qY3rGupvyNgTvOe6SDMCAb3ngPOmlfElkBxAGTdyOBImS0EeLe5GoWdqfh+baTTMgMMG0TkM+1Odqu8FVv4lY2JPGNDrf0cFCVsWw1HVKQflht3EZyYbIOWB2pjuAT2ninVWupuvmBBEkWgWEAnn602aP8QCW0o0a3CTZ/wCj61x8XjmEc78lE4qm5+IaxuYuc6AAIkvcYG9EdoAypjHNqNZm62iQGMs2pmc0AGA6GeKS0eV/G8M6GzqlV5eKjRkgky8QBEQcvcrtdLB0g2NVdh3F9NzerqZL3OfIHuAIlpG8BIPDuVCcwgxysrXhdoVjnpuq5mB7jBc87xAGYSLmwF497CtsymHNL6zWzVptcMry9jXdupli7WEEETciyimODrlhDgYI0UrgcRmc5zy4nWYmT3nyEpntHZ3VBrg4ODmtJu0FriXjKW5idGEzHEedGhict+Y7/csXCXy748lk0kqR7LeJt/WCFYntYaQAs8EtJzDKbCAANHdyiMLtFtM9RWwrTUdJbUJ3my9rG2GoaadWx4vKaDA4UtfUbWNsU9xa7q2uzAtAAaTJu42HI3U6S/bN5bPoniWVC61ZoMkjetIMEGT6k82viZpVgXUSTSgwWF7t3hBuZHAclBOpsk2dAL3ai53rC3/r9ae7aweDp0iKbqxrAHOHlmRu4XNLS0b2hEHleLrpHGp/D7QinmNejADBIDTBMQHQeQNu6eCh9rlj6hcat2RMSQASBI5cLDmm+LFCi0se1+UtpvJBvIA0kab7l42iaW+4TJ7W80mLRbUXA8wRImaOLDWBzsU5rTF92DaYALSU4dSpUQKXWODGzUu4gjK7M4lwExJ00voqntJ84dp4Z7SWyAQ6BEzw17hzCsm0X0MjnVHyW06jSASHlpGZ5aCLxAEmIzDvRUhUex1s2HkSOwCZbFQjXhIPluksPVcS4GowybWvLiYi8akL1TxtBwqUxTZTMMp9Y90eELXOc+8mC0NDiNAAIULTLcxD5a0vpmQOLatPKP5i0Hyq7Q4OzH4jCUmF7WuaZmBcbzQLXFuPcq1hJDuOgVl2XTo5qRzuDw6nAy2scSxl+/M/+Uc01wtZsVQ5uJc4tGQgABsOBcSBqC2fJZNmklgth4KphKmJOILMRTI8FLTmjK0EA729mbfhKo7cM4mA1xJFoBvGsKcx+OpNxDopPcHUWNAqOhwqnqyasD6JgaQRyTzZvSSrRyOw9J9N4pdU9wgipmfJeQdHxDR5Ei2GWwsJUFbDkseBIuWkC0q/Fqq2yKbusoyzEgCb1HhzbA63urUs5/a4TUM27Qp5uqk5piMronyxHrSzcS0OFOd4iRYxF+MRwNlG1HPGJgu3ZFrcufFd2tjnUiCALjjPA93l9i128xOs0lnPPAetCh6O0qhALhTBPCfRxQuu456qHq02niRY+SYyz3C3qTDFYqkwh+9Nspg89XDyE+pD9oWOhA5SfN+OShmNfULnXgDiNb9nuJXzeG5e3pzk9JF21qcsObs57Q7V0xBPlSBxIBp5JlrDm1F3OJlpHDKW+cFRD80+fzJWjUIIIP4/HtXr25e0jTLQRaYJPHmeEIr5C97hOWSWzqATLQe+CE1OJkk314fYitmblNoe2QQQRB1BjQiRINwsbXwcyxuZpHOBpBBm/oXmrVY4Oa1wy590ONyCRdw0mB6yo+pWNzxK8UXX0HoWoJQ02OcCXxAFgAdGAEzNtCU92biadFlamC5xq0nNJ3coLc2UAamQ7XnwUNQrXItEHUDWDFzddZTcZcAIzRA14mQ3lZNnorTjMLxBJm3DTU8+/ipRtKnmO8409ZDbiTaJME3Cg303nstcfNKXOBrE7tJ8WvkPITw5ptCxqBoG6STOgsIbK62oC0uObyQeYvpGk8QvdPY1d0nK8QLDK4ToIFrWk35J7Q2PWyEFpmREkSReQBpy1I907LLoxwVdrHMqOaYaS4iwkAiI849iGbRk3ptjrzVO4yYMHKLdr52t1IDYtcuG4IE6ubpbgCU4pbBqTJa2INg+4PA9g27ldoZisMuYNMF2WJmBUFYAnuHWNSGOknEHnVJBg3BdX4+dnpCmn7KrEBpMAAAAd1x4ok95THH7JdTpvcS8gCdG5eA3jM+pJR527WzENoNzu6hgO6wgGGmIdM2aOEydOJ8bQqOdUrQBfqy05RcAMa4aX1fr+r3KUwTSGtccMXHIBOVjZsIPaPpTbFYOq4y3Dvb/ABA+qFdhltEtq4LcHhAacgAAmGOabDhIKnNsVw5xykEdVVB3Q6CaVOLO75toVG4fZWIGlKLR4txcaHylLv2ZiSAOrAgRYtvrd3M3jyALPanh3AYtlR9WqXBrW1NzMxrc7cppybSJgnWeCQr4wkSGtkOb4vOpSdeSRo2fMF6pbCxAPYFtJcNZnglG7DxEzlb6f8q3KjuGxWVzXQ0gPb4rZ3a9ebxOjh5J7ymTqcZzkqG9oqkWdmMxYkDKLccw5LzhdnVXNkDxn6Bxu15B9YS42bWAP3D7lm5ZLNGWIwgdVmbzDRJJIEwZuR5EUtlvgE0n3gg5iAQY9CUxIex7JhkWzZSLw65zc9OSRxm2HkMa2p2WNbDG65bSSbklWXItiW2YwUntf1ZBbNzVe4GRGhtzU1s/pC2q5zQ3sgSZMSZ3RbWyquEo16zXS/Ly6wmYPEQFP7NwLaTA0FpjU8zxJSY23dXck8GPSWhWfXFSlmLckGHASbjQn53qUBtLG1nEB7yMgDYzaEazGuivLyImQs+rmXOJ4uJ9JWsvDFr23EOj5T2ISN0LPZnawU+jw/ai/wA1x+1OaOwGj9K6/IQs2Qtfxx0aY3o5S/Wf/R9qVp9G6A/W/mYFlyE6Qauzo9Q5T5X+4JUbBw36rfO4lZIuK9INgbsTDDxafon2uSg2Rh/1WehvvKxtCdRtDdm0Bo1vob7koMJS5D1LE0J1G3DD0xoB6V6DG93pCw9CdRue7831LuYcHAehYWhOq7bpm+cPUu5h+sPx51hSE6m26F47vUozpJVH5NV07IGo4kLHkK6RtOzKwNGkbfJs4/NCc9YO70rDUJobj1g/BR1rfwVhyE0NsrY2k1uZxaGjjmEclG4npNhWEiS4gTu380rJUJ1FzwfSZ9OmWNYCSXOzHgXEusB5Vx2Pxlad4gX0ho8W3PkqahXQvOG2DmOapUzefvPE/i6mMNsukzSPVPnKy5CaGuBrBxCJHP1rI0Imml7dxQZTgG7rC/DifR7VVbKvIWcsdmlit3IVdQs/x/qdQhCF0aCEIQCEIQCEIQCEIQCEIQCEIQCEIQCEIQCEIQCEIQCEIQCEIQCEIQCEIQCEIQCEIQf/2Q=='
                                   }}
                                   resizeMode="cover"
                            >
                            </Image>

                        <View style = {{flexDirection:'column',borderWidth:1, borderColor:'#9E9E9E', marginTop:10}}>
                            <Text style = {{fontSize:16, marginLeft:10}}>Nguyen Trong Dai</Text>
                            <Text style = {{fontSize:16,  marginLeft:10}}>0405</Text>

                        </View>
                        <View style = {{marginTop:10}}>
                            <Text>10h:20</Text>
                            <Text>20/02/2018</Text>
                        </View>
                        <View style = {{borderWidth:1, borderColor:'#9E9E9E', marginTop:10, minHeight:30, alignItems:'center'}}>
                            <Text>Đã nhận</Text>
                        </View>


                    </View>
                </View>
                <View style={{flex: 1, marginTop: 20}}>
                    <FlatList
                        style={{backgroundColor: "white", flex: 1}}
                        data={this.state.dataItem}
                        renderItem={({item}) => {
                            // console.log('item', item)
                            return (
                                <ChatSuCoItem
                                    dataItem={item}
                                    myName="115CCFA3-E03D-4A9A-B8DB-F57A3A5D4F3C"
                                />
                            )
                        }}
                        keyExtractor={(item, index) => index}
                        onEndReachedThreshold={100}
                        showsVerticalScrollIndicator={false}
                        ref={ref => this.flatList = ref}
                        onContentSizeChange={() => {
                            // console.log("on size change");
                            this.flatList.scrollToEnd({animated: true})
                        }}
                        onLayout={() => {
                            // console.log("got to onlayout");
                            this.flatList.scrollToEnd({animated: true})
                        }
                        }


                    />
                    <View style={{
                        flexWrap: 'wrap',
                        flexDirection: 'row',
                        paddingBottom: 5,
                        alignSelf: 'center',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <TouchableOpacity>
                            <Image
                                style={{
                                    width: 40,
                                    aspectRatio: 1,
                                    paddingBottom: 10,
                                    paddingLeft: 10,
                                    paddingRight: 10,
                                    paddingTop: 10,
                                }}
                                source={require('../../../images/camera.png')}
                            />
                        </TouchableOpacity>
                        <TextInput
                            style={{flex: 1}}
                            placeholder={"Nhập vào đây..."}
                            onChangeText={
                                (text) => this.input_msg = text}
                            ref={input => {
                                this.textInput = input
                            }}


                        />
                        <TouchableOpacity
                            // onPress={this.sendMessage}
                        >
                            <Image
                                style={{
                                    width: 40,
                                    paddingBottom: 10,
                                    paddingLeft: 10,
                                    paddingRight: 10,
                                    paddingTop: 10,
                                    aspectRatio: 1
                                }}
                                source={require('../../../images/send.png')}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}
export default ChiTietSuCo
const DEVICE_WIDTH = Dimensions.get('window').width;
const styles = StyleSheet.create({
    image_circle: {
        height: DEVICE_WIDTH / 3,
        width: DEVICE_WIDTH / 3,


    }
})