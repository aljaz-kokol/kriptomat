import 'package:fluent_ui/fluent_ui.dart';
import 'package:flutter_mobile/core/url-builder.core.dart';

class Coin {
  static const String apiId = '_id';
  final String id;

  static const String apiName = 'name';
  final String name;

  static const String apiConnection = 'connection';
  final String connection;

  static const String apiLastPrice = 'lastPrice';
  final double price;

  static const String apiImage = 'image';
  final String _image;

  Coin({
    required this.id,
    required this.name,
    required this.connection,
    required this.price,
    required String image
  }) : _image = image;

  factory Coin.fromJson(Map<String, dynamic> json) {
    return Coin(
      id: json[apiId],
      name: json[apiName],
      connection: json[apiConnection],
      price: 1.0 * json[apiLastPrice],
      image: json[apiImage]
    );
  }

  String get image {
    return _image;
  }

}