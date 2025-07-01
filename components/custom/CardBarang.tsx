// import { Colors } from "@/constants/Colors";
// import { Strings } from "@/constants/Strings";
// import { formatNumber } from "@/custom/Script";
// import { Style } from "@/custom/Style";
// import axios from "axios";
// import React, { useState } from "react";
// import { Image, View } from "react-native";
// import {
//   ActivityIndicator,
//   Button,
//   Card,
//   Dialog,
//   IconButton,
//   List,
//   Portal,
//   Snackbar,
//   Text,
// } from "react-native-paper";

// type Barang = {
//   id: number;
//   kode: string;
//   nama: string;
//   harga: number;
//   foto: string;
// };

// export default function CardBarang({ item }: { item: Barang }) {
//   const [kode, setKode] = useState("");

//   const [dialogVisible, setDialogVisible] = useState(false);
//   const [textDialog, setTextDialog] = useState<React.ReactNode>(null);

//   const [imageError, setImageError] = useState(false);

//   const [snackbarVisible, setSnackbarVisible] = useState(false);
//   const [snackbarMessage, setSnackbarMessage] = useState("");
//   const [snackbarError, setSnackbarError] = useState(0);

//   const [loadingDelete, setLoadingDelete] = useState(false);

//   const showDeleteDialog = (kode: string, nama: string) => {
//     setKode(kode);
//     setDialogVisible(true);
//     setTextDialog(
//       <Text>
//         Data Barang: <Text style={{ fontWeight: "bold" }}>{nama}</Text> Ingin
//         Dihapus?
//       </Text>
//     );
//   };

//   // const deleteData = async () => {
//   //   const response = await axios.delete(`${Strings.API.barang}/${kode}`);
//   //   const result = response.data.meta_data;

//   //   if (result.success) {
//   //     await getDataBarang();
//   //   }

//   //   setDialogVisible(false);
//   //   setSnackbarVisible(true);
//   //   setSnackbarMessage(result.message);
//   //   setSnackbarError(result.success ? 0 : 1);
//   // };

//   const deleteData = async () => {
//     setLoadingDelete(true); // Mulai loading

//     try {
//       const response = await axios.delete(`${Strings.API.barang}/${kode}`);
//       const result = response.data.meta_data;

//       // if (result.success) {
//       //   await getDataBarang();
//       // }

//       setSnackbarMessage(result.message);
//       setSnackbarError(result.success ? 0 : 1);
//     // } catch (error) {
//     //   setSnackbarMessage("Terjadi kesalahan saat menghapus data.");
//     //   setSnackbarError(1);
//     } finally {
//       setLoadingDelete(false); // Selesai loading
//       setDialogVisible(false);
//       setSnackbarVisible(true);
//     }
//   };

//   return (
//     <Card style={Style.card}>
//       <View style={Style.card_icon_area}>
//         <Image
//           source={
//             item.foto && !imageError
//               ? { uri: `${Strings.uploads}/${item.foto}` }
//               : require(`@/assets/images/noimage.png`)
//           }
//           onError={() => {
//             setImageError(true);
//           }}
//           style={Style.card_icon_circle}
//         />

//         <View style={Style.card_item}>
//           <Text style={Style.card_item_name}>{item.nama}</Text>
//           <Text style={Style.card_item_code}>{item.kode}</Text>
//           <Text style={Style.card_item_price}>
//             Rp {formatNumber(item.harga)}
//           </Text>
//         </View>

//         <View style={Style.card_button}>
//           <IconButton
//             icon="pencil"
//             iconColor={Colors.black}
//             // size={24}
//             // onPress={() => router.push(`/edit/${item.id}`)}
//             style={Style.card_button_item}
//           />
//           <IconButton
//             icon="delete"
//             iconColor={Colors.red}
//             onPress={() => showDeleteDialog(item.kode, item.nama)}
//             style={Style.card_button_item}
//           />
//         </View>
//       </View>

//       <Portal>
//         <Dialog visible={dialogVisible} style={Style.dialog_area}>
//           <Dialog.Content>
//             {loadingDelete ? (
//               <View style={{ alignItems: "center", paddingVertical: 20 }}>
//                 <ActivityIndicator size={32} color={Colors.blue} />
//                 <Text style={{ marginTop: 10 }}>Menghapus data...</Text>
//               </View>
//             ) : (
//               <>
//                 <View style={Style.dialog_content}>
//                   <List.Icon icon="information" color={Colors.blue} />
//                   <Text style={Style.dialog_title}>{Strings.title.info}</Text>
//                 </View>

//                 <Text style={Style.dialog_text}>{textDialog}</Text>
//               </>
//             )}
//           </Dialog.Content>

//           <Dialog.Actions>
//             <Button
//               rippleColor={Colors.ripple_red}
//               labelStyle={Style.dialog_button_primary}
//               contentStyle={Style.dialog_button}
//               onPress={deleteData}
//               loading={loadingDelete}
//               disabled={loadingDelete}>
//               Ya
//             </Button>
//             <Button
//               rippleColor={Colors.ripple_black}
//               labelStyle={Style.dialog_button_secondary}
//               contentStyle={Style.dialog_button}
//               onPress={() => setDialogVisible(false)}>
//               Tidak
//             </Button>
//           </Dialog.Actions>
//         </Dialog>

//         <Snackbar
//           visible={snackbarVisible}
//           onDismiss={() => setSnackbarVisible(false)}
//           duration={1000}
//           style={[
//             Style.snackbar,
//             snackbarError == 0
//               ? { backgroundColor: Colors.black }
//               : { backgroundColor: Colors.red },
//           ]}>
//           <Text style={Style.snackbar_text}>{snackbarMessage}</Text>
//         </Snackbar>
//       </Portal>
//     </Card>
//   );
// }
