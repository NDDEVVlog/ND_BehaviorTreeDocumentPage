
---
title: Using the Blackboard
description: Learn how to use the Blackboard system in your Behavior Tree to manage AI memory and data sharing.
---

The Blackboard is a central component of the Behavior Tree system. It acts as a shared memory or data-context for an individual AI agent. Any node within a tree can read from or write to the Blackboard, allowing them to share information and coordinate their actions without being directly connected.

This system is designed to be type-safe, flexible, and easy to use both in the Unity Editor and at runtime.


## 1. Core Concepts

The system is composed of two main types of ScriptableObject assets: the Blackboard and its Keys.

### Blackboard Asset

The Blackboard is the container. It holds a list of Key assets. Each BehaviorTree asset has a reference to a default Blackboard. At runtime, the BehaviorTreeRunner clones both the tree and its associated Blackboard, ensuring that each AI agent has its own unique instance of the data.

### Key Assets

A Key represents a single piece of data within the Blackboard. Each key has:

- **Key Name**: A unique string identifier used to look up the data (e.g., "Target", "Health", "LastKnownPosition").
- **Value**: The actual data, which can be of any type.

Keys are implemented using a generic base class, `Key<T>`, which makes the system type-safe.

## 2. Setting Up a Blackboard in the Editor

### Step 1: Create Custom Key Types

Before you can add data to a Blackboard, you must define a Key type for it.

**Example: IntKey.cs**

```csharp
using UnityEngine;
using ND_BehaviorTree; 

[CreateAssetMenu(menuName = "BehaviourTree/Keys/Int Key", fileName = "New Int Key")]
public class IntKey : Key<int> { }
```

**Example: GameObjectKey.cs**

```csharp
using UnityEngine;
using ND_BehaviorTree;

[CreateAssetMenu(menuName = "BehaviourTree/Keys/GameObject Key", fileName = "New GameObject Key")]
public class GameObjectKey : Key<GameObject> { }
```

In ND_BehaviorTree, most commonly used Unity types are already supported. If your desired type isn’t available yet, feel free to contact us—we’d be happy to include it in a future update.
Thank you!
### Step 2: Create a Blackboard Asset

1. In the Project window, right-click or use the Assets menu.
2. Navigate to `Create > ND_BehaviorTree > Blackboard`.
3. Name your new asset (e.g., `Enemy_Blackboard`).

![Create Blackboard](/images/CreateBlackboard.png)

### Step 3: Add Keys to the Blackboard

Select the Blackboard then click `Add New Key by Type` to create and add key into the Blackboard

![AddKeyToBlackboard](/images/AddKeyToBlackboard.png)

You can also create and add a key directly to the Blackboard attached to the Behavior Tree's editor.

![AddKeyToBlackboard](/images/CreateBlackboard1.PNG)

## 3. Using the Blackboard at Runtime

### The Behavior Tree Runner

The `BehaviorTreeRunner` is responsible for creating runtime instances:

- It clones the `treeAsset` and `blackboard` on `Start()`.
- It supports `blackboardOverride` for per-agent configuration.

### Reading Values from the Blackboard

```csharp
int currentHealth = ownerTree.blackboard.GetValue<int>("Health");
GameObject player = ownerTree.blackboard.GetValue<GameObject>("PlayerTarget");

if (player != null)
{
    // Use the player GameObject
}
```

### Writing Values to the Blackboard

**Using `SetValue<T>` (Recommended)**

```csharp
bool success = ownerTree.blackboard.SetValue<int>("Health", 50);

if (!success)
{
    Debug.LogError("Failed to set Health on the blackboard!");
}

GameObject newTarget = FindClosestEnemy();
ownerTree.blackboard.SetValue<GameObject>("CurrentTarget", newTarget);
```

**Using `SetValueObject`**

```csharp
public void OnHealthSliderChanged(float newHealth)
{
    object value = newHealth; 
    myTreeRunner.RuntimeTree.blackboard.SetValueObject("Health", value);
}
```

### Runtime Initialization

Create a script that inherits `BehaviorTreeRunner` and override `Init()`:

**Example: EnemyBehaviorRunner.cs**

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
