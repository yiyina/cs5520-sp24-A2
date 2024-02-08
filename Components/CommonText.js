import { Text, StyleSheet } from 'react-native';
import { color, spacing } from './StyleHelper';

/**
 * Render the CommonText component with text property.
 * 
 * @param {object} props - text property
 * @param {string} props.text - text to display
 * @returns {JSX.Element} - CommonText component
 */
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