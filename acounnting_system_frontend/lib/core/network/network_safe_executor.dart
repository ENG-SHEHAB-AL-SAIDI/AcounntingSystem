import 'package:dio/dio.dart';
import 'package:flutter/foundation.dart';
import '../utils/snake_bar.dart';
import 'dio_client.dart';
import 'internet_connection_cheker.dart';
import 'network_feedback_messager.dart';

class NetworkSafeExecutor {
  /// Executes a task safely with optional feedback
  Future<T?> execute<T>({
    required Future<T> Function() task,
    NetworkFeedbackMessage? feedback,
    bool rethrowError = false,
  }) async {
    if (await checkInternetConnection()) {
      showSnakeBar(
        title: 'No Internet Connection',
        message: 'Please check your connection and try again.',
      );
      return null;
    }

    try {
      final result = await task();
      feedback?.successMessage();
      return result;
    } catch (error, stackTrace) {
      debugPrint('NetworkSafeExecutor error: $error');
      debugPrint('$stackTrace');
      feedback?.failedMessage();
      if (rethrowError) rethrow;
      return null;
    }
  }

  /// Dio GET request
  Future<Response<T>?> get<T>(
      String path, {
        Map<String, dynamic>? queryParameters,
        NetworkFeedbackMessage? feedback,
        Options? options,
      }) async {
    return execute<Response<T>>(
      task: () => DioClient.dio.get<T>(
        path,
        queryParameters: queryParameters,
        options: options,
      ),
      feedback: feedback,
    );
  }

  /// Dio POST request
  Future<Response<T>?> post<T>(
      String path, {
        dynamic data,
        NetworkFeedbackMessage? feedback,
        Options? options,
      }) async {
    return execute<Response<T>>(
      task: () => DioClient.dio.post<T>(
        path,
        data: data,
        options: options,
      ),
      feedback: feedback,
    );
  }

  /// Dio PUT request
  Future<Response<T>?> put<T>(
      String path, {
        dynamic data,
        NetworkFeedbackMessage? feedback,
        Options? options,
      }) async {
    return execute<Response<T>>(
      task: () => DioClient.dio.put<T>(
        path,
        data: data,
        options: options,
      ),
      feedback: feedback,
    );
  }

  /// Dio DELETE request
  Future<Response<T>?> delete<T>(
      String path, {
        dynamic data,
        NetworkFeedbackMessage? feedback,
        Options? options,
      }) async {
    return execute<Response<T>>(
      task: () => DioClient.dio.delete<T>(
        path,
        data: data,
        options: options,
      ),
      feedback: feedback,
    );
  }
}
