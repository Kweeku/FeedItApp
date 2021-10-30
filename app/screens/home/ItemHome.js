import React, { Component } from "react";
import { StyleSheet, View, Dimensions, Text } from 'react-native';
import PropTypes from "prop-types";
import {FontAwesome5} from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Images from "../../components/images/images"
import { Icon } from '@iconify/react';

export default class ItemHomeRow extends Component {

    static propTypes = {
        data: PropTypes.any,
        index: PropTypes.number,
    };

    render() {
        const { data } = this.props;

        return (
            <View style={styles.container}>
                <View style={{ flexDirection: 'row'}} >
                    {/* <Icon name='simple-icons:pond' style={{color: '#228B22',marginRight:7}} size={40} />   */}
                    <Text style={{fontSize:25, marginTop: 7}} >{data.id}</Text>
                </View>
                <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', margin: 7 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <FontAwesome5 name='filter' size={30} style={{ marginRight: 7, color: '#3b5998' }} />
                            <Text> Feed Amount: </Text>
                            <Text>65%</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', margin: 7 }}>
                            <MaterialCommunityIcons name='fish' size={30} style={{ marginRight: 7, color: '#006994' }} />
                            <Text>Fish Type: </Text>
                            <Text>Tilapia</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', margin: 7 }}>
                            <MaterialCommunityIcons name='water' size={30} style={{ marginRight: 7, color: '#964B00' }} />
                            <Text>Feed Required for Next Feeding: </Text>
                            <Text>3.75 kg</Text>
                        </View>
                    <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <MaterialCommunityIcons name='timer-outline' size={40} style={{ marginLeft: 12 }} />
                            <Text>Next Feeding Time: </Text>
                            <Text>3:00 pm</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', margin: 7 }}>
                            <MaterialCommunityIcons name='nut' size={30} style={{ marginRight: 7, color: '#964B00' }} />
                            <Text>Feed Size: </Text>
                            <Text>1.5 mm</Text>
                        </View>

                    </View>
                </View>
            </View>
                    //     <View style={styles.container}>
                    //     <View style={{ flexDirection: 'row'}} >
                    //         <MaterialCommunityIcons name='palm-tree' style={{color: '#228B22',marginRight:7}} size={40} />  
                    //         <Text style={{fontSize:25, marginTop: 7}} >{data.id}</Text>
                    //     </View>
                    //     <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                    //         <View style={{ flexDirection: 'row', alignItems: 'center', margin: 7 }}>
                    //             <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    //                 <FontAwesome5 name='temperature-high' size={30} style={{ marginRight: 7, color: '#cc0000' }} />
                    //                 <Text>{data.sensorVals.Temperature}</Text>
                    //                 <MaterialCommunityIcons name='temperature-celsius' size={12} style={{ marginLeft: 2 }} />
                    //                 <Text> Temp</Text>
                    //             </View>
                    //             <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    //                 <MaterialCommunityIcons name='water-percent' size={40} style={{ marginLeft: 12 }} />
                    //                 <Text>{data.sensorVals.Humidity} %</Text>
                    //                 <Text> Humidity</Text>
                    //             </View>
                    //         </View>
                    //         <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                    //             <View style={{ flexDirection: 'row', alignItems: 'center', margin: 7 }}>
                    //                 <Entypo name='water' size={30} style={{ marginRight: 7, color: '#006994' }} />
                    //                 <Text>{data.sensorVals.Water} %</Text>
                    //                 <Text> Soil Moisture</Text>
                    //             </View>
                    //             <View style={{ flexDirection: 'row', alignItems: 'center', margin: 7 }}>
                    //                 <Entypo name='light-up' size={30} style={{ marginRight: 7, color: '#fdd33f' }} />
                    //                 <Text>{data.sensorVals.Light} lux</Text>
                    //                 <Text> Light intensity</Text>
                    //             </View>
                    //         </View>
                    //     </View>
                    // </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        flexDirection: 'column',
        borderRadius: 10,
        padding: 15,
        margin: 7,
        alignItems: 'center',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.4,
        elevation: 2,
        width: Dimensions.get('screen').width - 30
        // borderBottomWidth: 1,
        // borderBottomColor: COLOR_APP_DARK_GREY
    },
});