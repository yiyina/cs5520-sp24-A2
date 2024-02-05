import { Text, StyleSheet } from 'react-native';
import { color, spacing } from './StyleHelper';

export default CommonText = ({ text }) => {
    return (
        <Text style={styles.text}>{text}</Text>
    )
}

const styles = StyleSheet.create({
    text: {
        color: color.text,
        fontWeight: 'bold',
        marginBottom: spacing.small,
    }
})