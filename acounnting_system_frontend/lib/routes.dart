import 'package:acounnting_system_frontend/modules/home/controllers/home_controller.dart';
import 'package:acounnting_system_frontend/modules/login/controllers/login_controller.dart';
import 'package:acounnting_system_frontend/modules/notification/controllers/notification_controller.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';

import 'modules/home/view/home_view_loader.dart';
import 'modules/login/view/login_view_loader.dart';
import 'modules/notification/view/phones_notification_view.dart';

class AppRoutes {
  static final routes = [
    // GetPage(
    //   name: '/splash_screen',
    //   page: () =>  SplashScreen(),
    //   binding: (){},
    // ),

    GetPage(
      name: '/login',
      page: () => const LoginViewLoader(),
      binding: BindingsBuilder((){
        Get.put<LoginController>(LoginController());
      }),
    ),

    GetPage(
      name: '/home',
      page: () => const HomeViewLoader(),
      binding: BindingsBuilder((){
        Get.put<HomeController>(HomeController());
      }),
    ),


    ////////////////////////////////////////////
    ////         phone routes              ////
    //////////////////////////////////////////


    GetPage(
      name: '/phoneNotification',
      page: () =>  PhoneNotificationView(),
      binding: BindingsBuilder((){
        Get.put<NotificationController>(NotificationController());
      }),
    ),


  ];
}

class RouteGuard extends NavigatorObserver {
  @override
  void didPush(Route<dynamic> route, Route<dynamic>? previousRoute) {
    super.didPush(route, previousRoute);

    // Example: Redirect if user navigates directly
    if (previousRoute == null && route.settings.name != '/') {
      Future.delayed(Duration.zero, () {
        Get.offAllNamed('/splash_screen'); // Redirect to home
      });
    }
  }
}
