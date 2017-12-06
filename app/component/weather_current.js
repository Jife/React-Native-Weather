/**
 *  显示当天24小时天气的自定义组件
 */

import React,{Component} from 'react'
import {StyleSheet, View, Text, Image,FlatList,ActivityIndicator} from 'react-native';
import Divider from '../component/divider'
import Icon from 'react-native-vector-icons/MaterialIcons'
import AppStyle from '../styles/index';
import weatherStore from '../storage/weather_store'
import {observer} from 'mobx-react/native'
import dateUtil from '../util/dateUtil'

/**
 * 当获取到了当日24小时天气的时候需要进行刷新视图
 */
@observer
export default class WeatherCurrent extends Component{
    render () {
        //console.disableYellowBox = true;
        if (weatherStore.loading){
            return this._renderLoadingView();
        }else {
            return this._renderContent();
        }
    }

    _renderContent = () => {
        return(
            <View >
                <Text style={AppStyle.smallNumber}>10分钟前更新</Text>
                <Divider/>
                <FlatList
                    keyExtractor={this._keyExtractor}
                    showsHorizontalScrollIndicator={false}
                    data={weatherStore.hourlyDataSource}
                    extraData={this.state}
                    renderItem={this._renderItem}
                    horizontal = {true}
                    style={styles.currentWeatherFlatList}
                />
            </View>
        )
    };
    _renderItem = ({item}) =>{
        return (
            <View style={styles.futureItem}>
                <View style={styles.textContainer}>
                    <Text style={styles.date}>{dateUtil.getHoursAndMinsByDate(item.date)}</Text>
                </View>
                <View style={styles.textContainer}>
                    <Icon name='wb-sunny' color={'#ffe603'} size={35}/>
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.temperature}>{item.tmp}°</Text>
                </View>
            </View>
        );
    };

    _renderLoadingView = () => {
        return (
            <View >
                <Text style={AppStyle.smallNumber}>10分钟前更新</Text>
                <Divider/>
                <FlatList
                    keyExtractor={this._keyExtractor}
                    showsHorizontalScrollIndicator={false}
                    data={[{key: 'a'}, {key: 'b'},{key: 'c'}, {key: 'd'},{key: 'e'}, {key: 'f'},{key: 'i'}, {key: 'h'},{key: 'm'}, {key: 'n'}]}
                    extraData={this.state}
                    renderItem={this._renderItem}
                    horizontal = {true}
                    style={styles.currentWeatherFlatList}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({

    futureItem: {
        flex: 1,
        marginRight: 30

    },
    currentWeatherFlatList:{
        padding: 10
    },
    textContainer: {
        flex: 1,
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center'
    },
    date:{
        fontSize: 12,
        color: 'rgba(255,255,255,0.8)',
        marginBottom: 10
    },
    temperature:{
        color: 'rgba(255,255,255,0.8)',
        fontSize: 12,
        marginTop: 10,
        justifyContent: 'center'
    }
});

