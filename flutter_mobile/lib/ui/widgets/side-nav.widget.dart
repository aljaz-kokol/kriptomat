import 'package:flutter/material.dart';

class SideNav extends StatelessWidget {
  final List<Widget> children;
  final String title;
  const SideNav({required this.children, required this.title,Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      constraints: const BoxConstraints(maxWidth: 350),
      child: Container(
        decoration: BoxDecoration(
          color: Theme.of(context).bottomAppBarColor,
        ),
        child: Column(
          children: <Widget>[
            Padding(
              padding: const EdgeInsets.only(bottom: 15, top: 25),
              child: Text(
                title,
                textScaleFactor: 2,
                style: const TextStyle(fontWeight: FontWeight.bold),
              ),
            ),
            ...children,
          ],
        ),
      ),
    );
  }
}
