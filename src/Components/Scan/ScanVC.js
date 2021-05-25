import React from 'react';

import {Alert, SafeAreaView, StyleSheet, Text, View} from 'react-native';

import {RNCamera} from 'react-native-camera';
import {Header} from '../Header/Header.js'

import Realm from 'realm'

const PlateData = {
	name: "Plate",
	properties: {
		id: {type : 'int'},
		plateId: {type : 'string'},
		code: {type : 'string'},
		checkinDate: {type : 'string'},
		checkoutDate: "string"
	}
}

const style = StyleSheet.create({
	container: {
		flex: 1,
	},
	sectionContainer: {
		marginTop: 32,
		paddingHorizontal: 24
	},
	sectionTitle: {
		fontSize: 35,
		fontWeight: '600',
		height: 50
	},
	sectionDescription: {
		marginTop: 8,
		fontSize: 18,
		fontWeight: '400',
	},
	highlight: {
		fontWeight: '700',
	},
	confirmButton: {
		backgroundColor: '#00f5f5',
		fontSize: 65,
		height: 150,
		borderRadius: 25,
		width: 200,
		height: 50,
		alignSelf: 'center',
		margin: 20
	},
	cameraView: {
		borderWidth: 2,
		height: 350,
		aspectRatio: 1,
		alignSelf: 'center',
		transform: [{translateY: '100%'}],
		borderRadius: 27,
		overflow: 'hidden'
	},
	cameraContent: {
		backgroundColor: '#353535',
		height: 300,
		aspectRatio: 1,
		alignSelf: 'center',
		transform: [{translateY: 23}],
		borderRadius: 10,
		overflow: 'hidden'
	},
	card: {
		padding:0,
		backgroundColor:"#ff8800",
		position: 'absolute',
		top: 0,
		zIndex:99,
		elevation:5,
		width: '100%',
		height: '100%'
	}
});

const popupStyle = StyleSheet.create({
	bg: {
		backgroundColor: "#000000",
		opacity: 0.5,
	},
	popup: {
		position: 'absolute',
		width: 400,
		height: 200,
		borderRadius: 10,
		alignSelf: 'center'
	}
})

export class ScanVC extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			checkOut: false,
			checkIn: false
		};
	}
	
	componentDidMount() {
		this.state = {
			checkOut: false,
			checkIn: false
		};
	}

	onBarCodeRead(scanResult) {
		const regEx = /[0-9]{2}[A-Z][A-Z0-9]\-[0-9]{3}([0-9]|(\.|\-)[0-9]{2})/

		if (!this.state.checkOut && !this.state.checkIn) {
			const plate = scanResult.data.match(regEx)

			if (plate) {
				this.setState({checkOut: true})
				
				Alert.alert("Checkout", scanResult.data, 
				[
					{ 	
						text: "Cancel", 
						onPress: () => {
							this.setState({checkOut: false})
						},
						style: "cancel"
					},
					{ 	
						text: "OK", 
						onPress: () => {
							this.setState({checkOut: false})
							this.processCheckout(scanResult.data)
						}
					}
				])
			}
		}
	}

	onTextRecognized(text) {
		const regEx = /[0-9]{2}\-?[A-Z][A-Z0-9]?\n[0-9]{3}([0-9]|(\.|\-)[0-9]{2})/

		if (!this.state.checkIn && !this.state.checkOut) {
			const block = text.textBlocks.map(e => e.value)

			if (block.length > 0) {
				const data = block.join("")
				const plate = data.match(regEx)

				if (plate) {
					this.setState({checkIn: true})
					const plateStr = plate[0].replace("-","").replace("\n","-")
					
					Alert.alert("Checkin", plateStr, 
					[
						{
							text: "Cancel",
							onPress: () => {
								this.setState({checkIn: false})
							},
							style: "cancel"
						},
						{ 
							text: "OK", 
							onPress: () => {
								this.setState({checkIn: false})
								this.processCheckin(plateStr)
							}
						}
					])
				}
			}
		}
	}
	
	render() {
		data = this.props.data

		const view =  (
			<SafeAreaView style={{ flex: 1 , backgroundColor: "#323232"}}>
				<Header title="Scan plate or QR ticket" bgColor="#323232" titleColor="#ffffff"></Header>
				<View style={[{height: '100%', backgroundColor: "#121212"}]}>
					<View style={[
						style.cameraView,
						{borderColor: (this.state.checkIn||this.state.checkOut) ? "#17db3c" : "#ffc500"}
					]}>
						<View style={style.cameraContent}>
							<RNCamera 
								ref = {(cam)=>this.camera = cam}
								
								captureAudio={false} 
								ref={ref => {
									this.camera = ref;
								}}
								defaultTouchToFocus
								style={[{flex: 1, borderRadius: 10, zIndex: 3}]}
								onBarCodeRead={this.onBarCodeRead.bind(this)}

								onTextRecognized={this.onTextRecognized.bind(this)}
							>
							</RNCamera>
						</View>
					</View>

				</View>
					
			</SafeAreaView>
		)

		return view
	}

	async processCheckin(plate) {
		const realm = await Realm.open({
			schema: [PlateData],
		})

		realm.write(() => {
			realm.create("Plate", {
				id: 1950,
				plateId: plate,
				code: "234fsdhjfsdfsak23k4jsdakchjas",
				checkinDate: Date().toString(),
				checkoutDate: "",
			});
		});
	}

	async processCheckout(plate) {
		const realm = await Realm.open({
			schema: [PlateData],
		})

		const obj = realm.objects("Plate").filtered(`plateId == \"${plate}\"`)
		realm.write(() => {
			realm.delete(obj)
		})
	}
}


// 