import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  FlatList,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const popularStocks = [
  { symbol: "RELIANCE", name: "Reliance Industries" },
  { symbol: "TCS", name: "Tata Consultancy" },
  { symbol: "HDFCBANK", name: "HDFC Bank" },
  { symbol: "INFY", name: "Infosys" },
  { symbol: "ICICIBANK", name: "ICICI Bank" },
    { symbol: "AXISBANK", name: "AXIS Bank" },
     { symbol: "TATAPOWER", name: "TATAPOWER" },
];

export default function HomeScreen() {
  const router = useRouter();
  const [stock, setStock] = useState("");

  const goToDetails = (symbol: string) => {
    if (!symbol) return;
    router.push(`/stock/${symbol.toUpperCase()}`);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>📊 Stock AI Analyst</Text>

        <Text style={styles.subtitle}>Search Stock</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Stock Symbol (e.g., RELIANCE)"
          value={stock}
          onChangeText={setStock}
          placeholderTextColor="#999"
        />
        <TouchableOpacity
          style={[
            styles.analyzeButton,
            { opacity: stock ? 1 : 0.5 },
          ]}
          onPress={() => goToDetails(stock)}
          disabled={!stock}
        >
          <Text style={styles.analyzeButtonText}>Analyze</Text>
        </TouchableOpacity>

        <Text style={styles.subtitle}>🔥 Popular Stocks</Text>
        <FlatList
          data={popularStocks}
          keyExtractor={(item) => item.symbol}
          contentContainerStyle={styles.listContainer}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.stockCard}
              onPress={() => goToDetails(item.symbol)}
            >
              <Text style={styles.stockSymbol}>{item.symbol}</Text>
              <Text style={styles.stockName}>{item.name}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f9f9f9",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#444",
    marginVertical: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    fontSize: 16,
    color: "#333",
  },
  analyzeButton: {
    backgroundColor: "#007AFF",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 20,
  },
  analyzeButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  listContainer: {
    paddingBottom: 20,
  },
  stockCard: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginVertical: 6,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  stockSymbol: {
    fontSize: 18,
    fontWeight: "700",
    color: "#007AFF",
  },
  stockName: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
});