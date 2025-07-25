
---
title: Creating a Custom Action Node
description: Learn how to extend the system by creating your own custom action nodes.
---

Action Nodes are the heart of your AI's abilities. They are the "leaf" nodes in the tree that perform actual tasks in your game world, like moving a character, playing an animation, or attacking an enemy.

Creating your own custom actions is the most essential skill for using this Behavior Tree system.

### The Basic Template

To create a new action, create a new C# script that inherits from `ND_BehaviorTree.ActionNode`. Here is a simple "Hello World" example that logs a message to the console.

**Create a new C# script named `LogMessageNode.cs`:**

```csharp
using UnityEngine;
using ND_BehaviorTree; // Don't forget to import the namespace

// The [NodeInfo] attribute is optional. It defines how the node appears in the
// visual editor, including its menu path and icon.
[NodeInfo("Log Message", "Debug/Log Message")]
public class LogMessageNode : ActionNode
{
    // Public variables in your node script will appear as editable
    // properties in the Behavior Tree editor window.
    public string message = "Hello from Behavior Tree!";

    // OnEnter() is called once when the node's execution begins.
    // Use it for setup tasks, like caching a component.
    protected override void OnEnter() { }

    // OnProcess() is called every frame while the node is 'Running'.
    // This is where the core logic of the action happens.
    protected override Status OnProcess()
    {
        Debug.Log($"[{ownerTree.Self.name}] {message}");
        
        // This action is instantaneous, so it succeeds immediately.
        return Status.Success;
    }

    // OnExit() is called once when the node's execution ends.
    // This happens after OnProcess() returns Success or Failure.
    // Use it for cleanup tasks.
    protected override void OnExit() { }
}
```

---

## The Node Lifecycle & Statuses

Every node you create has a lifecycle managed by three key methods and three return statuses.

### Lifecycle Methods

- `protected override void OnEnter()`  
  Called exactly once before the node starts processing. Perfect for initialization.

- `protected override Status OnProcess()`  
  The "Update" loop of your node. It's called every frame as long as the parent is ticking it. You must return a `Status` from this method.

- `protected override void OnExit()`  
  Called exactly once when the node stops processing (after returning `Success` or `Failure`). Perfect for cleaning up.

### Return Statuses

The status you return from `OnProcess()` controls the flow of the entire tree:

- ✅ `Status.Success`: The task is complete and was successful. The tree will proceed accordingly (e.g., a parent Sequence will move to its next child).
- ❌ `Status.Failure`: The task could not be completed. The tree will react to the failure (e.g., a parent Selector will try its next child).
- ⏳ `Status.Running`: The task is not finished yet and needs more time. The same node will be processed again on the next frame. This is essential for any action that takes more than one frame, like moving or waiting.

---

## A Practical Example: `MoveToTargetNode`

Let's create a more useful node that moves the agent towards a target stored in the Blackboard. This example demonstrates a long-running action.

```csharp
using UnityEngine;
using ND_BehaviorTree;

[NodeInfo("Move To Target", "Movement/Move To Target")]
public class MoveToTargetNode : ActionNode
{
    public float speed = 5.0f;
    public float stoppingDistance = 0.1f;
    public string targetKey = "target"; // The name of the key in the Blackboard

    private Transform targetTransform;

    protected override void OnEnter()
    {
        // Get the target from the Blackboard when we start.
        // It's efficient to get this once in OnEnter instead of every frame in OnProcess.
        targetTransform = ownerTree.blackboard.GetValue<Transform>(targetKey);
    }

    protected override Status OnProcess()
    {
        // 1. Check for failure conditions first.
        if (targetTransform == null)
        {
            Debug.LogWarning($"MoveToTargetNode failed: Blackboard key '{targetKey}' is null.");
            return Status.Failure;
        }

        // 2. Check if we have already reached the destination.
        float distance = Vector3.Distance(ownerTree.Self.transform.position, targetTransform.position);
        if (distance <= stoppingDistance)
        {
            return Status.Success;
        }

        // 3. If we are not there yet, move towards the target.
        Vector3 direction = (targetTransform.position - ownerTree.Self.transform.position).normalized;
        ownerTree.Self.transform.position += direction * speed * Time.deltaTime;
        
        // 4. Return Running because the action is not yet complete.
        return Status.Running;
    }

    protected override void OnExit() { }
}
```

This node beautifully illustrates the proper use of the lifecycle:

- It gets the target once in `OnEnter()`.
- It checks for `Failure` and `Success` conditions inside `OnProcess()`.
- It performs its core logic and returns `Status.Running` to signify it needs more time.
