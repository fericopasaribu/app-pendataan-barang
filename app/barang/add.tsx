import LeftButton from "@/components/custom/LeftButton";
import LoadingIndicator from "@/components/custom/LoadingIndicator";
import Page from "@/components/custom/Page";
import RightButton from "@/components/custom/RightButton";
import {
  filterForCode,
  filterForNumber,
  filterForTextPlus,
  formatThousand,
} from "@/components/custom/Script";
import { Style } from "@/components/custom/Style";
import TextError from "@/components/custom/TextError";
import TextInputFlat from "@/components/custom/TextInputFlat";
import TextLabel from "@/components/custom/TextLabel";
import Toast from "@/components/custom/Toast";
import { Colors } from "@/constants/Colors";
import { Strings } from "@/constants/Strings";
import axios from "axios";
import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import {
  Image,
  Keyboard,
  Pressable,
  RefreshControl,
  ScrollView,
  Text,
  View,
} from "react-native";
import { Divider } from "react-native-paper";

export default function BarangAdd() {
  const [form, setForm] = useState({
    kode: "",
    nama: "",
    hargaRaw: "",
    hargaDisplay: "",
  });

  const [error, setError] = useState({
    kode: false,
    nama: false,
    harga: false,
  });

  const [focus, setFocus] = useState({
    kode: false,
    nama: false,
    harga: false,
  });

  const [imageUri, setImageUri] = useState<string | null>(null);

  const [refreshing, setRefreshing] = useState(false);

  const [loadingSave, setLoadingSave] = useState(false);

  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarError, setSnackbarError] = useState(0);

  const setRefresh = async () => {
    setRefreshing(true);

    try {
      setForm({ ...form, kode: "", nama: "", hargaRaw: "", hargaDisplay: "" });
      setError({ ...error, kode: false, nama: false, harga: false });
      setImageUri("");
      Keyboard.dismiss();
    } finally {
      setFocus({ ...error, kode: false, nama: false, harga: false });
      setRefreshing(false);
    }
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      quality: 1,
    });

    if (!result.canceled) {
      const pickedUri = result.assets[0].uri;
      setImageUri(pickedUri); // hanya diset ke state, belum disimpan
    }
  };

  const saveData = async () => {
    const errorTemp = { ...error };

    !form.kode ? (errorTemp.kode = true) : (errorTemp.kode = false);
    !form.nama ? (errorTemp.nama = true) : (errorTemp.nama = false);
    !form.hargaRaw ? (errorTemp.harga = true) : (errorTemp.harga = false);

    setError(errorTemp);

    if (form.kode && form.nama && form.hargaRaw) {
      setLoadingSave(true);

      const formData = new FormData();
      formData.append("kode", form.kode);
      formData.append("nama", form.nama);
      formData.append("harga", String(form.hargaRaw));

      if (imageUri) {
        const photo = {
          uri: imageUri,
          name: "photo.jpg",
          type: "image/jpeg",
        };

        formData.append("foto", photo as any);
      }

      try {
        const response = await axios.post(Strings.API.barang, formData, {
          validateStatus: () => true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        const result = response.data.meta_data;

        setSnackbarMessage(result.message);
        setSnackbarError(result.success ? 0 : 1);

        if (result.success) {
          setRefresh();
        }
      } finally {
        setLoadingSave(false);
        setSnackbarVisible(true);
      }
    }
  };

  return (
    <Page>
      <View style={Style.header_area}>
        <LeftButton />
        <RightButton onPress={saveData} />
        <Text style={Style.header_text}>{Strings.title.add}</Text>
      </View>
      <Divider style={Style.divider} />

      {loadingSave && <LoadingIndicator size={48} />}

      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={setRefresh}
            colors={[Colors.blue]}
            progressBackgroundColor={Colors.white}
          />
        }>
        <View style={Style.image_area}>
          <Pressable onPress={pickImage}>
            <Image
              source={
                imageUri
                  ? { uri: imageUri }
                  : require(`@/assets/images/noimage.png`)
              }
              style={Style.image_circle}
            />
          </Pressable>
        </View>

        <View style={[Style.element_area, { marginTop: 0 }]}>
          <TextLabel title={`${Strings.text.kode}`} required></TextLabel>
          <View
            style={{
              borderBottomWidth: 1,
              borderBottomColor: error.kode ? Colors.red : Colors.gray,
            }}>
            <TextInputFlat
              value={form.kode}
              onChangeText={(text: any) => {
                const result = filterForCode(text);
                setForm({ ...form, kode: result });
              }}
              onFocus={() => setFocus({ ...focus, kode: true })}
              onBlur={() => setFocus({ ...focus, kode: false })}
              maxLength={20}
            />
          </View>
          {error.kode && (
            <TextError
              message={`${Strings.text.kode} ${Strings.message.text_empty}`}
            />
          )}
        </View>

        <View style={Style.element_area}>
          <TextLabel title={`${Strings.text.nama}`} required></TextLabel>
          <View
            style={{
              borderBottomWidth: 1,
              borderBottomColor: error.nama ? Colors.red : Colors.gray,
            }}>
            <TextInputFlat
              value={form.nama}
              onChangeText={(text: any) => {
                const result = filterForTextPlus(text);
                setForm({ ...form, nama: result });
              }}
              onFocus={() => setFocus({ ...focus, nama: true })}
              onBlur={() => setFocus({ ...focus, nama: false })}
              maxLength={100}
            />
          </View>
          {error.nama && (
            <TextError
              message={`${Strings.text.nama} ${Strings.message.text_empty}`}
            />
          )}
        </View>

        <View style={Style.element_area}>
          <TextLabel title={`${Strings.text.harga} (Rp)`} required></TextLabel>
          <View
            style={{
              borderBottomWidth: 1,
              borderBottomColor: error.harga ? Colors.red : Colors.gray,
            }}>
            <TextInputFlat
              value={form.hargaDisplay}
              onChangeText={(text: any) => {
                const raw = filterForNumber(text);
                const display = formatThousand(text);
                setForm({ ...form, hargaRaw: raw, hargaDisplay: display });
              }}
              onFocus={() => setFocus({ ...focus, harga: true })}
              onBlur={() => setFocus({ ...focus, harga: false })}
              maxLength={11}
              keyboardType="numeric"
            />
          </View>
          {error.harga && (
            <TextError
              message={`${Strings.text.harga} ${Strings.message.text_empty}`}
            />
          )}
        </View>
      </ScrollView>

      <View>
        <Toast
          visible={snackbarVisible}
          isError={snackbarError == 1}
          message={snackbarMessage}
          onDismiss={() => setSnackbarVisible(false)}
        />
      </View>
    </Page>
  );
}
