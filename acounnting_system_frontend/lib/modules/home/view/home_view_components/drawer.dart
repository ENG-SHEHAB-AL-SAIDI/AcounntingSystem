import 'package:acounnting_system_frontend/modules/home/controllers/home_controller.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';

import '../../../../core/components/custom_text_v2.dart';
import '../../../../core/styles/app_colors.dart';
import '../../../../core/styles/text_styles.dart';

class AppDrawer extends GetView<HomeController> {
  const AppDrawer({super.key});

  @override
  Widget build(BuildContext context) {
    return Drawer(
      backgroundColor: AppColors.mainColor,
      child: ListView(
        padding: EdgeInsets.zero,
        children: [
          UserAccountsDrawerHeader(
            decoration: BoxDecoration(color: AppColors.secondaryColor),
            accountName: CustomText(
               'Guest',
              style: AppTextStyles.secStyle(textHeader: AppTextHeaders.h2Bold),
            ),
            accountEmail: CustomText(
                'Not logged in',
              style: AppTextStyles.secStyle(textHeader: AppTextHeaders.h2Bold),
            ),
            currentAccountPicture: CircleAvatar(
              backgroundColor: AppColors.mainColor,
              child: CustomText(
                 'G',
                style: AppTextStyles.mainStyle(
                  textHeader: AppTextHeaders.h1Bold,
                ),
              ),
            ),
          ),
          (false)
              ? ListTile(
                  leading: Icon(Icons.login, color: AppColors.mainTextColor),
                  title: CustomText(
                    "Login with Google",
                    style: AppTextStyles.mainStyle(
                      textHeader: AppTextHeaders.h2Bold,
                    ),
                  ),
                  onTap: () {},
                )
              : ListTile(
                  leading: Icon(Icons.logout, color: AppColors.mainTextColor),
                  title: CustomText(
                    "Logout",
                    style: AppTextStyles.mainStyle(
                      textHeader: AppTextHeaders.h2Bold,
                    ),
                  ),
                  onTap: () {},
                ),
          const Divider(),
          ListTile(
            leading: Icon(Icons.backup, color: AppColors.mainTextColor),
            title: CustomText(
              "Backup Data",
              style: AppTextStyles.mainStyle(textHeader: AppTextHeaders.h2Bold),
            ),
            onTap: (){},
          ),
          ListTile(
            leading: Icon(Icons.restore, color: AppColors.mainTextColor),
            title: CustomText(
              "Restore Data",
              style: AppTextStyles.mainStyle(textHeader: AppTextHeaders.h2Bold),
            ),
            onTap: (){},
          ),
          const Divider(),
          ListTile(
            leading: Icon(Icons.language, color: AppColors.mainTextColor),
            title: CustomText(
              "Change Language",
              style: AppTextStyles.mainStyle(textHeader: AppTextHeaders.h2Bold),
            ),
            onTap: (){},
          ),
        ],
      ),
    );
  }
}
