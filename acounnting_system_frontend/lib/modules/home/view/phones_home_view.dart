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
                      onPressed: () {},
                      icon: Icon(Icons.menu, color: AppColors.secTextColor),
                    ),
                    CustomText(
                      'الرئيسية',
                      style: AppTextStyles.secStyle(
                        textHeader: AppTextHeaders.h1Bold,
                      ),
                    ),
                    IconButton(
                      onPressed: () {},
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
                  padding: EdgeInsets.only(top: 16),
                  decoration: BoxDecoration(
                    color: AppColors.mainColor,
                    borderRadius: BorderRadius.only(
                      topLeft: Radius.circular(75),
                      topRight: Radius.circular(75),
                    ),
                  ),
                  child: Center(
                    child: CustomText(
                      'الرئيسية',
                      style: AppTextStyles.secStyle(textHeader: AppTextHeaders.h1Bold),
                    ),
                  )
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

  Widget _buildBody(int index) {
    switch (index) {
      case 0:
        return _overview();
      case 1:
        return const Center(child: Text('Incomes Module'));
      case 2:
        return const Center(child: Text('Contacts Module'));
      case 3:
        return const Center(child: Text('Settings'));
      default:
        return const SizedBox();
    }
  }

  Widget _overview() {
    return Padding(
      padding: const EdgeInsets.all(16),
      child: GridView.count(
        crossAxisCount: 2,
        crossAxisSpacing: 12,
        mainAxisSpacing: 12,
        children: const [
          _DashboardCard(title: 'Today Income', value: '0'),
          _DashboardCard(title: 'This Month', value: '0'),
          _DashboardCard(title: 'Cash Balance', value: '0'),
          _DashboardCard(title: 'Bank Balance', value: '0'),
        ],
      ),
    );
  }
}

class _DashboardCard extends StatelessWidget {
  final String title;
  final String value;

  const _DashboardCard({required this.title, required this.value});

  @override
  Widget build(BuildContext context) {
    return Card(
      elevation: 2,
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(title, style: Theme.of(context).textTheme.bodyMedium),
            const Spacer(),
            Text(value, style: Theme.of(context).textTheme.headlineMedium),
          ],
        ),
      ),
    );
  }
}
