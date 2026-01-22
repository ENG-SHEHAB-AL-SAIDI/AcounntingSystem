import 'package:flutter/material.dart';
import '../styles/app_colors.dart';
import '../utils/responsivity.dart';

class TextHeaders {
  TextHeaders({required this.fontSize, required this.fontWeight});
  double fontSize;
  FontWeight fontWeight;
}

class AppTextHeaders {
  static TextHeaders h1Bold =
      TextHeaders(fontSize: 24, fontWeight: FontWeight.bold);
  static TextHeaders h2Bold =
      TextHeaders(fontSize: 18, fontWeight: FontWeight.bold);
  static TextHeaders h3Bold =
      TextHeaders(fontSize: 14, fontWeight: FontWeight.bold);
  static TextHeaders h3Normal =
      TextHeaders(fontSize: 14, fontWeight: FontWeight.normal);
  static TextHeaders h5Bold =
      TextHeaders(fontSize: 12, fontWeight: FontWeight.bold);
  static TextHeaders h6Bold =
      TextHeaders(fontSize: 10, fontWeight: FontWeight.bold);
  static TextHeaders h7Bold =
      TextHeaders(fontSize: 8, fontWeight: FontWeight.bold);
}

class AppTextStyles {
  static TextStyle mainStyle({TextHeaders? textHeader, double? height}) {
    textHeader ??= AppTextHeaders.h2Bold;
    return TextStyle(
      fontSize: Responsivity.fontSizeScale(textHeader.fontSize),
      fontWeight: textHeader.fontWeight,
      color: AppColors.mainTextColor,
      height: height,
    );
  }

  static TextStyle secStyle({TextHeaders? textHeader, double? height}) {
    textHeader ??= AppTextHeaders.h3Normal;
    return TextStyle(
      fontSize: Responsivity.fontSizeScale(textHeader.fontSize),
      fontWeight: textHeader.fontWeight,
      color: AppColors.secTextColor,
      height: height,
    );
  }


  static TextStyle ternaryStyle({TextHeaders? textHeader, double? height}) {
    textHeader ??= AppTextHeaders.h3Normal;
    return TextStyle(
      fontSize: Responsivity.fontSizeScale(textHeader.fontSize),
      fontWeight: textHeader.fontWeight,
      color: AppColors.ternaryTextColor,
      height: height,
    );
  }


  static TextStyle linkStyle({TextHeaders? textHeader, double? height}) {
    textHeader ??= AppTextHeaders.h3Normal;
    return TextStyle(
      fontSize: Responsivity.fontSizeScale(textHeader.fontSize),
      fontWeight: textHeader.fontWeight,
      color: AppColors.linkTextColor,
      height: height,
    );
  }

  static TextStyle failedAndErrorStyle(
      {TextHeaders? textHeader, double? height}) {
    textHeader ??= AppTextHeaders.h2Bold;
    return TextStyle(
      fontSize: Responsivity.fontSizeScale(textHeader.fontSize),
      fontWeight: textHeader.fontWeight,
      color: Colors.redAccent,
      height: height,
    );
  }

  static TextStyle customColorStyle(
      {TextHeaders? textHeader, required Color color, double? height}) {
    textHeader ??= AppTextHeaders.h2Bold;
    return TextStyle(
      fontSize: Responsivity.fontSizeScale(textHeader.fontSize),
      fontWeight: textHeader.fontWeight,
      color: color,
      height: height,
    );
  }
}
