import 'package:acounnting_system_frontend/modules/home/view/home_view_components/services_card.dart';

import '../../../core/components/custom_text_v2.dart';
import '../../../core/styles/app_colors.dart';
import '../../../core/styles/text_styles.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';

import '../controllers/home_controller.dart';
import 'home_view_components/drawer.dart';

class PhonesHomeView extends GetView<HomeController> {
  const PhonesHomeView({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      key: controller.scaffoldKey,
      drawer: AppDrawer(),
      body: Stack(
        children: [
          Row(
            children: [
              ColoredBox(
                color: AppColors.mainColor,
                child: SizedBox(width: Get.width / 2, height: Get.height),
              ),
              ColoredBox(
                color: AppColors.secondaryColor,
                child: SizedBox(width: Get.width / 2, height: Get.height),
              ),
            ],
          ),
          Column(
            children: [
              Container(
                height: Get.height * 0.15,
                padding: EdgeInsets.only(top: 16),
                decoration: BoxDecoration(
                  color: AppColors.secondaryColor,
                  borderRadius: BorderRadius.only(
                    bottomLeft: Radius.circular(75),
                    bottomRight: Radius.circular(75),
                  ),
                ),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    IconButton(
                      onPressed: controller.openDrawer,
                      icon: Icon(Icons.menu, color: AppColors.secTextColor),
                    ),
                    CustomText(
                      'الرئيسية',
                      style: AppTextStyles.secStyle(
                        textHeader: AppTextHeaders.h1Bold,
                      ),
                    ),
                    IconButton(
                      onPressed: controller.notificationRoute,
                      icon: Icon(
                        Icons.notifications_outlined,
                        color: AppColors.secTextColor,
                      ),
                    ),
                  ],
                ),
              ),
              Expanded(
                child: Container(
                  padding: EdgeInsets.all(16),
                  decoration: BoxDecoration(
                    color: AppColors.mainColor,
                    borderRadius: BorderRadius.only(
                      topLeft: Radius.circular(75),
                      topRight: Radius.circular(75),
                    ),
                  ),
                  child: RefreshIndicator(
                    onRefresh: () async {},
                    child: SingleChildScrollView(
                      child: Column(
                        children: [
                          for (int i = 0; i < 7; i += 2) ...[
                            Row(
                              mainAxisAlignment: MainAxisAlignment.spaceAround,
                              children: [
                                ServicesCard(
                                  text: "الايرادت",
                                  textStyle: AppTextStyles.ternaryStyle(),
                                  backgroundColor: AppColors.ternaryColor,
                                ),
                                ServicesCard(
                                  text: "الايرادت",
                                  textStyle: AppTextStyles.ternaryStyle(),
                                  backgroundColor: AppColors.ternaryColor,
                                ),
                              ],
                            ),
                            SizedBox(height: 16,)
                          ],
                        ],
                      ),
                    ),
                  ),
                ),
              ),
            ],
          ),
        ],
      ),
      bottomNavigationBar: Obx(() {
        return BottomNavigationBar(
          currentIndex: controller.selectedIndex.value,
          onTap: controller.changeTab,
          items: const [
            BottomNavigationBarItem(
              icon: Icon(Icons.dashboard),
              label: 'Overview',
            ),
            BottomNavigationBarItem(
              icon: Icon(Icons.attach_money),
              label: 'Incomes',
            ),
            BottomNavigationBarItem(
              icon: Icon(Icons.people),
              label: 'Contacts',
            ),
            BottomNavigationBarItem(
              icon: Icon(Icons.settings),
              label: 'Settings',
            ),
          ],
        );
      }),
    );
  }
}
