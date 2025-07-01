import { Colors } from "@/constants/Colors";
import { StyleSheet } from "react-native";

const text_default = {
    color: Colors.black,
    fontSize: 16,
    fontFamily: "inter",
    // fontWeight: "bold" as "bold"
}

const text_large = {
    color: Colors.black,
    fontSize: 18,
    fontFamily: "inter",
    fontWeight: "bold" as "bold"
}

const text_small = {
    color: Colors.black,
    fontSize: 14,
    fontFamily: "inter"
}

export const Style = StyleSheet.create({
    page: {
        flex: 1,
        backgroundColor: Colors.white,
    },

    safe_area: {
        flex: 1,
    },

    header_area: {
        paddingVertical: 18,
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        backgroundColor: Colors.white,
    },

    header_text: {
        color: Colors.black,
        fontSize: 18,
        fontFamily: "poppins",
    },

    divider: {
        backgroundColor: Colors.inactive,
        height: 1
    },

    element_area: {
        margin: 20
    },

    element_background: {
        backgroundColor: Colors.white,
        color: Colors.black,
    },

    element_border: {
        borderRadius: 10,
        borderColor: Colors.gray
    },

    list_area: {
        paddingEnd: 0,
        paddingBottom: 10
    },

    list_item_name: {
        ...text_large,
    },

    list_item_code: {
        ...text_small,
        marginVertical: 5,

    },

    list_item_price: {
        ...text_default,
        color: Colors.blue,
        fontWeight: "bold"
    },

    list_icon_area: {
        justifyContent: "center",
        paddingStart: 20,
    },

    list_icon_circle: {
        width: 60,
        height: 60,
        borderRadius: 30,
        borderWidth: 1,
        borderColor: Colors.placeholder,
    },

    list_button: {
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center",
        paddingEnd: 5
    },

    list_button_left: {
        marginEnd: 5,
        marginStart: 10
    },

    list_button_right: {
        marginStart: 0
    },

    indicator_area: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: Colors.ripple_loading,
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1,
    },

    dialog_area: {
        backgroundColor: Colors.white,
    },

    dialog_content: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 20,
    },

    dialog_title: {
        ...text_large,
        marginLeft: 8,
    },

    dialog_text: {
        ...text_default,
    },

    dialog_text_bold: {
        ...text_default,
        fontWeight: "bold",
    },

    dialog_button: {
        paddingHorizontal: 5,
    },

    dialog_button_primary: {
        ...text_small,
        color: Colors.red,
        fontWeight: "bold",
    },

    dialog_button_secondary: {
        ...text_small,
        color: Colors.black,
        fontWeight: "bold",
    },

    snackbar: {
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        borderRadius: 10,
    },

    snackbar_text: {
        ...text_small,
        textAlign: "center",
        color: Colors.white,
        fontWeight: "bold",
        lineHeight: 20,
    },

    fab_area: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        alignItems: "center",

    },

    fab_button: {
        backgroundColor: Colors.blue,
        shadowColor: "transparent",
        borderRadius: 30,
        width: 60,
        height: 60,
        justifyContent: "center",
        alignItems: "center",
        elevation: 0,
    },

    left_button: {
        position: "absolute",
        left: 0
    },

    right_button: {
        position: "absolute",
        right: 0
    },

    image_area: {
        alignItems: "center",
        margin: 20
    },

    image_circle: {
        width: 150,
        height: 150,
        borderRadius: 75,
        borderWidth: 2,
        borderColor: Colors.placeholder,
    },

    image_error_area: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },

    image_error_contain: {
        width: "95%",
        resizeMode: "contain"
    },

    text_input_label: {
        ...text_default,
    },

    text_input_item: {
        ...text_default,
        backgroundColor: Colors.white,
        borderBottomColor: Colors.white,
    },

    text_input_padding: {
        paddingStart: 0,
        paddingEnd: 0
    },

    text_error: {
        ...text_small,
        color: Colors.red,
        marginTop: 10,
        marginBottom: 0,
    },

    text_asterisk: {
        ...text_small,
        color: Colors.red,
        fontWeight: "bold",

    },

    photo_area: {
        alignItems: "center",
    },

    photo_image: {
        width: "100%",
        resizeMode: "cover",
        borderWidth: 1,
        borderColor: Colors.placeholder,
    },

    modal_close: {
        position: "absolute",
        right: -15,
        top: -15,
        zIndex: 1,
        backgroundColor: Colors.white,
        borderWidth: 1,
        borderColor: Colors.placeholder,
    },

})