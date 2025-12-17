import 'dart:ui';

import 'package:get/get.dart';

import '../services/http_provider.dart';


class LocaleListener {
  static Rx<Locale?> currentLocal = Get.locale.obs;

  static void updateLocale(String lang) {
    Get.updateLocale(Locale(lang));
    currentLocal.value = Locale(lang);
    // HttpProvider.updateLangHeader();
  }

}