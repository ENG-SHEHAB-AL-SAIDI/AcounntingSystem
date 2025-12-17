import 'package:get/get.dart';
import 'arabic_language.dart';

class Languages implements Translations {
  @override
  Map<String, Map<String, String>> get keys => {
        'ar': Arabic().dictionary,
      };
}
