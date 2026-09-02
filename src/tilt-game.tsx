import { useAccelerometer } from "@/hooks/use-accelerometer";
import { StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const BALL_SIZE = 40;
const MOVE = 100;

export function TiltGame() {
  const inserts = useSafeAreaInsets();
  const { available, x, y, z } = useAccelerometer();

  return (
    <View style={[styles.screen, { paddingTop: inserts.top + 12 }]}>
      <Text style={styles.title}>Tilt the ball</Text>
      <Text style={styles.subtitle}>
        Tilt the phone. Watch x and y change. The ball follows a and y.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#0b1220",
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  title: {
    color: "#f8fafc",
    fontSize: 14,
    marginTop: 6,
    lineHeight: 20,
  },
  subtitle: {
    color: "#94a3b8",
    fontSize: 14,
    marginTop: 6,
    lineHeight: 20,
  },
  sensorBox: {
    marginTop: 16,
    padding: 14,
    borderRadius: 12,
    backgroundColor: "#1e293b",
  },
});
