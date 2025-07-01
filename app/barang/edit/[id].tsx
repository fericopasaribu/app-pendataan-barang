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
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
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

export default function BarangEdit() {
  const [form, setForm] = useState({
    kode: "",
    nama: "",
    hargaRaw: "",
    hargaDisplay: "",
    foto: "",
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

  const { id } = useLocalSearchParams();

  const [imageUri, setImageUri] = useState<string | null>(null);

  const [refreshing, setRefreshing] = useState(false);

  const [loadingUpdate, setLoadingUpdate] = useState(false);

  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarError, setSnackbarError] = useState(0);

  const [imageError, setImageError] = useState(false);

  const [loading, setLoading] = useState(true);

  const [notFoundVisible, setNotFoundVisible] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await axios.get(`${Strings.API.barang}/${id}`);
      const meta_data = response.data.meta_data;

      if (!meta_data.success) {
        setNotFoundVisible(true);
      } else {
        setNotFoundVisible(false);

        setImageUri("");

        const item = response.data.result;

        setForm({
          kode: item.kode,
          nama: item.nama,
          hargaRaw: item.harga.toString(),
          hargaDisplay: formatThousand(item.harga.toString()),
          foto: item.foto,
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const setRefresh = async () => {
    setRefreshing(true);

    try {
      setError({ ...error, kode: false, nama: false, harga: false });
      getData();
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

  const updateData = async () => {
    const errorTemp = { ...error };

    !form.kode ? (errorTemp.kode = true) : (errorTemp.kode = false);
    !form.nama ? (errorTemp.nama = true) : (errorTemp.nama = false);
    !form.hargaRaw ? (errorTemp.harga = true) : (errorTemp.harga = false);

    setError(errorTemp);

    if (form.kode && form.nama && form.hargaRaw) {
      setLoadingUpdate(true);

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
        const response = await axios.put(
          `${Strings.API.barang}/${id}`,
          formData,
          {
            validateStatus: () => true,
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        const result = response.data.meta_data;

        setSnackbarMessage(result.message);
        setSnackbarError(result.success ? 0 : 1);

        if (result.success) {
          setRefresh();
        }
      } finally {
        setLoadingUpdate(false);
        setSnackbarVisible(true);
      }
    }
  };

  return (
    <Page>
      <View style={Style.header_area}>
        <LeftButton />
        {!notFoundVisible && <RightButton onPress={updateData} />}
        <Text style={Style.header_text}>{Strings.title.edit}</Text>
      </View>
      <Divider style={Style.divider} />

      {loading && <LoadingIndicator size={48} />}

      {loadingUpdate && <LoadingIndicator size={48} />}

      {notFoundVisible ? (
        <View style={Style.image_error_area}>
          <Image
            source={require(`@/assets/images/404.png`)}
            style={Style.image_error_contain}
          />
        </View>
      ) : (
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
                    : form.foto && !imageError
                    ? { uri: `${Strings.uploads}/${form.foto}` }
                    : require(`@/assets/images/noimage.png`)
                }
                onError={() => {
                  setImageError(true);
                }}
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
            <TextLabel
              title={`${Strings.text.harga} (Rp)`}
              required></TextLabel>
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
      )}

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
