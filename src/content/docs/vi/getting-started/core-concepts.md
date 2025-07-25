---
title: Các Khái Niệm Cốt Lõi
description: Hiểu rõ các thành phần nền tảng của hệ thống ND_BehaviorTree.
---

Trước khi bắt đầu xây dựng, điều quan trọng là phải hiểu ba thành phần chính phối hợp với nhau để làm cho AI của bạn trở nên sống động.

### 1. Asset Behavior Tree

Đây là một `ScriptableObject` đóng vai trò như một **bản thiết kế** cho logic AI của bạn. Bạn tạo nó trong thư mục `Assets` của dự án. Bên trong asset này, bạn sử dụng một trình chỉnh sửa trực quan để kết nối các nút khác nhau (Action, Composite, Decorator) nhằm xác định cách nhân vật của bạn nên hành xử.

Vì nó là một asset, bạn có thể dễ dàng tái sử dụng cùng một bản thiết kế logic cho nhiều nhân vật khác nhau.

### 2. Behavior Tree Runner

`BehaviorTreeRunner` là một component `MonoBehaviour` mà bạn thêm vào một `GameObject` trong scene của mình. Công việc của nó là trở thành **động cơ** chạy một asset Behavior Tree.

Trách nhiệm chính:
- Giữ một tham chiếu đến asset Behavior Tree bạn muốn chạy.
- Khi game bắt đầu, nó sẽ **nhân bản (clone)** asset cây. Điều này rất quan trọng! Nó có nghĩa là mỗi nhân vật sẽ có một bản sao cây riêng biệt, với trạng thái riêng của nó (ví dụ: nút nào đang ở trạng thái `Running`).
- Nó gọi phương thức `Update()` của cây mỗi frame, "tick" cây và khiến logic AI được đánh giá.

### 3. Blackboard (Bảng Đen)

Blackboard là một `ScriptableObject` khác, đóng vai trò như **bộ nhớ** hay "não bộ" cho AI của bạn. Nó là một vùng chứa dữ liệu dùng chung nơi bạn có thể lưu trữ và truy xuất các biến mà các nút của cây cần truy cập.

Ví dụ, một nút `FindPlayer` có thể tìm thấy người chơi và lưu vào Blackboard dưới khóa `"target"`. Sau đó, một nút `Attack` có thể đọc khóa `"target"` từ Blackboard để biết nên tấn công ai.

Điều này giúp các nút của bạn không phụ thuộc vào nhau, làm cho AI của bạn có tính mô-đun cao hơn và dễ gỡ lỗi hơn.