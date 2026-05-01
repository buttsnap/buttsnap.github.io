name: Feature Request
description: Suggest a new feature or improvement for ButtSnap
title: "[Feature] "
labels: ["enhancement"]
body:
  - type: markdown
    attributes:
      value: |
        Thanks for sharing your idea! We're excited to hear what you'd like to see in ButtSnap.

  - type: textarea
    id: problem
    attributes:
      label: Problem Statement
      description: What problem would this feature solve? What user need does it address?
      placeholder: "I find it frustrating when..."
    validations:
      required: true

  - type: textarea
    id: solution
    attributes:
      label: Proposed Solution
      description: Describe how you'd like this feature to work
      placeholder: "It would be great if ButtSnap could..."
    validations:
      required: true

  - type: textarea
    id: alternatives
    attributes:
      label: Alternatives Considered
      description: Are there any workarounds or alternative solutions you've thought about?

  - type: textarea
    id: references
    attributes:
      label: References
      description: Are there other apps that have a similar feature? Feel free to share screenshots or links.
