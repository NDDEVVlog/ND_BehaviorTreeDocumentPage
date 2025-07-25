---
title: What is a Behavior Tree?
description: An introduction to the core concepts of Behavior Trees (BTs).
---

A Behavior Tree (BT) is a powerful tool used to create complex and modular AI for characters in games and other simulations. If you've ever struggled with tangled `if/else` statements or confusing "spaghetti code" from Finite State Machines (FSMs), you'll love Behavior Trees.

Think of it like a visual flowchart for an AI's brain. It allows you to define a set of actions and rules, and the tree structure determines which action the AI should perform at any given moment.

### Core Concepts

A Behavior Tree is made up of different types of **Nodes**. Each node performs a small task and then returns a status to its parent node. There are three possible statuses:

*   ✅ **`Success`**: The task was completed successfully.
*   ❌ **`Failure`**: The task could not be completed.
*   ⏳ **`Running`**: The task is still in progress and needs more time (e.g., walking to a destination).

#### Node Types

**1. Action Nodes (Leaf Nodes)**
These are the simplest nodes. They perform an actual action in your game world.

*   `MoveToTarget`
*   `AttackEnemy`
*   `PlayAnimation`
*   `Wait(seconds)`

**2. Composite Nodes (Branch Nodes)**
These nodes control the flow of logic. They have one or more child nodes and decide which one to execute based on a set of rules. The most common types are:

*   **Sequence (➡️)**: Executes its children one by one, in order. If any child returns `Failure`, the Sequence immediately stops and returns `Failure`. If all children return `Success`, the Sequence returns `Success`. It's like an **AND** gate.
    *   *Example: To make a sandwich, you must (Get Bread) AND (Add Filling) AND (Put Slices Together).*

*   **Selector (❓)**: Executes its children one by one, in order, until one of them returns `Success`. If a child returns `Success`, the Selector immediately stops and returns `Success`. If all children return `Failure`, the Selector returns `Failure`. It's like an **OR** gate or a "fallback".
    *   *Example: To handle a threat, you could (Flee), but if that fails, OR you can't, you (Fight).*

**3. Decorator Nodes (Wrapper Nodes)**
These nodes have only one child. Their purpose is to modify the behavior or the result of their child node.

*   **Inverter**: Inverts the result of its child. `Success` becomes `Failure`, and `Failure` becomes `Success`.
    *   *Example: Check if an enemy is NOT in sight.*
*   **Repeater**: Executes its child node a specific number of times, or forever.

### How it Works: The "Tick"

The entire tree is evaluated from the root node downwards on a regular interval, called a **"tick"**. On each tick, the tree decides the AI's current action based on the statuses returning from the nodes. This reactive and structured approach makes it easy to design, debug, and expand your AI's logic.

Ready to build one? Let's move on to [Creating Your First Tree](/guides/first-tree/).