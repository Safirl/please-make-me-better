import Button from "@/ui/Button"
import { View, Text } from "react-native"

const EndingPage = () => {
    return (
    <View>
        <View>
            {/* SVG */}
            <View>
                <Text>Compte rendu</Text>
                <Text></Text>
                <Text>L’état général du client n’est pas compatible avec sa demande. Le dossier ne peut être considéré comme clos.</Text>
            </View>
        </View>
        <View>
            <Text>
                //ERREUR//
            </Text>
            <View>
                <View>
                    1
                </View>
                <View>
                    2
                </View>
                <View>
                    3
                </View>
            </View>
            <Text>Tentatives restantes</Text>
            <Button label="Rééssayez" type="primary" overridePadding={24}></Button>
        </View>
    </View>
    )
}