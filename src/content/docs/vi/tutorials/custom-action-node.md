
---
title: Tạo Node Hành Động Tùy Chỉnh
description: Học cách mở rộng hệ thống bằng cách tạo các node hành động tùy chỉnh của riêng bạn.
---

Node Hành Động là trái tim của khả năng AI trong game của bạn. Chúng là các node "lá" trong cây, thực hiện các tác vụ thực tế trong thế giới game như di chuyển nhân vật, phát hoạt ảnh hoặc tấn công kẻ địch.

Việc tạo ra các hành động tùy chỉnh là kỹ năng thiết yếu nhất để sử dụng hệ thống Behavior Tree này.

### Mẫu Cơ Bản

Để tạo một hành động mới, hãy tạo một script C# mới kế thừa từ `ND_BehaviorTree.ActionNode`. Dưới đây là ví dụ đơn giản "Hello World" ghi log ra console.

**Tạo một script mới tên là `LogMessageNode.cs`:**

```csharp
using UnityEngine;
using ND_BehaviorTree; // Đừng quên import namespace

// Thuộc tính [NodeInfo] là tùy chọn. Nó xác định cách node hiển thị trong
// trình chỉnh sửa trực quan, bao gồm đường dẫn menu và biểu tượng.
[NodeInfo("Log Message", "Debug/Log Message")]
public class LogMessageNode : ActionNode
{
    // Biến public sẽ hiển thị như thuộc tính có thể chỉnh sửa trong cửa sổ Behavior Tree.
    public string message = "Xin chào từ Behavior Tree!";

    // OnEnter() được gọi một lần khi node bắt đầu thực thi.
    protected override void OnEnter() { }

    // OnProcess() được gọi mỗi khung hình khi node đang ở trạng thái 'Running'.
    protected override Status OnProcess()
    {
        Debug.Log($"[{ownerTree.Self.name}] {message}");
        return Status.Success; // Hành động hoàn thành ngay lập tức.
    }

    // OnExit() được gọi một lần khi node kết thúc thực thi.
    protected override void OnExit() { }
}
```

---

## Vòng Đời Node & Trạng Thái

Mỗi node bạn tạo đều có vòng đời được quản lý bởi ba phương thức chính và ba trạng thái trả về.

### Các Phương Thức Vòng Đời

- `protected override void OnEnter()`  
  Gọi một lần trước khi node bắt đầu xử lý. Dùng để khởi tạo.

- `protected override Status OnProcess()`  
  Vòng lặp "Update" của node. Gọi mỗi khung hình khi node được gọi. Phải trả về một `Status`.

- `protected override void OnExit()`  
  Gọi một lần khi node kết thúc (sau khi trả về `Success` hoặc `Failure`). Dùng để dọn dẹp.

### Các Trạng Thái Trả Về

Trạng thái bạn trả về từ `OnProcess()` điều khiển luồng của toàn bộ cây:

- ✅ `Status.Success`: Tác vụ hoàn thành thành công. Cây sẽ tiếp tục (ví dụ: một `Sequence` sẽ chuyển sang node con tiếp theo).
- ❌ `Status.Failure`: Tác vụ thất bại. Cây sẽ phản ứng (ví dụ: `Selector` sẽ thử node con khác).
- ⏳ `Status.Running`: Tác vụ chưa hoàn thành và cần thêm thời gian. Node sẽ được xử lý lại ở khung hình tiếp theo.

---

## Ví Dụ Thực Tế: `MoveToTargetNode`

Tạo một node di chuyển tác nhân đến mục tiêu được lưu trong Blackboard. Đây là ví dụ về hành động kéo dài nhiều khung hình.

```csharp
using UnityEngine;
using ND_BehaviorTree;

[NodeInfo("Move To Target", "Movement/Move To Target")]
public class MoveToTargetNode : ActionNode
{
    public float speed = 5.0f;
    public float stoppingDistance = 0.1f;
    public string targetKey = "target"; // Tên key trong Blackboard

    private Transform targetTransform;

    protected override void OnEnter()
    {
        // Lấy target từ Blackboard khi bắt đầu.
        targetTransform = ownerTree.blackboard.GetValue<Transform>(targetKey);
    }

    protected override Status OnProcess()
    {
        // 1. Kiểm tra điều kiện thất bại trước.
        if (targetTransform == null)
        {
            Debug.LogWarning($"MoveToTargetNode thất bại: Key Blackboard '{targetKey}' là null.");
            return Status.Failure;
        }

        // 2. Kiểm tra nếu đã đến đích.
        float distance = Vector3.Distance(ownerTree.Self.transform.position, targetTransform.position);
        if (distance <= stoppingDistance)
        {
            return Status.Success;
        }

        // 3. Nếu chưa đến, di chuyển về phía target.
        Vector3 direction = (targetTransform.position - ownerTree.Self.transform.position).normalized;
        ownerTree.Self.transform.position += direction * speed * Time.deltaTime;
        
        // 4. Trả về Running vì hành động chưa hoàn thành.
        return Status.Running;
    }

    protected override void OnExit() { }
}
```

Node này minh họa rõ vòng đời node:

- Lấy target trong `OnEnter()`.
- Kiểm tra `Failure` và `Success` trong `OnProcess()`.
- Thực thi logic chính và trả về `Status.Running` để tiếp tục xử lý.
