import 'package:flutter/material.dart';

class AppColors {
  static ButtonColors buttonColors =
      ButtonColors(color: Color(int.parse("FF0D3976", radix: 16)));




  static Color mainTextColor =const Color(0xff111322);
  static Color secTextColor =  Colors.white;
  static Color ternaryTextColor = const Color(0xff111322);

  static Color mainTextHighLightColor = const Color(0xffffe600);

  static Color linkTextColor = Colors.blueAccent;

  // static Color backColor = const Color(0xFFF5F5F5);
  static Color mainColor = const Color(0xffeaebf4);
  static Color secondaryColor = const Color(0xff111322);
  static Color ternaryColor = const Color(0xffffffff);


}

// structure for Buttons Coloring
class ButtonColors {
  ButtonColors({
    this.color = Colors.blueAccent,
    this.pressedColor = Colors.blueGrey,
    this.disableColor = Colors.grey,
  });

  Color color;
  Color pressedColor;
  Color disableColor;
}
