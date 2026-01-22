// ignore_for_file: must_be_immutable

import 'package:acounnting_system_frontend/core/components/custom_text_v2.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:get/get_core/src/get_main.dart';

import '../../../../core/styles/text_styles.dart';

class ServicesCard extends StatelessWidget {
  Widget? icon;
  String? text;
  Color? backgroundColor;
  TextStyle? textStyle;
  double? height;
  double? width;

  ServicesCard({
    this.text,
    this.textStyle,
    this.icon,
    this.backgroundColor,

    super.key,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      height: height??(Get.height/5),
      width: width??(Get.width/2.5),
      decoration: BoxDecoration(
        color: backgroundColor,
        borderRadius: BorderRadius.circular(25),
      ),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        crossAxisAlignment: CrossAxisAlignment.center,
        children: [
          ?icon,
          CustomText(text ?? "", style: textStyle),
        ],
      ),
    );
  }
}
