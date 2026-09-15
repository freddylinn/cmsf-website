// Feature flags for sections awaiting external sign-off.
//
// Both sections below are code-complete and fully tested. They are held back
// only until their collaborators approve the current edits, so nothing here
// should be deleted — flipping a flag to true is the entire release step.
//
//   SPANISH_ENABLED  CMSF SPCh, the Spanish (Chile) edition.
//                    Pending approval from the Chilean team.
//
//   FITI_ENABLED     Modular FITI Assessment.
//                    Pending approval from Gurevich and Kim, and resolution of
//                    the A3 target-count question in the published appendix.
//
// When a flag is false the section's routes are not registered, its links and
// navigation entries do not render, and its release notes are withheld, so it
// cannot be reached by guessing a URL or by following a stale bookmark.

export const SPANISH_ENABLED = false;
export const FITI_ENABLED = false;
