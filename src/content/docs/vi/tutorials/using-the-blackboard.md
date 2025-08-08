---
title: Sử dụng Blackboard
description: Học cách sử dụng hệ thống Blackboard trong Behavior Tree của bạn để quản lý bộ nhớ AI và chia sẻ dữ liệu.
---

Blackboard là một component trung tâm của hệ thống Behavior Tree. Nó hoạt động như một bộ nhớ được chia sẻ hoặc ngữ cảnh dữ liệu cho một AI agent riêng lẻ. Bất kỳ node nào trong tree đều có thể đọc từ hoặc ghi vào Blackboard, cho phép chúng chia sẻ thông tin và phối hợp hành động mà không cần được kết nối trực tiếp.

Hệ thống này được thiết kế để type-safe, linh hoạt và dễ sử dụng cả trong Unity Editor và tại runtime.

## 1. Khái niệm cốt lõi

Hệ thống được tạo thành từ hai loại ScriptableObject assets chính: Blackboard và Keys của nó.

### Blackboard Asset

Blackboard là container. Nó chứa một danh sách Key assets. Mỗi BehaviorTree asset có một tham chiếu đến một Blackboard mặc định. Tại runtime, BehaviorTreeRunner clone cả tree và Blackboard liên quan của nó, đảm bảo rằng mỗi AI agent có instance duy nhất của riêng nó về dữ liệu.

### Key Assets

Một Key đại diện cho một phần dữ liệu đơn lẻ trong Blackboard. Mỗi key có:

- **Key Name**: Một string identifier duy nhất được sử dụng để tra cứu dữ liệu (ví dụ: "Target", "Health", "LastKnownPosition").
- **Value**: Dữ liệu thực tế, có thể thuộc bất kỳ loại nào.

Keys được implement bằng cách sử dụng một lớp cơ sở generic, `Key<T>`, làm cho hệ thống type-safe.

## 2. Thiết lập Blackboard trong Editor

### Bước 1: Tạo Custom Key Types

Trước khi bạn có thể thêm dữ liệu vào Blackboard, bạn phải định nghĩa một Key type cho nó.

**Ví dụ: IntKey.cs**

```csharp
using UnityEngine;
using ND_BehaviorTree; 

[CreateAssetMenu(menuName = "BehaviourTree/Keys/Int Key", fileName = "New Int Key")]
public class IntKey : Key<int> { }
```

**Ví dụ: GameObjectKey.cs**

```csharp
using UnityEngine;
using ND_BehaviorTree;

[CreateAssetMenu(menuName = "BehaviourTree/Keys/GameObject Key", fileName = "New GameObject Key")]
public class GameObjectKey : Key<GameObject> { }
```

Trong ND_BehaviorTree, hầu hết các Unity types thường được sử dụng đã được hỗ trợ. Nếu loại mong muốn của bạn chưa có sẵn, hãy liên hệ với chúng tôi—chúng tôi sẽ rất vui được bao gồm nó trong bản cập nhật tương lai.
Cảm ơn bạn!
### Bước 2: Tạo Blackboard Asset

1. Trong cửa sổ Project, right-click hoặc sử dụng menu Assets.
2. Điều hướng đến `Create > ND_BehaviorTree > Blackboard`.
3. Đặt tên cho asset mới của bạn (ví dụ: `Enemy_Blackboard`).

![Create Blackboard](https://raw.githubusercontent.com/NDDEVVlog/ND_BehaviorTreeDocumentPage/main/public/images/CreateBlackboard.png)
### Bước 3: Thêm Keys vào Blackboard

Chọn Blackboard sau đó click `Add New Key by Type` để tạo và thêm key vào Blackboard

![AddKeyToBlackboard](https://raw.githubusercontent.com/NDDEVVlog/ND_BehaviorTreeDocumentPage/main/public/images/AddKeyToBlackboard.png)

Bạn cũng có thể tạo và thêm key trực tiếp vào Blackboard được gắn vào editor của Behavior Tree.

![Addjust Key in BT](https://raw.githubusercontent.com/NDDEVVlog/ND_BehaviorTreeDocumentPage/main/public/images/CreateBlackboard1.PNG)

## 3. Sử dụng Blackboard tại Runtime

### Behavior Tree Runner

`BehaviorTreeRunner` chịu trách nhiệm tạo runtime instances:

- Nó clone `treeAsset` và `blackboard` trên `Start()`.
- Nó hỗ trợ `blackboardOverride` cho cấu hình per-agent.

### Đọc giá trị từ Blackboard

```csharp
int currentHealth = ownerTree.blackboard.GetValue<int>("Health");
GameObject player = ownerTree.blackboard.GetValue<GameObject>("PlayerTarget");

if (player != null)
{
    // Sử dụng GameObject player
}
```

### Ghi giá trị vào Blackboard

**Sử dụng `SetValue<T>` (Khuyến nghị)**

```csharp
bool success = ownerTree.blackboard.SetValue<int>("Health", 50);

if (!success)
{
    Debug.LogError("Failed to set Health on the blackboard!");
}

GameObject newTarget = FindClosestEnemy();
ownerTree.blackboard.SetValue<GameObject>("CurrentTarget", newTarget);
```

**Sử dụng `SetValueObject`**

```csharp
public void OnHealthSliderChanged(float newHealth)
{
    object value = newHealth; 
    myTreeRunner.RuntimeTree.blackboard.SetValueObject("Health", value);
}
```

### Khởi tạo Runtime

Tạo một script kế thừa `BehaviorTreeRunner` và ghi đè `Init()`:

**Ví dụ: EnemyBehaviorRunner.cs**

```csharp
using UnityEngine;
using ND_BehaviorTree;

public class EnemyBehaviorRunner : BehaviorTreeRunner
{
    [SerializeField] private Transform patrolStartPoint;
    [SerializeField] private float startingHealth = 100f;

    public override void Init()
    {
        base.Init();
        if (RuntimeTree.blackboard == null) return;

        Debug.Log("Initializing enemy-specific blackboard values...");
        RuntimeTree.blackboard.SetValue<Transform>("PatrolPoint", patrolStartPoint);
        RuntimeTree.blackboard.SetValue<float>("Health", startingHealth);
    }
}
```
