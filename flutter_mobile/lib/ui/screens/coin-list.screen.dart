
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_mobile/bloc/coin.bloc.dart';
import 'package:flutter_svg/flutter_svg.dart';

import '../../models/coin.model.dart';
import '../shared/base-screen-layout.dart.dart';

class CoinListScreen extends StatefulWidget {
  CoinListScreen({Key? key}) : super(key: key);

  @override
  State<CoinListScreen> createState() => _CoinListScreenState();
}

class _CoinListScreenState extends State<CoinListScreen> {
  final CoinBloc _coinBloc = CoinBloc();

  @override
  void dispose() {
    super.dispose();
    _coinBloc.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return BaseScreenLayout(
      body: StreamBuilder<List<Coin>>(
        stream: _coinBloc.stateStream,
        builder: (context, snapshot) {
          if (snapshot.hasData) {
            final List<Coin> coins = snapshot.data ?? [];
            return GridView.builder(
              itemCount: coins.length,
              padding: const EdgeInsets.all(15),
              gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                crossAxisCount: 3,
                childAspectRatio: 5,
                crossAxisSpacing: 10,
                mainAxisSpacing: 10
              ),
              itemBuilder: (context, index) {
                final coin = coins[index];
                return RawMaterialButton(
                  elevation: 1,
                  fillColor: Colors.white,
                  padding: const EdgeInsets.all(15),
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Text(
                        coin.name,
                        textScaleFactor: 1.7,
                        style: const TextStyle(fontWeight: FontWeight.w500),
                      ),
                      SvgPicture.network(coin.image, width: 75, height: 75)
                    ],
                  ),
                  onPressed: () {},
                );
              },
            );
          } else if (snapshot.hasError) {
            return Center(
              child: Text('${snapshot.error}'),
            );
          }
          return const Center(
            child: CircularProgressIndicator(),
          );
        },
      ),
    );
  }
}
