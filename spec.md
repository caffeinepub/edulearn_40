# EduLearn - AI Tutor System

## Current State
EduLearn has 4 subjects (Math, Biology, Chemistry, Physics) with quizzes, flashcards, and progress tracking. No AI features exist.

## Requested Changes (Diff)

### Add
- AI Tutor chat widget: floating button on all pages opens a chat panel
- Backend `askAITutor(question: Text, subject: Text) : async Text` using HTTP outcalls to an AI API
- AI Tutor answers subject-related questions, explains quiz answers, and helps with flashcard concepts
- Smart study suggestions based on the subject context

### Modify
- App.tsx: add AI Tutor chat widget
- QuizModal: add "Ask AI Tutor" button after an answer is revealed

### Remove
- Nothing

## Implementation Plan
1. Select http-outcalls component
2. Add `askAITutor` Motoko endpoint using HTTP outcall to AI API
3. Add AIChatWidget frontend component (floating button + chat panel)
4. Wire "Ask AI Tutor" button in QuizModal for explanation help
5. Add AI Tutor button in App.tsx
