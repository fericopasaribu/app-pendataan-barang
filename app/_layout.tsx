import { Colors } from "@/constants/Colors";
import * as Font from "expo-font";
import { Stack } from "expo-router";
import React, { useEffect, useState } from "react";
import { DefaultTheme, PaperProvider } from "react-native-paper";

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,

    // --- Utama ---
    primary: "transparent", // Warna fokus: kursor, label saat aktif
    // background: Colors.background,       // Latar belakang umum
    // surface: Colors.surface,             // Background card, input, dialog, dsb
    // text: Colors.text,                   // Warna teks utama
    placeholder: Colors.placeholder, // Placeholder di TextInput

    // --- Input & Border ---
    // outline: Colors.outline,             // Border TextInput mode="outlined"
    // onSurfaceVariant: Colors.text,       // Warna teks isi input
    // error: Colors.error,                 // Warna merah untuk error

    // --- Tambahan opsional ---
    // secondary: Colors.secondary,         // Untuk tombol atau aksen tambahan
    // onBackground: Colors.text,           // Teks di atas background
    // onSurface: Colors.text,              // Teks di atas surface
  },
};

export default function RootLayout() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const load = async () => {
      await Font.loadAsync({
        inter: require("@/assets/fonts/inter.ttf"),
        poppins: require("@/assets/fonts/poppins.ttf"),
      });
      setLoaded(true);
    };

    load();
  }, []);

  if (!loaded) return;

  return (
    <PaperProvider theme={theme}>
      <Stack
        screenOptions={{
          headerShown: false,
          animation: "none",
        }}
      />
    </PaperProvider>
  );
}
