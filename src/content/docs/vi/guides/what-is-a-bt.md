---
title: Behavior Tree là gì?
description: Giới thiệu về các khái niệm cốt lõi của Cây Hành Vi (Behavior Tree - BT).
---

Cây Hành Vi (Behavior Tree - BT) là một công cụ mạnh mẽ được dùng để tạo ra AI phức tạp và có tính mô-đun cho các nhân vật trong game và các hệ thống mô phỏng khác. Nếu bạn đã từng phải vật lộn với các câu lệnh `if/else` rối rắm hay "mã spaghetti" khó hiểu từ Máy Trạng Thái Hữu Hạn (Finite State Machine - FSM), bạn sẽ yêu thích Behavior Tree.

Hãy hình dung nó như một sơ đồ trực quan cho bộ não của AI. Nó cho phép bạn định nghĩa một tập hợp các hành động và quy tắc, và cấu trúc cây sẽ quyết định hành động nào AI nên thực hiện tại mỗi thời điểm.

### Các khái niệm cốt lõi

Một Behavior Tree được cấu thành từ nhiều loại **Nút (Node)**. Mỗi nút thực hiện một nhiệm vụ nhỏ và sau đó trả về một trạng thái cho nút cha của nó. Có ba trạng thái khả dĩ:

*   ✅ **`Success` (Thành công)**: Nhiệm vụ đã hoàn thành thành công.
*   ❌ **`Failure` (Thất bại)**: Nhiệm vụ không thể hoàn thành.
*   ⏳ **`Running` (Đang chạy)**: Nhiệm vụ vẫn đang được tiến hành và cần thêm thời gian (ví dụ: đang đi đến một địa điểm).

#### Các loại Nút

**1. Nút Hành Động (Action Node - Nút lá)**
Đây là những nút đơn giản nhất. Chúng thực hiện một hành động cụ thể trong thế giới game của bạn.

*   `MoveToTarget` (Di chuyển đến mục tiêu)
*   `AttackEnemy` (Tấn công kẻ thù)
*   `PlayAnimation` (Phát một hoạt ảnh)
*   `Wait(seconds)` (Chờ trong vài giây)

**2. Nút Hợp Thành (Composite Node - Nút nhánh)**
Những nút này kiểm soát luồng logic. Chúng có một hoặc nhiều nút con và quyết định xem nên thực thi nút con nào dựa trên một bộ quy tắc. Các loại phổ biến nhất là:

*   **Chuỗi (Sequence ➡️)**: Thực thi các nút con lần lượt, theo thứ tự. Nếu bất kỳ nút con nào trả về `Failure`, Sequence sẽ ngay lập tức dừng lại và trả về `Failure`. Nếu tất cả các con đều trả về `Success`, Sequence sẽ trả về `Success`. Nó giống như một cổng logic **AND**.
    *   *Ví dụ: Để làm một chiếc bánh sandwich, bạn phải (Lấy bánh mì) VÀ (Thêm nhân) VÀ (Kẹp hai lát lại).*

*   **Bộ chọn (Selector ❓)**: Thực thi các nút con lần lượt, theo thứ tự, cho đến khi một trong số chúng trả về `Success`. Nếu một nút con trả về `Success`, Selector sẽ ngay lập tức dừng lại và trả về `Success`. Nếu tất cả các con đều trả về `Failure`, Selector sẽ trả về `Failure`. Nó giống như một cổng logic **OR** hoặc một "phương án dự phòng".
    *   *Ví dụ: Để xử lý một mối đe dọa, bạn có thể (Bỏ chạy), nhưng nếu thất bại, HOẶC bạn không thể, bạn sẽ (Chiến đấu).*

**3. Nút Trang Trí (Decorator Node)**
Những nút này chỉ có một nút con duy nhất. Mục đích của chúng là sửa đổi hành vi hoặc kết quả của nút con đó.

*   **Bộ đảo (Inverter)**: Đảo ngược kết quả của nút con. `Success` trở thành `Failure`, và `Failure` trở thành `Success`.
    *   *Ví dụ: Kiểm tra xem kẻ thù có KHÔNG ở trong tầm nhìn không.*
*   **Bộ lặp (Repeater)**: Thực thi nút con của nó một số lần nhất định, hoặc lặp lại mãi mãi.

### Cách hoạt động: "Tick"

Toàn bộ cây được duyệt từ nút gốc xuống dưới theo một khoảng thời gian đều đặn, được gọi là một **"tick"** (xung cập nhật). Ở mỗi tick, cây sẽ quyết định hành động hiện tại của AI dựa trên các trạng thái được trả về từ các nút. Cách tiếp cận có cấu trúc và phản ứng nhanh này giúp việc thiết kế, gỡ lỗi và mở rộng logic AI của bạn trở nên dễ dàng.

Sẵn sàng để xây dựng một cây chưa? Hãy tiếp tục với bài [Tạo cây hành vi đầu tiên của bạn](/vi/guides/first-tree/).