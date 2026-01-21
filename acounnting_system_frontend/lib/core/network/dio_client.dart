import 'package:dio/dio.dart';
import 'auth_interceptor.dart';

class DioClient {
  static final Dio dio = Dio();

  static Future<void> init({
    required String baseUrl,
    Map<String, String>? defaultHeaders,
    Duration connectTimeout = const Duration(seconds: 10),
    Duration receiveTimeout = const Duration(seconds: 30),
  }) async {
    dio.options.baseUrl = baseUrl;
    dio.options.connectTimeout = connectTimeout;
    dio.options.receiveTimeout = receiveTimeout;

    dio.options.headers.addAll(defaultHeaders ?? {});
    dio.interceptors.add(AuthInterceptor());
  }
}
