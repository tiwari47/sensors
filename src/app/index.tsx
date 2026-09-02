import { useMagnetometer } from "@/hooks/use-megnetometer";
import React from "react";
import { Dimensions, SafeAreaView, StyleSheet, Text, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
  

const { width } = Dimensions.get("window");
const COMPASS_SIZE = width * 0.85;

const Index = () => {
  const { available, x, y, z, heading } = useMagnetometer();

  const rotation = useSharedValue(0);

  React.useEffect(() => {
    rotation.value = withTiming(-heading, {
      duration: 100,
    });
  }, [heading]);

  const animatedCompassStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotate: `${rotation.value}deg`,
        },
      ],
    };
  });

  if (available === null) {
    return (
      <View style={styles.center}>
        <Text style={styles.loading}>Checking Magnetometer...</Text>
      </View>
    );
  }

  if (!available) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>
          ❌ Magnetometer is not available on this device
        </Text>
      </View>
    );
  }

  const direction = getDirection(heading);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}

      <View style={styles.header}>
        <Text style={styles.title}>Compass</Text>
        <Text style={styles.subtitle}>Magnetometer Sensor</Text>
      </View>

      {/* Direction */}

      <View style={styles.directionContainer}>
        <Text style={styles.direction}>{direction}</Text>

        <Text style={styles.degree}>{Math.round(heading)}°</Text>
      </View>

      {/* Compass */}

      <View style={styles.compassContainer}>
        <Animated.View style={[styles.compass, animatedCompassStyle]}>
          {/* North */}

          <Text style={[styles.marker, styles.north]}>N</Text>

          {/* East */}

          <Text style={[styles.marker, styles.east]}>E</Text>

          {/* South */}

          <Text style={[styles.marker, styles.south]}>S</Text>

          {/* West */}

          <Text style={[styles.marker, styles.west]}>W</Text>

          {/* Degree lines */}

          {Array.from({ length: 36 }).map((_, index) => (
            <View
              key={index}
              style={[
                styles.tick,
                {
                  transform: [
                    {
                      rotate: `${index * 10}deg`,
                    },
                    {
                      translateY: -COMPASS_SIZE / 2 + 15,
                    },
                  ],
                },
              ]}
            />
          ))}
        </Animated.View>

        {/* Fixed Needle */}

        <View style={styles.needleContainer}>
          <View style={styles.needleNorth} />

          <View style={styles.needleSouth} />

          <View style={styles.needleCenter} />
        </View>
      </View>

      {/* Sensor Data */}

      <View style={styles.sensorCard}>
        <Text style={styles.sensorTitle}>Magnetic Field</Text>

        <View style={styles.sensorRow}>
          <SensorItem label="X" value={x} />
          <SensorItem label="Y" value={y} />
          <SensorItem label="Z" value={z} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Index;

/* -------------------------------- */
/* SENSOR ITEM */
/* -------------------------------- */

const SensorItem = ({ label, value }: { label: string; value: number }) => {
  return (
    <View style={styles.sensorItem}>
      <Text style={styles.sensorLabel}>{label}</Text>

      <Text style={styles.sensorValue}>{value.toFixed(2)}</Text>
    </View>
  );
};

/* -------------------------------- */
/* GET DIRECTION */
/* -------------------------------- */

function getDirection(heading: number) {
  if (heading >= 337.5 || heading < 22.5) return "N";
  if (heading >= 22.5 && heading < 67.5) return "NE";
  if (heading >= 67.5 && heading < 112.5) return "E";
  if (heading >= 112.5 && heading < 157.5) return "SE";
  if (heading >= 157.5 && heading < 202.5) return "S";
  if (heading >= 202.5 && heading < 247.5) return "SW";
  if (heading >= 247.5 && heading < 292.5) return "W";
  return "NW";
}

/* -------------------------------- */
/* STYLES */
/* -------------------------------- */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111827",
    alignItems: "center",
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#111827",
    padding: 20,
  },

  loading: {
    color: "#FFFFFF",
    fontSize: 18,
  },

  error: {
    color: "#EF4444",
    fontSize: 18,
    textAlign: "center",
  },

  header: {
    marginTop: 30,
    alignItems: "center",
  },

  title: {
    color: "#FFFFFF",
    fontSize: 30,
    fontWeight: "700",
  },

  subtitle: {
    color: "#9CA3AF",
    fontSize: 14,
    marginTop: 5,
  },

  directionContainer: {
    alignItems: "center",
    marginVertical: 35,
  },

  direction: {
    color: "#FFFFFF",
    fontSize: 55,
    fontWeight: "800",
  },

  degree: {
    color: "#9CA3AF",
    fontSize: 22,
    marginTop: 5,
  },

  compassContainer: {
    width: COMPASS_SIZE,
    height: COMPASS_SIZE,
    justifyContent: "center",
    alignItems: "center",
  },

  compass: {
    width: COMPASS_SIZE,
    height: COMPASS_SIZE,
    borderRadius: COMPASS_SIZE / 2,
    borderWidth: 3,
    borderColor: "#374151",
    position: "absolute",
  },

  marker: {
    position: "absolute",
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "700",
  },

  north: {
    top: 15,
    alignSelf: "center",
    color: "#EF4444",
  },

  east: {
    right: 18,
    top: "47%",
  },

  south: {
    bottom: 15,
    alignSelf: "center",
  },

  west: {
    left: 18,
    top: "47%",
  },

  tick: {
    width: 2,
    height: 10,
    backgroundColor: "#6B7280",
    position: "absolute",
    alignSelf: "center",
    top: COMPASS_SIZE / 2 - 5,
  },

  needleContainer: {
    position: "absolute",
    width: 30,
    height: 150,
    alignItems: "center",
    justifyContent: "center",
  },

  needleNorth: {
    width: 6,
    height: 65,
    backgroundColor: "#EF4444",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },

  needleSouth: {
    width: 6,
    height: 65,
    backgroundColor: "#FFFFFF",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },

  needleCenter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#111827",
    borderWidth: 4,
    borderColor: "#FFFFFF",
    position: "absolute",
  },

  sensorCard: {
    width: "90%",
    backgroundColor: "#1F2937",
    borderRadius: 20,
    padding: 20,
    marginTop: 35,
  },

  sensorTitle: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 20,
    textAlign: "center",
  },

  sensorRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  sensorItem: {
    alignItems: "center",
    flex: 1,
  },

  sensorLabel: {
    color: "#9CA3AF",
    fontSize: 14,
    marginBottom: 8,
  },

  sensorValue: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
});
