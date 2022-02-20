import 'package:flutter_mobile/util/constant.util.dart';

class UrlBuilder {
  final String _baseUrl;
  final List<String> _actions;

  UrlBuilder({
    required String baseUrl,
    List<String> actions = const []
  }) : _baseUrl = baseUrl, _actions = actions;

  String build({List<String> additionalActions = const []}) {
    return [_baseUrl, ..._actions, ...additionalActions].join('/');
  }

  static String buildApiUrl(List<String> actions) {
    final urlBuilder = UrlBuilder(baseUrl: Constants.API_ENDPOINT, actions: actions);
    return urlBuilder.build();
  }
}