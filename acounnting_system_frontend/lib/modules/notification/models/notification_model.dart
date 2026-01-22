class Notification {
  int id;
  String? sender;
  String? receiver;
  String? topicName;
  String? title;
  String? message;
  String? createdAt;
  String? updatedAt;

  Notification({
    required this.id,
    this.sender,
    this.receiver,
    this.topicName,
    this.title,
    this.message,
    this.createdAt,
    this.updatedAt,
  });

  factory Notification.fromJson(Map<String, dynamic> json) {
    return Notification(
      id: json['message_id'],
      sender: json['senderUser'],
      receiver: json['receiverUser'],
      topicName: json['topic_name'],
      title: json['title'],
      message: json['message'],
      createdAt: json['createdAt'],
      updatedAt: json['updatedAt'],
    );
  }

  Map<String, dynamic> toJson() {
    return {
      "message_id": id,
      "senderUser": sender,
      "receiverUser": receiver,
      "topic_name": topicName,
      "title": title,
      "message": message,
      "createdAt": createdAt,
      "updatedAt": updatedAt,
    };
  }
}
