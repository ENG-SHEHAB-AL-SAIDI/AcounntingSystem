import 'package:flutter/material.dart';
import 'package:get/get.dart';

class HomeController extends GetxController {
  final GlobalKey<ScaffoldState> scaffoldKey = GlobalKey<ScaffoldState>();
  final RxInt selectedIndex = 0.obs;



  void openDrawer() {
    scaffoldKey.currentState?.openDrawer();
  }


  void changeTab(int index) {
    selectedIndex.value = index;
  }

}
