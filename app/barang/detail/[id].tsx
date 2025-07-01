import LeftButton from "@/components/custom/LeftButton";
import LoadingIndicator from "@/components/custom/LoadingIndicator";
import Page from "@/components/custom/Page";
import { formatThousand } from "@/components/custom/Script";
import { Style } from "@/components/custom/Style";
import TextInputFlat from "@/components/custom/TextInputFlat";
import TextLabel from "@/components/custom/TextLabel";
import { Colors } from "@/constants/Colors";
import { Strings } from "@/constants/Strings";
import axios from "axios";
// import { Image } from "expo-image";
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
import { Dialog, Divider, IconButton, Portal } from "react-native-paper";

export default function BarangDetail() {
  // ambil id
  const { id } = useLocalSearchParams();

  // const [data, setData] = useState<{
  //   id: number;
  //   kode: string;
  //   nama: string;
  //   harga: number;
  //   foto: string;
  // }>();

  const [form, setForm] = useState({
    kode: "",
    nama: "",
    harga: "",
    foto: "",
  });

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [aspectRatio, setAspectRatio] = useState(0);

  // const [snackbarVisible, setSnackbarVisible] = useState(false);
  // const [snackbarMessage, setSnackbarMessage] = useState("");
  // const [snackbarError, setSnackbarError] = useState(0);

  const [notFoundVisible, setNotFoundVisible] = useState(false);

  useEffect(() => {
    getData();
  }, [form]);

  const getData = async () => {
    try {
      const response = await axios.get(`${Strings.API.barang}/${id}`);
      const meta_data = response.data.meta_data;

      if (!meta_data.success) {
        setNotFoundVisible(true);
      } else {
        setNotFoundVisible(false);

        const item = response.data.result;
        setForm({
          kode: item.kode,
          nama: item.nama,
          harga: item.harga,
          foto: item.foto,
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const setRefresh = async () => {
    setRefreshing(true);
    Keyboard.dismiss();

    try {
      await getData();
    } finally {
      setRefreshing(false);
    }
  };

  const viewImage = () => {
    if (form.foto) {
      Image.getSize(`${Strings.uploads}/${form.foto}`, (width, height) => {
        const ratio = width / height;
        setAspectRatio(ratio);
      });

      setDialogVisible(true);
    }
  };

  return (
    <Page>
      <View style={Style.header_area}>
        <LeftButton />

        <Text style={Style.header_text}>{Strings.title.detail}</Text>
      </View>
      <Divider style={Style.divider} />

      {loading && <LoadingIndicator size={48} />}

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
            <Pressable onPress={viewImage}>
              <Image
                source={
                  form.foto && !imageError
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
            <TextLabel title={`${Strings.text.kode}`}></TextLabel>
            <View
              style={{
                borderBottomWidth: 1,
                borderBottomColor: Colors.gray,
              }}>
              <TextInputFlat value={form.kode} editable={false} />
            </View>
          </View>

          <View style={Style.element_area}>
            <TextLabel title={`${Strings.text.nama}`}></TextLabel>
            <View
              style={{
                borderBottomWidth: 1,
                borderBottomColor: Colors.gray,
              }}>
              <TextInputFlat value={form.nama} editable={false} />
            </View>
          </View>

          <View style={Style.element_area}>
            <TextLabel title={`${Strings.text.harga} (Rp)`}></TextLabel>
            <View
              style={{
                borderBottomWidth: 1,
                borderBottomColor: Colors.gray,
              }}>
              <TextInputFlat
                value={formatThousand(form.harga.toString() || "")}
                editable={false}
              />
            </View>
          </View>
        </ScrollView>
      )}

      <Portal>
        <Dialog
          visible={dialogVisible}
          style={{ backgroundColor: Colors.white }}>
          <Dialog.Content>
            <View style={[Style.photo_area]}>
              <IconButton
                icon="close"
                iconColor={Colors.black}
                size={24}
                onPress={() => setDialogVisible(false)}
                style={Style.modal_close}
              />
              <Image
                resizeMode="contain"
                source={
                  form.foto && !imageError
                    ? { uri: `${Strings.uploads}/${form.foto}` }
                    : require(`@/assets/images/noimage.png`)
                }
                onError={() => {
                  setImageError(true);
                }}
                style={[Style.photo_image, { aspectRatio: aspectRatio }]}
              />
            </View>
          </Dialog.Content>
        </Dialog>
      </Portal>
    </Page>
  );
}
