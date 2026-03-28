---
name: "swiftui-guidelines-cursorrules-prompt-file Cursorrules"
category: "ide_rules/cursor"
---

# IDE Rules for swiftui-guidelines-cursorrules-prompt-file

*Drop the text below into your `.cursorrules`, `.clinerules`, or `.windsurfrules` file at the root of your project:*

```text
---
description: Guidelines for designing UIs in SwiftUI, including the use of built-in components, layout tools, visual flair, and interactive elements.
globs: Views/**/*.swift
---
- Use Built-in Components: Utilize SwiftUI's native UI elements like List, NavigationView, TabView, and SF Symbols for a polished, iOS-consistent look.
- Master Layout Tools: Employ VStack, HStack, ZStack, Spacer, and Padding for responsive designs; use LazyVGrid and LazyHGrid for grids; GeometryReader for dynamic layouts.
- Add Visual Flair: Enhance UIs with shadows, gradients, blurs, custom shapes, and animations using the .animation() modifier for smooth transitions.
- Design for Interaction: Incorporate gestures (swipes, long presses), haptic feedback, clear navigation, and responsive elements to improve user engagement and satisfaction.
```