import { render } from "react-dom";
import { Touchable, TouchableOpacityBase } from "react-native";

export default class ScanScreen extends React.Component{
    constructor(){
        super();
        this.state = {
            hasCameraPermissions: null,
            scanned: false,
            scannedData: '',
            buttonState: 'normal'
        }
    }
}

getCameraPermission() = async () =>{
    const {status} = await Permissions.askAsync(Permissions.CAMERA);

    this.setState({
        hasCameraPermissions: status === "granted"
    });
}

handleBarCodeScanner = async({type, data})=>{
    this.setState({
        scanned: true,
        scannedData: data,
        buttonState: 'normal'
    });
}

render(){
    const hasCameraPermissions = this.state.hasCameraPermissions;
    const scanned = this.state.scanned;
    const buttonState = this.state.buttonState;

    if (buttonState == "clicked" && hasCameraPermissions){
        return(
            <BarCodeScanner
                onBarCodeScaned={scanned ? undefined : this.handleBarCodeScanned}
                style={StyleSheet.absoluteFillObject} />
        )
    }
    else if (buttonState === "normal"){
        return(
            <View style={style.container}>
                <Text style={StyleSheet.displayText}>{
                    hasCameraPermissions ===true ? this.state.scannedDataz: 'Request Camera Permission'
                }</Text>
                <TouchableOpacity
                    onPress={this.getCameraPermission}
                    style={style.scanButton}>
                        <Text style={styles.buttonText}>Scan QR Code</Text>
                    </TouchableOpacity>
            </View>
        );
    }
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alingItems: 'center'
    },
    displayText:{
        flex: 1,
        justifyContent: 'center',
    }
})