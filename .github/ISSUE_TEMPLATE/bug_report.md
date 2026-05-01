name: Bug Report
description: Report a bug to help us improve ButtSnap
title: "[Bug] "
labels: ["bug"]
body:
  - type: markdown
    attributes:
      value: |
        Thanks for taking the time to report a bug! Please fill out the information below.

  - type: input
    id: ios-version
    attributes:
      label: iOS Version
      description: Go to Settings → General → About to find your iOS version
      placeholder: "e.g., iOS 17.2"
    validations:
      required: true

  - type: input
    id: app-version
    attributes:
      label: App Version
      description: Find the version in ButtSnap Settings
      placeholder: "e.g., 1.0.0"
    validations:
      required: true

  - type: textarea
    id: description
    attributes:
      label: Bug Description
      description: Clearly describe the issue you encountered
      placeholder: "What happened? What did you expect to happen?"
    validations:
      required: true

  - type: textarea
    id: steps
    attributes:
      label: Steps to Reproduce
      description: List the exact steps to reproduce the bug
      placeholder: |
        1. Open the app
        2. Tap on ...
        3. ...
    validations:
      required: true

  - type: textarea
    id: screenshots
    attributes:
      label: Screenshots
      description: If applicable, attach screenshots to help explain the issue
