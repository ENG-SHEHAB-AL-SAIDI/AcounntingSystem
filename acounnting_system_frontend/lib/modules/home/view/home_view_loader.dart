import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

import '../../../core/utils/screen_utils.dart';
import 'phones_home_view.dart';
import 'web_home_view.dart';

class HomeViewLoader extends StatelessWidget {
  const HomeViewLoader({super.key});

  @override
  Widget build(BuildContext context) {
    SystemChrome.setPreferredOrientations([DeviceOrientation.portraitUp]);
    return Material(
      child: LayoutBuilder(
        builder: (context, constraints) {
          if (ScreenUtils.isPhoneScreen()) {
            return PhonesHomeView();
          } else {
            return WebHomeView();
          }
        },
      ),
    );
  }
}
