import 'package:flutter_mobile/core/url-builder.core.dart';

class ApiEndpoint {
  static Uri get coinListEndpoint {
    return Uri.parse(UrlBuilder.buildApiUrl(['coins']));
  }
}