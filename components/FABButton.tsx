import { FAB } from "react-native-paper";
import { StyleSheet } from "react-native";
import { Link } from "expo-router";

export const FABButton = () => {
  return (
    <Link href="/todo/addtodo" asChild>
      <FAB icon="plus" style={styles.fab} />
    </Link>
  );
};

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
