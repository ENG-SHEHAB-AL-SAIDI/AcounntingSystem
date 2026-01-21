import 'package:flutter/material.dart';
import 'package:get/get.dart';

import '../controllers/home_controller.dart';

class WebHomeView extends GetView<HomeController> {
  const WebHomeView({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Dashboard')),
      body: Obx(() {
        return _buildBody(controller.selectedIndex.value);
      }),
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
