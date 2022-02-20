import 'package:flutter/material.dart';

import '../widgets/side-nav-btn.widget.dart';
import '../widgets/side-nav.widget.dart';

class BaseScreenLayout extends StatelessWidget {
  final Widget body;
  const BaseScreenLayout({required this.body, Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return LayoutBuilder(
      builder: (context, constraints) {
        return Scaffold(
          body: Flex(
            direction: Axis.horizontal,
            children: [
              _desktopNavigation(),
              Expanded(
                child: body,
              )
            ],
          ),
        );
      },
    );
  }

  Widget _desktopNavigation() {
    return SideNav(
      title: 'Crypto Data',
      children: [
        SideNavButton(
            text: 'Coin List',
            icon: const Icon(Icons.list),
            onPressed: () => print('Coin List Btn')
        ),
        SideNavButton(
            text: 'Purchases',
            icon: const Icon(Icons.shopping_cart),
            onPressed: () => print('Purchases Btn')
        ),
        SideNavButton(
            text: 'Groups',
            icon: const Icon(Icons.group_work),
            onPressed: () => print('Groups Btn')
        ),
      ],
    );
  }

}
