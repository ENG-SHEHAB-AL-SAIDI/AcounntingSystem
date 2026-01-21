import 'package:acounnting_system_frontend/modules/home/view/phones_home_view.dart';
import 'package:acounnting_system_frontend/modules/home/view/web_home_view.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

import '../../../core/utils/screen_utils.dart';

class LoginViewLoader extends StatelessWidget {
  const LoginViewLoader({super.key});

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
