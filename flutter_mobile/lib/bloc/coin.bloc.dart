import 'dart:async';

import 'package:flutter_mobile/core/api/api-manager.core.dart';

import '../models/coin.model.dart';

abstract class CoinEvent {}

class FetchCoins extends CoinEvent {}

class CoinBloc {
  static List<Coin> _coins = [];

  CoinBloc() {
    _eventStreamController.stream.listen(_mapEventToState);
    fetchCoins();
  }

  final _stateStreamController = StreamController<List<Coin>>.broadcast();
  Stream<List<Coin>> get stateStream => _stateStreamController.stream;
  StreamSink<List<Coin>> get _stateSink => _stateStreamController.sink;

  final _eventStreamController = StreamController<CoinEvent>.broadcast();
  Sink<CoinEvent> get _eventSink => _eventStreamController.sink;

  void _mapEventToState(CoinEvent event) async {
    if (event is FetchCoins) {
      if (_coins.isNotEmpty) {
        _stateSink.add(_coins);
      }
      List<Coin> coins = await ApiManager.get.coins;
      _coins = coins;
      _stateSink.add(_coins);
    }
  }

  void fetchCoins() {
    _eventSink.add(FetchCoins());
  }

  void dispose() {
    _eventStreamController.close();
    _stateStreamController.close();
  }
}