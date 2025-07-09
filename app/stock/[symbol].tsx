import axios from "axios";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Alert, Button, Image, ScrollView, StyleSheet, Text, View } from "react-native";
import Markdown from 'react-native-markdown-display';
import { API_BASE_URL } from "../../constants/Config";



export default function StockDetail() {
  const { symbol } = useLocalSearchParams<{ symbol: string }>();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStock = async () => {
    setLoading(true);
    setError(null);
    try {
  const res = await axios.get(`${API_BASE_URL}/analyze?stock=${symbol}`);
      if (res.status === 200 && res.data) {
        setData(res.data);
      } else {
        setError("❌ API returned no data");
      }
    } catch (err) {
      console.error(err);
      setError("⚠️ Network error: Unable to fetch stock data.");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchStock();
  }, [symbol]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Loading {symbol}...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>{error}</Text>
        <Button title="Retry" onPress={fetchStock} />
      </View>
    );
  }

  if (!data) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>No data found for {symbol}</Text>
        <Button title="Go Back" onPress={() => Alert.alert("Use back button to return")} />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{symbol} - {data.verdict?.split("\n")[0] ?? "No verdict"}</Text>
      {data.chart ? (
        <Image source={{ uri: data.chart }} style={styles.chart} resizeMode="contain" />
      ) : (
        <Text style={styles.errorText}>Chart not available</Text>
      )}
      <Text style={styles.sectionTitle}>Verdict</Text>
    <Markdown>{data.verdict}</Markdown>
      <Text style={styles.sectionTitle}>News</Text>
      {data.news.length > 0 ? (
        data.news.map((n: any, idx: number) => (
          <View key={idx} style={styles.newsItem}>
            <Text style={styles.newsTitle}>{n.title}</Text>
            <Text>{n.description}</Text>
          </View>
        ))
      ) : (
        <Text style={styles.text}>No news found for {symbol}</Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  center: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", margin: 10, color: "#333" },
  chart: { width: "100%", height: 300, backgroundColor: "#f0f0f0", borderRadius: 8 },
  sectionTitle: { fontSize: 20, fontWeight: "600", margin: 10, color: "#007AFF" },
  text: { marginHorizontal: 10, marginBottom: 5, fontSize: 16, color: "#555" },
  newsItem: { margin: 10, padding: 10, backgroundColor: "#f5f5f5", borderRadius: 8 },
  newsTitle: { fontWeight: "bold", marginBottom: 4, color: "#000" },
  errorText: { color: "red", fontSize: 16, textAlign: "center", marginVertical: 10 },
  loadingText: { fontSize: 16, marginTop: 10, color: "#555" },
});
