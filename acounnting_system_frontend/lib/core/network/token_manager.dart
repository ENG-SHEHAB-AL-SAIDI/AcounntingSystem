import 'package:shared_preferences/shared_preferences.dart';

class TokenManager {
  static SharedPreferences? prefs;

  static Future<void> init() async {
    prefs = await SharedPreferences.getInstance();
  }

  static String? get accessToken => prefs?.getString('AccessToken');
  static String? get refreshToken => prefs?.getString('refreshToken');

  static Future<void> saveAccessToken(String token) async =>
      prefs?.setString('AccessToken', token);

  static Future<void> saveRefreshToken(String token) async =>
      prefs?.setString('refreshToken', token);

  static Future<void> clear() async => prefs?.clear();
}
