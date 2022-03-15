import 'package:flutter/material.dart';

class SideNavButton extends StatelessWidget {
  final VoidCallback onPressed;
  final String text;
  final Icon? icon;

  const SideNavButton({
    required this.text,
    required this.onPressed,
    this.icon,
    Key? key
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return RawMaterialButton(
      onPressed: onPressed,
      padding: const EdgeInsets.all(15),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: <Widget>[
          Text(
              text,
              style: const TextStyle(
                  fontWeight: FontWeight.w600
              )
          ),
          icon ?? const SizedBox(height: 0, width: 0),
        ],
      ),
    );
  }
}
