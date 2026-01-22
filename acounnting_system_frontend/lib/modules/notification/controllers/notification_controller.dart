import 'package:flutter/material.dart';
import 'package:get/get.dart';

import '../../../core/styles/app_colors.dart';
import '../models/notification_model.dart' as model;


class NotificationController extends GetxController {
  Map<String, Map<int, model.Notification>> notificationGroups = {};
  RxBool loadingState = true.obs;
  String today = "";
  String yesterday = "";

  RxString mode = 'Group'.obs; // 'Single' or 'Group'
  TextEditingController receiverIdController = TextEditingController();
  FocusNode receiverIdFocus = FocusNode();
  TextEditingController titleController = TextEditingController();
  FocusNode titleFocus = FocusNode();
  TextEditingController messageController = TextEditingController();
  FocusNode messageFocus = FocusNode();

  RxString selectedTarget = 'Students'.obs;
  RxList<String> selectedSections = <String>[].obs;
  RxList<String> selectedLevels = <String>[].obs;
  RxList<String> selectedRoles = <String>[].obs;

  RxInt sortDirection = 0.obs;

  final Map<String, String> targets = {
    "Students": "'student' in topics",
    "Doctors": "'doctor' in topics",
    "Student And Doctors": "'student' in topics || 'doctor' in topics"
  };
  RxBool includeRole = false.obs;
  List<Border> borders = [];
  @override
  void onInit() async {
    DateTime now = DateTime.now();
    BorderSide borderSide =
    BorderSide(color: AppColors.secondaryColor, width: 1.0);
    borders = [
      Border(
        top: borderSide,
        right: borderSide,
        bottom: borderSide,
      ),
      Border(
        top: borderSide,
        left: borderSide,
        bottom: borderSide,
      ),
    ];

    await fetchNotification();
    today =
        '${now.year}-${now.month.toString().padLeft(2, '0')}-${now.day.toString().padLeft(2, '0')}';
    yesterday =
        '${now.year}-${now.month.toString().padLeft(2, '0')}-${(now.day - 1).toString().padLeft(2, '0')}';
    loadingState.value = false;
    super.onInit();
  }

  @override
  void refresh({bool force = true}) async {
    loadingState.value = true;
    await fetchNotification(force: force);
    super.refresh();
    loadingState.value = false;
  }

  Future<void> fetchNotification({bool force = false}) async {

    update(["notificationsList"]);
  }

  void changeIncludeRole(bool? val) {
    if (val == null) return;
    includeRole.value = val;
  }

  void changeSelectedSortDirection(int? val) async {
    if (val == null) return;
    sortDirection.value = val;
    await fetchNotification();
  }


  void pushNotification() async {
  }


  void addNotificationClick() {
    // Get.dialog(AddNotificationsTargetCard());
  }

  void groupNotifications(Map<int, model.Notification> notifications) {
    for (model.Notification notification in notifications.values) {
      if (notification.createdAt == null) continue;
      if (!notificationGroups
          .containsKey(notification.createdAt?.split("T").first)) {
        notificationGroups[notification.createdAt!.split("T").first] = {};
      }
      notificationGroups[notification.createdAt!.split("T").first]
          ?[notification.id] = notification;
    }
    notificationGroups = Map.fromEntries(notificationGroups.entries.toList()
          ..sort((a, b) => DateTime.parse(b.key)
              .compareTo(DateTime.parse(a.key))) // newest first
        );

  }

  @override
  void onReady() {
    // NotificationRepository.setNotificationsReadState();
  }
}
