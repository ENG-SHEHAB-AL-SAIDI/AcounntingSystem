

import '../utils/snake_bar.dart';

enum FeedbackType { success, error, info }

class NetworkFeedbackMessage {
  final String action;
  final String target;

  NetworkFeedbackMessage({
    required this.action,
    required this.target,
  });

  /// Factory to generate a success message
  void successMessage({
    String? customMessage,
  }) {
    showSnakeBar(title: '$action $target', message: customMessage ?? '$target has been successfully ${_pastTense(action)}' );
  }

  /// Factory to generate a failed message
  void failedMessage({
    String? customMessage,
  }) {
    showSnakeBar(title: '$action $target', message: customMessage ?? 'Failed to $action $target' );
  }

  /// Helper to convert verb to past tense (basic)
  static String _pastTense(String verb) {
    switch (verb.toLowerCase()) {
      case 'update':
        return 'updated';
      case 'delete':
        return 'deleted';
      case 'create':
        return 'created';
      case 'fetch':
        return 'fetched';
      default:
        return '${verb}ed';
    }
  }
}
