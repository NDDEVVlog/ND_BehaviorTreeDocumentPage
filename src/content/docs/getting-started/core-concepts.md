---
title: Core Concepts
description: Understand the fundamental building blocks of the ND_BehaviorTree system.
---

Before you start building, it's important to understand the three main components that work together to bring your AI to life.

### 1. The Behavior Tree Asset

This is a `ScriptableObject` that acts as the **blueprint** for your AI's logic. You create it in your project's `Assets` folder. Inside this asset, you use a visual editor to connect different nodes (Actions, Composites, Decorators) to define how your character should behave.

Because it's an asset, you can easily reuse the same logic blueprint for many different characters.

### 2. The Behavior Tree Runner

The `BehaviorTreeRunner` is a `MonoBehaviour` component that you add to a `GameObject` in your scene. Its job is to be the **engine** that runs a Behavior Tree asset.

Key responsibilities:
- It holds a reference to the Behavior Tree asset you want to run.
- When the game starts, it **clones** the tree asset. This is crucial! It means each character gets its own unique instance of the tree, with its own private state (e.g., which node is currently `Running`).
- It calls the tree's `Update()` method every frame, "ticking" the tree and causing the AI logic to be evaluated.

### 3. The Blackboard

The Blackboard is another `ScriptableObject` that acts as the **memory** or "brain" for your AI. It's a shared data container where you can store and retrieve variables that the tree's nodes need to access.

For example, a `FindPlayer` node could find the player and store it in the Blackboard under the key `"target"`. Then, an `Attack` node could read the `"target"` key from the Blackboard to know who to attack.

This decouples your nodes from each other, making your AI more modular and easier to debug.
