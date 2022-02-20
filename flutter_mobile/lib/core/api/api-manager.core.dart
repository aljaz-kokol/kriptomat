import 'dart:convert';
import 'package:flutter_mobile/core/api/api-endpoints.core.dart';
import 'package:flutter_mobile/models/coin.model.dart';
import 'package:flutter_mobile/util/status-code.util.dart';
import 'package:http/http.dart' as http;

class ApiManager {
  static ApiManager ?_instance;
  ApiManager._();

  static ApiManager get get {
    ApiManager._instance ??= ApiManager._();
    return ApiManager._instance ?? ApiManager._();
  }

  Future<List<Coin>> get coins async {
    http.Client client = http.Client();
    http.Response response = await client.get(ApiEndpoint.coinListEndpoint);
    if (response.statusCode == StatusCode.OK) {
      List<dynamic> jsonList = jsonDecode(response.body);
      List<Coin> coinList = [];
      for (Map<String, dynamic> json in jsonList) {
        coinList.add(Coin.fromJson(json));
      }
      return coinList;
    }
    return [];
  }
}