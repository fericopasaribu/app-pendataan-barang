import LoadingIndicator from "@/components/custom/LoadingIndicator";
import Page from "@/components/custom/Page";
import { formatNumber } from "@/components/custom/Script";
import { Style } from "@/components/custom/Style";
import Toast from "@/components/custom/Toast";
import { Colors } from "@/constants/Colors";
import { Strings } from "@/constants/Strings";
import axios from "axios";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { FlatList, Image, Keyboard, RefreshControl, View } from "react-native";
import {
  Button,
  Dialog,
  Divider,
  FAB,
  IconButton,
  List,
  Portal,
  Text,
  TextInput,
} from "react-native-paper";

export default function BarangView() {
  // const [data, setData] = useState<any[]>([]);
  const [data, setData] = useState<
    { id: string; kode: string; nama: string; harga: number; foto: string }[]
  >([]);

  const [searchData, setSearchData] = useState("");
  // const [filterData, setFilterData] = useState<
  //   { id: number; kode: string; nama: string; harga: number; foto: string }[]
  // >([]);
  const [filterData, setFilterData] = useState<typeof data>([]);

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const [id, setId] = useState("");

  const [imageError, setImageError] = useState<{ [id: string]: boolean }>({});

  const [dialogVisible, setDialogVisible] = useState(false);
  const [textDialog, setTextDialog] = useState<React.ReactNode>(null);

  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarError, setSnackbarError] = useState(0);

  const [loadingDelete, setLoadingDelete] = useState(false);

  // useEffect(() => {
  //   getData();
  // }, []);

  // useFocusEffect(
  //   useCallback(() => {
  //     getData();
  //   }, [])
  // );

  useEffect(() => {
    getData();

    const keyword = searchData.toLowerCase().trim();
    const keywordCleanSpace = keyword.replace(/\s+/g, "");

    if (keyword === "") {
      setFilterData(data);
    } else {
      const filtered = data.filter((item) => {
        const kode = item.kode.toLowerCase(); // tidak abaikan spasi
        const nama = item.nama.replace(/\s+/g, "").toLowerCase(); // abaikan spasi
        const harga = String(item.harga).toLowerCase(); // abaikan spasi

        return (
          kode.includes(keyword) ||
          nama.includes(keywordCleanSpace) ||
          harga.includes(keyword)
        );
      });

      setFilterData(filtered);
    }
  }, [searchData, data]);

  const setRefresh = async () => {
    setRefreshing(true);
    setSearchData("");
    Keyboard.dismiss();

    try {
      await getData();
    } finally {
      setRefreshing(false);
    }
  };

  const getData = async () => {
    try {
      const response = await axios.get(Strings.API.barang);
      setData(response.data.result);
      setFilterData(response.data.result);
    } finally {
      setLoading(false);
    }
  };

  const showDeleteDialog = (id: string, nama: string) => {
    setId(id);
    setDialogVisible(true);
    setTextDialog(
      <Text>
        Data Barang: <Text style={Style.dialog_text_bold}>{nama}</Text>
        {` ${Strings.message.delete_confirm}`}
      </Text>
    );
  };

  const deleteData = async () => {
    setDialogVisible(false);
    setLoadingDelete(true);

    try {
      const response = await axios.delete(`${Strings.API.barang}/${id}`);
      const result = response.data.meta_data;

      if (result.success) {
        await getData();
      }

      setSnackbarMessage(result.message);
      setSnackbarError(result.success ? 0 : 1);
    } finally {
      setLoadingDelete(false);
      setSnackbarVisible(true);
    }
  };

  return (
    <Page>
      <View style={Style.header_area}>
        <Text style={Style.header_text}>{Strings.title.view}</Text>
      </View>
      <Divider style={Style.divider} />

      {loading && <LoadingIndicator size={48} />}

      <View style={Style.element_area}>
        <View>
          <TextInput
            mode="outlined"
            placeholder={Strings.text.cari}
            value={searchData}
            onChangeText={setSearchData}
            style={Style.element_background}
            right={<TextInput.Icon icon="magnify" />}
            outlineStyle={Style.element_border}
            cursorColor={Colors.gray}
          />
        </View>
      </View>

      {loadingDelete && <LoadingIndicator size={48} />}

      <FlatList
        data={filterData}
        keyExtractor={(item) => item.id.toString()}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={setRefresh}
            colors={[Colors.blue]}
            progressBackgroundColor={Colors.white}
          />
        }
        // renderItem={({ item }) => <CardBarang item={item} />}
        renderItem={({ item }) => (
          <View>
            <List.Item
              title={() => (
                <Text
                  style={Style.list_item_name}
                  numberOfLines={1}
                  ellipsizeMode="tail">
                  {item.nama}
                </Text>
              )}
              description={() => (
                <View>
                  <Text style={Style.list_item_code}>{item.kode}</Text>
                  <Text style={Style.list_item_price}>
                    Rp {formatNumber(item.harga)}
                  </Text>
                </View>
              )}
              left={() => (
                <View style={Style.list_icon_area}>
                  <Image
                    source={
                      item.foto && !imageError[item.id]
                        ? { uri: `${Strings.uploads}/${item.foto}` }
                        : require(`@/assets/images/noimage.png`)
                    }
                    onError={() => {
                      setImageError((prev) => ({ ...prev, [item.id]: true }));
                    }}
                    style={Style.list_icon_circle}
                  />
                </View>
              )}
              right={() => (
                <View style={Style.list_button}>
                  <IconButton
                    icon="pencil"
                    iconColor={Colors.black}
                    onPress={() => router.push(`/barang/edit/${item.id}`)}
                    style={Style.list_button_left}
                  />
                  <IconButton
                    icon="delete"
                    iconColor={Colors.red}
                    onPress={() => showDeleteDialog(item.id, item.nama)}
                    style={Style.list_button_right}
                  />
                </View>
              )}
              style={Style.list_area}
              onPress={() => router.push(`/barang/detail/${item.id}`)}
            />
            <Divider style={Style.divider} />
          </View>
        )}
      />

      <View>
        <Portal>
          <Dialog visible={dialogVisible} style={Style.dialog_area}>
            <Dialog.Content>
              <View>
                <View style={Style.dialog_content}>
                  <List.Icon icon="information" color={Colors.blue} />
                  <Text style={Style.dialog_title}>{Strings.title.info}</Text>
                </View>

                <Text style={Style.dialog_text}>{textDialog}</Text>
              </View>
            </Dialog.Content>

            <Dialog.Actions>
              <Button
                rippleColor={Colors.ripple_red}
                labelStyle={Style.dialog_button_primary}
                contentStyle={Style.dialog_button}
                onPress={deleteData}>
                Ya
              </Button>
              <Button
                rippleColor={Colors.ripple_black}
                labelStyle={Style.dialog_button_secondary}
                contentStyle={Style.dialog_button}
                onPress={() => setDialogVisible(false)}>
                Tidak
              </Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>

        <View style={Style.fab_area}>
          <FAB
            icon="plus"
            color={Colors.white}
            style={Style.fab_button}
            onPress={() => router.push(`/barang/add`)}
          />
        </View>

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
