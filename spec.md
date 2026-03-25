# EduLearn

## Current State
App has 4 subjects (Mathematics, Biology, Chemistry, Physics). Quiz question counts are low: Math (6), Biology (6), Chemistry (4), Physics (4). Backend initializes all data in `initialize()`.

## Requested Changes (Diff)

### Add
- Additional quiz questions for all four subjects, bringing each to 10 questions

### Modify
- `initialize()` in `main.mo` to include expanded question arrays
- `quizCount` on each subject to reflect actual question counts

### Remove
- Nothing

## Implementation Plan
1. Add 4 more questions to Mathematics (bring to 10)
2. Add 4 more questions to Biology (bring to 10)
3. Add 6 more questions to Chemistry (bring to 10)
4. Add 6 more questions to Physics (bring to 10)
5. Update quizCount fields on all subjects to 10
