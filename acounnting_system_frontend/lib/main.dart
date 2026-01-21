// ignore: depend_on_referenced_packages

import 'package:acounnting_system_frontend/routes.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:get/get.dart';


void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await SystemChrome.setPreferredOrientations([
    DeviceOrientation.portraitUp,
    DeviceOrientation.portraitDown,
  ]);
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return  GetMaterialApp(
      title: "AccountSystem",
      initialRoute: "/home",
      // translations: Languages(),
      locale: Locale("ar"),
      fallbackLocale: const Locale('ar'),
      getPages: AppRoutes.routes,
      debugShowCheckedModeBanner: false,
      navigatorObservers: [RouteGuard()],
    );
  }
}
