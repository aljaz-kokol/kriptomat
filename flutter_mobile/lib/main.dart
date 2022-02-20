import 'package:flutter/material.dart';
import 'package:flutter_mobile/ui/screens/coin-list.screen.dart';

void main() => runApp(CryptoDataApp());

class CryptoDataApp extends StatelessWidget {
  const CryptoDataApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Crypto Data App',
      home: CoinListScreen(),
    );
  }
}
