import 'package:dio/dio.dart';
import 'dio_client.dart';
import 'token_manager.dart';

class AuthInterceptor extends Interceptor {
  int refreshTries = 2;

  @override
  void onRequest(RequestOptions options, RequestInterceptorHandler handler) {
    final token = TokenManager.accessToken;
    if (token != null) options.headers['Authorization'] = 'Bearer $token';
    handler.next(options);
  }

  @override
  void onError(DioException err, ErrorInterceptorHandler handler) async {
    if (err.response?.statusCode == 401 &&
        err.requestOptions.path != 'refresh') {
      if (refreshTries <= 0) {
        await TokenManager.clear();
        return handler.next(err);
      }

      refreshTries--;

      final response = await DioClient.dio.post(
        'refresh',
        data: {'refreshToken': TokenManager.refreshToken},
      );

      if (response.statusCode == 200) {
        await TokenManager.saveAccessToken(response.data['accessToken']);

        final retryResponse = await DioClient.dio.request(
          err.requestOptions.path,
          data: err.requestOptions.data,
          options: Options(method: err.requestOptions.method),
        );

        return handler.resolve(retryResponse);
      }
    }

    handler.next(err);
  }
}
